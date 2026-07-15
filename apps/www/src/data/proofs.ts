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
      "Helped an 80+ year-old industrial supply business adapt to e-commerce through web, analytics, marketing, content, and operational workflow improvements.",
    shortWording: "Modernized legacy e-commerce and operations workflows",
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
      "CallNYC turned open constituent-services data into issue pathways, district context, and archived resident-facing guidance. Its complete recoverable project-account corpus documents a repeatable recognition and issue-linking system across 26 Council members and 61 normalized CallNYC issue pages; Politico New York covered the project in 2016.",
    sourceBasis:
      "Approved resume language, archived prototype context, complete recoverable 107-item project-account corpus, public open-data context, public GitHub repository, and verified Politico New York coverage.",
    guardrail:
      "Always describe it as archived and unofficial; keep 26 members named by project output separate from the lower bound of eight members whose accounts visibly engaged back.",
    doNotSay: [
      "Broader historical hackathon superlatives",
      "Official hackathon submission or winner",
      "Current city service",
      "Official city guidance",
      "Emergency guidance",
      "Legal guidance",
      "26 Council members engaged with CallNYC",
      "All 110 profile-reported posts were recovered"
    ],
    protectedBoundaries: ["Current-service claims", "Private user data", "Unverified guidance"],
    surfaces: ["technical-operations", "work-card", "case-study"],
    relatedProjects: ["callnyc"],
    relatedCapabilities: ["open-data", "resident-guidance", "information-architecture", "stakeholder-engagement"],
    lastReviewed: "2026-07-14"
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
    shortWording: "30+ pages of civic campaign-memory infrastructure",
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
    shortWording: "Created a legislative source map and provenance redline",
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
    lastReviewed: "2026-07-14"
  },
  {
    id: "fair-rent-public-data-pilot",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["approved-resume", "public-safe-archive-summary"],
    publicWording:
      "Designed a privacy-preserving pilot data product for geography-aggregated commercial vacancy and lease-cost indicators, with a minimum schema, coverage and suppression table, methods note, and confidential-data exclusions.",
    shortWording: "Scoped a privacy-preserving commercial-data pilot",
    detailedPublicWording:
      "Jamie translated a fragmented public-data opportunity into a smallest-serious-v1: an aggregate indicators table, a coverage and suppression table, a plain-language methods note, minimum useful fields, and explicit exclusions for raw confidential filings and identifying records.",
    sourceBasis:
      "Approved resume language and a public-safe archival review of Jamie-authored 2025-2026 commercial-data briefs.",
    whyItMatters:
      "Shows data-product scoping, privacy-by-design requirements, source synthesis, and the ability to define an implementable first release for public-interest stakeholders.",
    guardrail:
      "Describe this as a proposal and product specification, not an implemented or City-approved data release.",
    doNotSay: [
      "The City adopted or implemented Jamie's proposal",
      "Jamie published the proposed indicators",
      "Jamie accessed confidential tax or lease records",
      "Jamie alone created the public data systems on which the proposal builds"
    ],
    protectedBoundaries: [
      "Private stakeholder context",
      "Unpublished correspondence",
      "Confidential filings",
      "Identifying business or tenant records",
      "Unapproved strategy"
    ],
    surfaces: ["technical-operations", "work-card", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: [
      "data-product-scoping",
      "privacy-by-design",
      "requirements",
      "public-data-framing"
    ],
    lastReviewed: "2026-07-14"
  },
  {
    id: "fair-rent-2023-web-relaunch",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-safe-archive-summary"],
    publicWording:
      "Helped coordinate and implement FairRentNYC's February 2023 website relaunch through a versioned shared checklist connecting web updates, public action tools, campaign calls, press materials, forms, and follow-through.",
    shortWording: "Helped coordinate and implement a versioned FairRentNYC website relaunch",
    detailedPublicWording:
      "Jamie used a shared implementation record to connect website delivery with campaign calls, join and action forms, press materials, public documents, and relaunch follow-through.",
    sourceBasis:
      "Public-safe aggregate review of a 16-revision FairRentNYC implementation record from January-February 2023.",
    whyItMatters:
      "Shows cross-channel implementation coordination and sustained follow-through across a collective public campaign.",
    guardrail:
      "Preserve collaborator credit and describe Jamie as helping coordinate and implement the relaunch, not as sole campaign or website owner.",
    doNotSay: [
      "Jamie alone relaunched FairRentNYC",
      "Jamie authored every campaign asset",
      "The private implementation record is public",
      "The relaunch caused a policy outcome"
    ],
    protectedBoundaries: [
      "Credentials",
      "Meeting access",
      "Contact details",
      "Private campaign operations",
      "Raw revision contents"
    ],
    surfaces: ["technical-operations", "work-card", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: [
      "delivery-coordination",
      "campaign-websites",
      "action-tracking",
      "handoffs"
    ],
    lastReviewed: "2026-07-14"
  },
  {
    id: "commercial-vacancy-quarterly-corpus",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-safe-archive-summary"],
    publicWording:
      "Assembled a 20-year working corpus of 81 quarterly HUD-USPS business-vacancy snapshots, organized from Q4 2005 through Q4 2025 for longitudinal research.",
    shortWording: "Assembled 81 quarterly HUD-USPS vacancy snapshots across 20 years",
    detailedPublicWording:
      "Jamie organized 81 unique quarterly HUD-USPS business-vacancy snapshots into a longitudinal research corpus spanning Q4 2005 through Q4 2025.",
    sourceBasis:
      "Public-safe inventory of Jamie's structured vacancy-data working archive, with the overlapping 2012 quarters deduplicated.",
    whyItMatters:
      "Shows longitudinal source acquisition, corpus organization, provenance discipline, and groundwork for public-interest data analysis.",
    guardrail:
      "Credit HUD and USPS as the government data originators and describe only corpus assembly and organization.",
    doNotSay: [
      "Jamie created the HUD-USPS data",
      "The corpus is a validated production dataset",
      "The archive proves completed analysis",
      "The City adopted or published Jamie's corpus"
    ],
    protectedBoundaries: [
      "Underlying working files",
      "Unvalidated transformations",
      "Unpublished analysis",
      "Private research notes"
    ],
    surfaces: ["technical-operations", "work-card", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: [
      "data-operations",
      "source-acquisition",
      "corpus-organization",
      "provenance"
    ],
    lastReviewed: "2026-07-14"
  },
  {
    id: "nyc-artist-coalition-public-web-infrastructure",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["approved-resume", "public-source", "jamie-review-confirmation"],
    publicWording:
      "Served as a founding-era NYC Artist Coalition organizer and built public campaign websites for cultural-space advocacy, including the coalition site, FairRentNYC, Talks Not Raids, and Let NYC Dance public web surfaces.",
    shortWording: "Founding-era NYC Artist Coalition organizer and public-web builder",
    detailedPublicWording:
      "Jamie helped give NYC Artist Coalition a public-facing civic systems layer: campaign websites, issue explanations, calls to action, public resources, and support paths for cultural-space advocacy.",
    sourceBasis: "Public-safe project-history review, Jamie confirmation, public campaign websites, and contemporaneous public affiliation.",
    whyItMatters:
      "Makes Jamie's founding-era organizing, civic-systems, and direct web authorship visible without overstating collective campaign accomplishments.",
    guardrail:
      "Founding-era organizing and website authorship are supported; the formal co-founder title remains held for corroboration, and campaign accomplishments remain collective.",
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
    lastReviewed: "2026-07-07"
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
    surfaces: ["resume", "technical-operations", "work-card", "case-study", "about"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: [
      "coalition-operations",
      "policy-communications",
      "public-data-framing",
      "civic-systems"
    ],
    lastReviewed: "2026-07-13"
  },
  {
    id: "nyc-artist-coalition-public-outcome-arc",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source", "public-safe-archive-summary", "jamie-review-confirmation"],
    publicWording:
      "Public records document Jamie's 2017 Cabaret Law repeal advocacy, his invitation into coalition dialogue about the new Office of Nightlife, and his web and civic-action infrastructure for Talks Not Raids.",
    shortWording: "Documented nightlife advocacy and civic-action infrastructure",
    detailedPublicWording:
      "The related collective outcome record is now source-backed: Cabaret licensing ended in 2017; the Office of Nightlife was established in 2017; MARCH reporting and notice requirements became law in 2019; and the City dismantled MARCH in 2023.",
    sourceBasis:
      "Greene Hill Food Co-op interview, NYC Artist Coalition campaign pages, New York City Council legislation and press records, Mayor's Office records, Gothamist reporting, and a public-safe project-history review.",
    whyItMatters:
      "Connects Jamie's documented operating craft to visible civic products and outcomes while preserving the difference between contribution, collective advocacy, legislation, and agency action.",
    guardrail:
      "State Jamie's documented advocacy and infrastructure contribution separately from institutional outcomes. Keep all policy causation collective and bounded.",
    doNotSay: [
      "Jamie authored the Cabaret Law repeal or Office of Nightlife legislation",
      "Jamie alone created the Office of Nightlife",
      "Jamie alone passed Local Law 220",
      "Jamie alone ended MARCH raids",
      "All multi-agency nightlife inspections ended"
    ],
    protectedBoundaries: [
      "Private coalition notes",
      "Enforcement-sensitive venue records",
      "Unapproved collaborator testimony",
      "Private correspondence",
      "Internal strategy"
    ],
    surfaces: ["work-card", "case-study", "technical-operations", "resume"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["campaign-websites", "public-guidance", "policy-communications", "civic-systems"],
    lastReviewed: "2026-07-13"
  },
  {
    id: "nyc-artist-coalition-campaign-press-corpus",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "Four NYC Artist Coalition campaign press indexes preserve 45 listed references representing 44 distinct article URLs.",
    shortWording: "A governed 44-article campaign press corpus",
    detailedPublicWording:
      "The Let NYC Dance, Save NYC Spaces, Talks Not Raids, and archived FairRentNYC press sections assemble public context spanning Cabaret Law repeal, nightlife governance, MARCH enforcement, storefront vacancy, and Commercial Rent Stabilization.",
    sourceBasis:
      "Three live campaign press indexes, the December 1, 2021 FairRentNYC Wayback capture, normalized article metadata, and a July 13, 2026 link-availability audit.",
    whyItMatters:
      "Makes the breadth of the public record reusable without overwhelming the portfolio page or treating campaign-curated links as automatic article-level proof.",
    guardrail:
      "Say press-index entries or listed references. Do not call every item an endorsement, a Jamie profile, or independent proof of campaign causation; close-read an article before promoting its specific claims.",
    doNotSay: [
      "Forty-five outlets endorsed Jamie",
      "Every article is about Jamie",
      "The press corpus proves Jamie caused the policy outcomes",
      "Every historical article remains live"
    ],
    protectedBoundaries: [
      "Private press correspondence",
      "Unpublished pitches",
      "Private analytics",
      "Unapproved collaborator attribution"
    ],
    surfaces: ["work-card", "case-study", "technical-operations"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["campaign-websites", "source-mapping", "public-guidance", "knowledge-systems"],
    lastReviewed: "2026-07-13"
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
      "Co-built WOWList.org, a Django, PostgreSQL/PostGIS, and Ember community-calendar platform adopted by DIY arts and music organizers across roughly 35 city ecosystems.",
    shortWording: "WOWList reached roughly 35 city ecosystems",
    detailedPublicWording:
      "WOWList supported 1,800+ users, 16,000+ posts/events, followable keyword communities, natural-language event entry, weekly digest emails, embeddable calendars, and low-cost deployment for local calendar organizers.",
    sourceBasis: "Approved resume language and public-safe aggregate historical summary.",
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
    lastReviewed: "2026-07-07"
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
    shortWording: "300+ gatherings and 20+ resident artists supported",
    detailedPublicWording:
      "Jamie made recurring cultural work easier to continue through practical invitation, hosting, onboarding, facilitation, documentation, and follow-through systems.",
    sourceBasis: "Approved resume language and public-safe aggregate project history.",
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
    lastReviewed: "2026-07-07"
  },
  {
    id: "196-residency-onboarding-workflow",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-safe-archive-summary", "jamie-review-confirmation"],
    publicWording:
      "Built a repeatable artist-residency acceptance and onboarding workflow covering proposal review, orientation, space configuration, independent access, and dedicated collaboration workspaces.",
    shortWording: "Built a repeatable artist-residency onboarding workflow",
    detailedPublicWording:
      "Jamie made residency handoffs usable through a documented acceptance and onboarding process, then supported project and media continuity through dedicated collaborator workspaces.",
    sourceBasis:
      "Public-safe aggregate review of a Jamie-authored acceptance record and at least eight dedicated 196 collaboration workspaces spanning 2023-2025.",
    whyItMatters:
      "Shows proposal review, onboarding design, access planning, collaborator handoffs, and reusable operating structure in a trust-intensive setting.",
    guardrail:
      "Keep resident identities, proposals, access details, private communications, and media protected unless each collaborator explicitly approves publication.",
    doNotSay: [
      "Jamie owns resident work",
      "The collaborator archive is public",
      "Every residency followed an identical process",
      "Participant names or media are approved for publication"
    ],
    protectedBoundaries: [
      "Resident names",
      "Proposals",
      "Contact information",
      "Access instructions",
      "Scans",
      "Images",
      "Videos"
    ],
    surfaces: ["technical-operations", "work-card", "case-study"],
    relatedProjects: ["196-sunday-dinner"],
    relatedCapabilities: ["onboarding", "access-planning", "handoffs", "collaboration-systems"],
    lastReviewed: "2026-07-14"
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
    evidenceClass: [
      "approved-resume",
      "public-source",
      "public-safe-archive-summary",
      "jamie-review-confirmation"
    ],
    publicWording:
      "Co-led redevelopment planning and public-benefit documentation for adaptive reuse of a long-vacant historic building. In 2019, the Kansas City Council adopted Resolution 190649, accepting a $490,539 CCED funding recommendation and authorizing funding-agreement negotiations.",
    shortWording: "Supported adaptive reuse planning and public-benefit documentation",
    detailedPublicWording:
      "Jamie helped shape planning, public-benefit documentation, stakeholder context, and municipal-review support for an adaptive reuse effort. After the CCED Board's recommendation, the Council accepted an amount not to exceed $490,539 and authorized the City Manager to negotiate a funding agreement. When Jamie's stewardship concluded, he transitioned the project to a mission-aligned organization.",
    sourceBasis:
      "Approved resume language, public-safe project context, Kansas City Legistar history, authenticated Resolution 190649, and Jamie's July 14, 2026 handoff confirmation.",
    guardrail:
      "Distinguish the CCED Board recommendation, Council acceptance, and negotiation authority from an executed agreement, disbursement, receipt, or project completion. Present the handoff as Jamie's first-person account without identifying the recipient or publishing private transition context.",
    doNotSay: [
      "$490,539 received or disbursed",
      "Funding agreement executed",
      "Jamie alone secured the Council action",
      "Project completed as proposed",
      "Current property status",
      "Recipient organization identity",
      "Handoff date or terms",
      "Private financial details"
    ],
    protectedBoundaries: [
      "Private financial details",
      "Legal details",
      "Property details",
      "Banking details",
      "Stakeholder details",
      "Private transition context"
    ],
    surfaces: ["technical-operations", "work-card", "case-study"],
    relatedProjects: ["kc-town-hall"],
    relatedCapabilities: ["project-planning", "public-benefit-documentation", "stakeholder-context"],
    lastReviewed: "2026-07-14"
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
      "The method separates Known, Open, and Protected material and begins with one bounded use case and one approved non-sensitive or synthetic source bundle, so teams can test reviewable memory without broad system ingestion.",
    sourceBasis:
      "Public-safe lab materials and a public-safe archival review of Jamie's June 2026 bounded-sprint proposal.",
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
    lastReviewed: "2026-07-14"
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
      "fair-rent-public-data-pilot",
      "commercial-vacancy-quarterly-corpus",
      "kc-town-hall-public-benefit-documentation"
    ]
  },
  {
    capability: "Operating documentation people use",
    toward: "Converting meetings, source trails, and recurring practices into reusable working memory.",
    proofIds: [
      "fair-rent-campaign-memory",
      "sunday-dinner-196-participation-infrastructure",
      "196-residency-onboarding-workflow",
      "source-backed-team-memory-method"
    ]
  },
  {
    capability: "Public-facing launch and adoption",
    toward: "Shaping websites, prototypes, and community platforms so real audiences can act.",
    proofIds: [
      "nyc-artist-coalition-public-web-infrastructure",
      "nyc-artist-coalition-civic-systems",
      "fair-rent-2023-web-relaunch",
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
