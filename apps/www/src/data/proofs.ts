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
      "Jamie creates operating structure where the need is real but requirements, workflows, ownership, documentation, and handoffs are not yet clear, including human-stakes civic and cultural contexts and source-backed knowledge systems.",
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
      "Jamie helped translate legacy operating knowledge across technical and nontechnical stakeholder contexts into searchable e-commerce, content, analytics, marketing, and operational workflows while preserving the company's public voice. The resulting product-discovery and ordering paths were clearer for customers, while internal digital workflows and product, marketing, and support surfaces became more repeatable.",
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
      "As civic-tech builder and product translator, Jamie turned open constituent-services data into issue pathways, district context, and archived resident-facing guidance. Its complete recoverable project-account corpus documents a repeatable recognition and issue-linking system across 26 Council members and 61 normalized CallNYC issue pages; Politico New York covered the project in 2016.",
    sourceBasis:
      "Approved resume language, archived prototype context, complete recoverable 107-item project-account corpus, public open-data context, public GitHub repository, and verified Politico New York coverage.",
    guardrail:
      "Always describe it as archived and unofficial; keep 26 members named by project output separate from the lower bound of eight members whose accounts visibly engaged back. Public-safe screenshots and additional archive links require Jamie's approval before publication.",
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
    surfaces: ["resume", "technical-operations", "work-card", "case-study"],
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
      "Jamie synthesized meetings, decision records, action items, legal/policy questions, media assets, stakeholder and partner-network next steps, and city/state strategy lanes into shared memory and actionable workstreams.",
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
    sourceBasis: "Approved resume language and public-safe source-map summary; named materials and screenshots remain subject to collaborator review before publication.",
    guardrail:
      "Do not imply legal authority or official bill ownership. Screenshots, named materials, and collaborator-visible artifacts require review and approval before publication.",
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
    surfaces: ["resume", "technical-operations", "work-card", "case-study"],
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
      "Founding-era organizing and website authorship are supported; the formal co-founder title remains held for corroboration, campaign accomplishments remain collective, and coalition and institutional credit must be preserved.",
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
      "As co-builder and product operator, Jamie helped WOWList support 1,800+ users, 16,000+ posts/events, followable keyword communities, natural-language event entry, weekly digest emails, embeddable calendars, and low-cost deployment for local calendar organizers.",
    sourceBasis: "Approved resume language and public-safe aggregate historical summary.",
    guardrail:
      "Use approximate adoption language and do not describe city activity as official chapters. Screenshots, archive links, and collaborator-visible artifacts remain pending approval before publication.",
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
      "Jamie built a care-forward residency and recurring community practice, making cultural work easier to continue through practical invitation, hosting, onboarding, facilitation, documentation, and follow-through systems.",
    sourceBasis: "Approved resume language and public-safe aggregate project history.",
    guardrail:
      "Keep the page summary-only; named participants, photos, and artifacts require consent and approval, and community trust work should not become spectacle.",
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
      "With Julia Fredenburg, co-founded and project-managed Phase One cold-shell restoration of a long-vacant Kansas City building while the project conducted a neighborhood survey and built public-benefit documentation. The Council authorized negotiations on a $490,539 CCED recommendation in 2019; a 2024 ordinance later recorded project withdrawal and reappropriated the unused allocation.",
    shortWording:
      "Co-founded with Julia Fredenburg and project-managed historic adaptive reuse",
    detailedPublicWording:
      "A 2019 proposal names Jamie and Julia as founders and project managers and records Phase One cold-shell restoration completed across roof, structural-masonry, and floor-framing work. The proposal also documents a partner-based neighborhood survey whose ongoing results shaped its plans. After the CCED Board's recommendation, the Council authorized the City Manager to negotiate a funding agreement for up to $490,539. Ordinance 240317 later recorded KC Town Hall as withdrawn and reappropriated the unused allocation. When Jamie's stewardship concluded, he reports that he transitioned the project to a mission-aligned organization.",
    sourceBasis:
      "Public-safe page-level appraisal of the private 2019 CCED proposal and support-letter packet, approved resume language, Kansas City Legistar history, authenticated Resolution 190649, Ordinance 240317, the governed project-account corpus, and Jamie's July 14, 2026 handoff confirmation. The underlying packet remains private because appended materials contain financial and contact information. The account corpus preserves a two-item recovery gap, does not assign every post or later operation to Jamie, and does not independently verify self-reported outcome figures.",
    guardrail:
      "Credit Julia's co-leadership, each professional and trade team, survey partners, residents, the CCED Board, and the Council. Phase One completion is not completion of Phase Two or the full redevelopment. Use project manager unless separate evidence corroborates Jamie's recalled general-contractor title. Distinguish negotiation authority from receipt, and do not attribute the later withdrawal or its unstated reasons to Jamie.",
    doNotSay: [
      "$490,539 received or disbursed",
      "Funding agreement executed",
      "Jamie caused or personally decided the project withdrawal",
      "The 2024 ordinance states why KC Town Hall withdrew",
      "Jamie alone secured the Council action",
      "Jamie alone founded, managed, or completed the restoration",
      "Jamie personally performed every construction trade",
      "General-contractor title independently confirmed",
      "Phase Two or full redevelopment completed as proposed",
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
    surfaces: ["resume", "technical-operations", "work-card", "case-study"],
    relatedProjects: ["kc-town-hall"],
    relatedCapabilities: [
      "project-management",
      "historic-restoration",
      "public-benefit-documentation",
      "neighborhood-listening",
      "stakeholder-context"
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
    surfaces: ["technical-operations", "work-card", "lab"],
    relatedProjects: ["source-backed-team-memory"],
    relatedCapabilities: ["source-backed-memory", "documentation-architecture", "human-review"],
    lastReviewed: "2026-07-14"
  },
  {
    id: "product-operations-delivery-practice",
    status: "ready",
    supportLevel: "moderate",
    evidenceClass: ["approved-resume", "public-safe-archive-summary"],
    publicWording:
      "Uses requirements, workflow mapping, user stories, acceptance criteria, decision logs, action tracking, rollout planning, QA, user-acceptance testing, stakeholder updates, adoption support, and handoffs to coordinate delivery.",
    shortWording: "Requirements-to-handoff product operations practice",
    detailedPublicWording:
      "Jamie translates emerging needs into bounded delivery artifacts, operating memory, and review loops, including requirements, acceptance criteria, implementation plans, quality assurance, user-acceptance testing, rollout support, adoption materials, and durable handoffs.",
    sourceBasis:
      "Approved public resume and public-safe aggregate project, launch, workflow, testing, documentation, and handoff history.",
    whyItMatters:
      "Supports the complete product-operations capability instead of relying on a generic requirements keyword.",
    guardrail:
      "This is a working-practice claim, not PMP certification or a claim that every project used every method.",
    doNotSay: ["Certified PMP", "Every project used every listed method"],
    protectedBoundaries: ["Private test plans", "Client requirements", "Internal rollout records"],
    surfaces: ["homepage", "resume", "technical-operations", "about"],
    relatedProjects: [],
    relatedCapabilities: ["product-operations", "quality-assurance", "uat", "handoffs"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "nycac-commercial-data-framing",
    status: "careful",
    supportLevel: "moderate",
    evidenceClass: ["approved-resume", "public-source", "public-safe-archive-summary"],
    publicWording:
      "Developed policy-neutral public-data framing around commercial vacancy, occupancy, lease-cost indicators, storefront data, Local Law 157, and aggregate RPIE-derived reporting.",
    shortWording: "Policy-neutral commercial-space data framing",
    detailedPublicWording:
      "Jamie organized public-source questions and data-product requirements around commercial vacancy, occupancy, lease costs, storefront reporting, Local Law 157, and privacy-preserving aggregate use of RPIE-derived indicators.",
    sourceBasis:
      "Approved resume, public legislation and data context, and public-safe Commercial Rent Stabilization research materials.",
    whyItMatters:
      "Supports the specific statutory and reporting terms used in the resume while keeping the proposal distinct from an adopted City product.",
    guardrail:
      "Describe framing, research, and requirements work; do not imply official City adoption, access to confidential filings, or completed production reporting.",
    doNotSay: ["The City adopted Jamie's data product", "Jamie accessed confidential RPIE filings", "The proposed reporting system is in production"],
    protectedBoundaries: ["Confidential filings", "Private strategy", "Unvalidated transformations"],
    surfaces: ["resume", "technical-operations", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["public-data-framing", "data-product-requirements", "policy-translation"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "cross-functional-dependency-coordination",
    status: "ready",
    supportLevel: "moderate",
    evidenceClass: ["approved-resume", "public-safe-archive-summary"],
    publicWording:
      "Coordinates dependencies across technical, legal-review, communications, contracts, and external-stakeholder work while keeping decision ownership visible.",
    shortWording: "Cross-functional dependency coordination",
    detailedPublicWording:
      "Jamie surfaces owners, sequencing, open questions, and handoffs where implementation depends on technical, legal-review, communications, contract, or external-stakeholder decisions.",
    sourceBasis:
      "Approved public positioning and public-safe aggregate review of civic, client, campaign, and implementation workflows.",
    guardrail:
      "Coordination does not replace legal, contract, technical, communications, or executive judgment.",
    doNotSay: ["Provides legal advice", "Owns every cross-functional decision"],
    protectedBoundaries: ["Legal review", "Contracts", "Private stakeholder records"],
    surfaces: ["homepage", "resume", "technical-operations", "about"],
    relatedProjects: [],
    relatedCapabilities: ["dependency-coordination", "stakeholder-management", "risk-surfacing"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "operational-reporting-human-judgment",
    status: "ready",
    supportLevel: "moderate",
    evidenceClass: ["approved-resume", "public-safe-archive-summary"],
    publicWording:
      "Reports what is working, what remains open, and what needs human judgment so teams can improve without overengineering.",
    shortWording: "Operational reporting that preserves human judgment",
    detailedPublicWording:
      "Jamie uses status, decision, risk, and open-question records to distinguish observed progress from unresolved issues and decisions that remain with people.",
    sourceBasis:
      "Approved public positioning and public-safe aggregate review of running minutes, decision records, action trackers, and implementation reporting.",
    guardrail:
      "Do not imply automated judgment, universal measurement, or authority over decisions held by collaborators or institutions.",
    doNotSay: ["Automates human judgment", "Owns every team decision"],
    protectedBoundaries: ["Private status reports", "Personnel context", "Confidential decisions"],
    surfaces: ["homepage", "resume", "technical-operations", "about"],
    relatedProjects: [],
    relatedCapabilities: ["status-reporting", "decision-records", "human-review"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "nyc-artist-coalition-founding-era-role",
    status: "careful",
    supportLevel: "moderate",
    evidenceClass: ["public-source", "public-safe-archive-summary", "jamie-review-confirmation"],
    publicWording:
      "Served as a founding-era NYC Artist Coalition organizer, contributing civic systems, public web infrastructure, event and campaign operations, and policy communications from 2017 onward.",
    shortWording: "Founding-era NYC Artist Coalition organizer",
    detailedPublicWording:
      "Jamie's documented and reviewed role began in the coalition's founding period and centered on operating and public-facing systems; this does not make him the sole founder, sole leader, or author of every coalition action.",
    sourceBasis:
      "Public 2017 interview and campaign records, public-safe project history, and Jamie's reviewed role attestation.",
    guardrail:
      "Use founding-era organizer, not sole founder; preserve collaborator, campaign, legislative, agency, and institutional credit.",
    doNotSay: ["Sole founder of NYC Artist Coalition", "Sole coalition leader", "Author of every coalition action"],
    protectedBoundaries: ["Unapproved collaborator identities", "Private membership records", "Private coalition history"],
    surfaces: ["work-card", "case-study", "resume"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["coalition-operations", "civic-systems", "policy-communications"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "nyc-artist-coalition-shared-public-identity",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source", "public-safe-archive-summary"],
    publicWording:
      "One shared NYC Artist Coalition public identity carried Fair Rent NYC, Save NYC Spaces, Let NYC Dance, and Talks Not Raids across the recovered 2017-2026 account record.",
    shortWording: "Shared public identity across four coalition campaigns",
    detailedPublicWording:
      "The population-accounted public corpus documents durable campaign communication under one shared account while preserving shared authorship and the explicit 1,757-item recovery gap.",
    sourceBasis:
      "Governed public @NYCArtC corpus, campaign markers, campaign sites, and deterministic derivation.",
    guardrail:
      "This supports identity continuity, not sole account authorship, audience reach, campaign outcomes, or recovery of every profile-reported post.",
    doNotSay: ["Jamie authored every post", "All 5,124 posts were recovered", "The account caused policy outcomes"],
    protectedBoundaries: ["Private account surfaces", "Authentication data", "Private messages", "Non-public analytics"],
    surfaces: ["work-card", "case-study", "technical-operations"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["public-identity-systems", "campaign-communications", "archive-production"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "nyc-artist-coalition-x-source-circulation",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source", "public-safe-archive-summary"],
    publicWording:
      "Among 696 recovered authored @NYCArtC posts, 446 linked outward to campaign tools, public records, reporting, forms, events, and field resources.",
    shortWording: "446 recovered authored posts linked to public action and source paths",
    detailedPublicWording:
      "The governed corpus contains 529 outgoing-link occurrences representing 287 distinct authored short URLs; every one of the 1,235 distinct account-item short URLs resolved in the population-accounted pass.",
    sourceBasis:
      "Governed public @NYCArtC corpus, URL-resolution inventory, manifest, and deterministic derivation.",
    sourceNote:
      "The profile-reported 5,124-post population is explicitly accounted for as 3,367 recovered account items plus a 1,757-item recovery gap; Jamie's account-establishment role remains open research.",
    guardrail:
      "Posted destinations prove circulation only, not endorsement, article accuracy, audience reach, authorship, or causation.",
    doNotSay: ["Every link was endorsed", "Link posting proves audience reach", "Links caused policy outcomes"],
    protectedBoundaries: ["Private analytics", "Private messages", "Session data", "Unredacted contact details"],
    surfaces: ["work-card", "case-study", "technical-operations"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["source-circulation", "public-communications", "archive-production"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "wowlist-public-support-practice",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source", "public-safe-archive-summary"],
    publicWording:
      "WOWList's public account and support record document organizer-facing help with location scope, list discovery, event entry, and publishing-workflow friction.",
    shortWording: "Organizer-facing WOWList product support",
    detailedPublicWording:
      "The recovered public record shows a practical support loop around how organizers discovered lists, scoped locations, entered events, and used distribution workflows.",
    sourceBasis:
      "Governed public WOWList account corpus and public-safe product-support archive review.",
    guardrail:
      "Describe visible support practice, not complete customer-service coverage, resolution of every issue, or Jamie's sole authorship of every reply.",
    doNotSay: ["Every support issue was resolved", "Jamie authored every support reply"],
    protectedBoundaries: ["Private user data", "Private support messages", "Account credentials"],
    surfaces: ["work-card", "case-study", "technical-operations"],
    relatedProjects: ["wowlist"],
    relatedCapabilities: ["product-support", "workflow-discovery", "community-operations"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "wowlist-civic-care-circulation",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source", "public-safe-archive-summary"],
    publicWording:
      "WOWList's public account combined direct calendar links with circulation of demonstrations, vigils, fundraisers, and mutual-aid resources.",
    shortWording: "Calendar distribution joined with civic-care circulation",
    detailedPublicWording:
      "The recovered account record documents a public-use pattern in which event infrastructure also circulated time-sensitive civic and community-care information.",
    sourceBasis:
      "Governed public WOWList account corpus and deterministic mission-relevant classification.",
    guardrail:
      "Treat this as a recovered public-use pattern, not proof of organizer attendance, audience reach, endorsement, or event outcomes.",
    doNotSay: ["WOWList organized every listed action", "Posting proves attendance or outcomes"],
    protectedBoundaries: ["Private user records", "Private organizer communications", "Non-public analytics"],
    surfaces: ["work-card", "case-study"],
    relatedProjects: ["wowlist"],
    relatedCapabilities: ["public-information-circulation", "community-systems", "archive-production"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "kc-town-hall-neighborhood-operations",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source", "public-safe-archive-summary", "jamie-review-confirmation"],
    publicWording:
      "An archived Tired of Tires page names Julia and Jamie as authors and KC Town Hall with Oak Park Neighborhood Association as partners; the recovered project-account corpus contains 99 authored posts documenting or coordinating that work and visible incoming dialogue from at least three sitting Council-member accounts.",
    shortWording: "Documented neighborhood operations and civic dialogue",
    detailedPublicWording:
      "The public record preserves shared program authorship, partner credit, sustained operational communication, and a narrow lower bound of visible Council-member-account dialogue.",
    sourceBasis:
      "Archived public program page, governed 181-item project-account corpus, and public role corroboration.",
    guardrail:
      "Do not assign every post or later operation to Jamie, convert visible dialogue into endorsement, or present self-reported tire outcomes as independently verified.",
    doNotSay: ["Jamie alone ran Tired of Tires", "Council engagement proves endorsement", "Every project-account post was Jamie's"],
    protectedBoundaries: ["Private neighborhood records", "Private messages", "Unapproved resident identities"],
    surfaces: ["work-card", "case-study", "technical-operations"],
    relatedProjects: ["kc-town-hall"],
    relatedCapabilities: ["neighborhood-operations", "public-documentation", "stakeholder-communication"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "kc-town-hall-held-role-research",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["public-safe-archive-summary", "jamie-review-confirmation"],
    publicWording:
      "Research is preserving and testing Jamie's recollections of a Phase One general-contractor role, survey-system authorship, detailed Tired of Tires field operations and later service geography, and Cleveland Avenue Unify to Beautify design support.",
    shortWording: "Held KC Town Hall role research",
    detailedPublicWording:
      "The knowledge bank retains these first-person memories as attributed leads, with contracts, permits, invoices, schedules, drawings, disposal records, neighborhood materials, public artifacts, photographs, and bounded collaborator confirmation identified as potential corroboration paths.",
    sourceBasis:
      "Jamie's July 15, 2026 first-person account, public-safe appraisal of the private 2019 CCED proposal packet, archived Tired of Tires page, and governed KC Town Hall account corpus.",
    guardrail:
      "These are research leads, not independently confirmed accomplishments. Use project manager for the proposal-backed construction role; do not claim sole authorship, sole operation, verified tire outcomes, Indian Mound expansion, Cleveland Avenue co-founding, or causal influence on capital funding without further evidence.",
    doNotSay: [
      "General-contractor title independently confirmed",
      "Jamie alone designed or operated Tired of Tires",
      "Indian Mound expansion independently confirmed",
      "Cleveland Avenue co-founding independently confirmed",
      "Cleveland Avenue work caused a City capital allocation"
    ],
    protectedBoundaries: [
      "Contracts and invoices",
      "Permits and schedules",
      "Resident responses and contact records",
      "Private neighborhood-association records",
      "Unapproved collaborator correspondence"
    ],
    surfaces: ["case-study"],
    relatedProjects: ["kc-town-hall"],
    relatedCapabilities: [
      "construction-coordination",
      "participatory-research",
      "field-operations",
      "civic-design"
    ],
    lastReviewed: "2026-07-15"
  },
  {
    id: "knowledge-systems-documentation-practice",
    status: "ready",
    supportLevel: "moderate",
    evidenceClass: ["approved-resume", "public-safe-archive-summary"],
    publicWording:
      "Builds knowledge systems and documentation through source maps, meeting synthesis, public guidance, resource libraries, templates, and reusable reference systems.",
    shortWording: "Knowledge systems and reusable documentation",
    detailedPublicWording:
      "Jamie turns source material, meetings, public guidance, working resources, and recurring formats into reference systems that collaborators can review, reuse, and hand off.",
    sourceBasis:
      "Approved public positioning and public-safe aggregate review of Jamie's source maps, campaign memory, guidance, resource, template, and handoff work.",
    whyItMatters:
      "Supports the portfolio's knowledge-systems capability as a complete proposition rather than through an incidental shared word.",
    guardrail:
      "Describe a cross-project working practice; do not imply every private source system or collaborator record is public.",
    doNotSay: [
      "All underlying source systems are public",
      "Every collaborator approved publication of private records"
    ],
    protectedBoundaries: [
      "Private source maps",
      "Private meeting records",
      "Credentials",
      "Unapproved collaborator materials"
    ],
    surfaces: ["homepage", "resume", "technical-operations", "about"],
    relatedProjects: [],
    relatedCapabilities: [
      "knowledge-systems",
      "documentation",
      "source-mapping",
      "meeting-synthesis"
    ],
    lastReviewed: "2026-07-15"
  },
  {
    id: "professional-focus-current",
    status: "ready",
    supportLevel: "moderate",
    evidenceClass: ["approved-resume", "jamie-review-confirmation"],
    publicWording:
      "Currently focused on technical project management, product operations, implementation, business analysis, civic and government technology delivery, and source-backed knowledge systems.",
    shortWording: "Current technical operations and civic technology focus",
    detailedPublicWording:
      "Jamie Burkart is based in Brooklyn and currently presents his demonstrated implementation and documentation practice toward technical project management, implementation lead, product operations, business analysis, civic technology delivery, and bounded source-backed knowledge systems roles.",
    sourceBasis:
      "Jamie's approved public positioning and reviewed current professional focus.",
    whyItMatters:
      "Distinguishes the roles Jamie is seeking now from historical project outcomes.",
    guardrail:
      "Frame this as current professional direction and demonstrated practice, not a claim of formal certification or government employment.",
    doNotSay: [
      "Certified PMP",
      "Government employee",
      "Production AI platform vendor"
    ],
    protectedBoundaries: [
      "Private job-search records",
      "Unannounced applications",
      "Private employer conversations"
    ],
    surfaces: ["homepage", "about", "resume"],
    relatedProjects: [],
    relatedCapabilities: [
      "technical-project-management",
      "product-operations",
      "implementation",
      "business-analysis",
      "civic-technology",
      "source-backed-memory"
    ],
    lastReviewed: "2026-07-15"
  },
  {
    id: "professional-practice-values",
    status: "ready",
    supportLevel: "moderate",
    evidenceClass: ["jamie-review-confirmation"],
    publicWording:
      "Values public benefit, accessibility, source-backed memory, careful claims, collective credit, consent, privacy, repair, and documentation that helps future collaborators safely continue the work.",
    shortWording: "Careful, source-backed, continuity-minded practice",
    detailedPublicWording:
      "Jamie aims to clarify what is known, protect what should stay private, and leave behind documentation and handoffs that future collaborators can safely use.",
    sourceBasis: "Jamie's reviewed public statement of professional practice values.",
    whyItMatters:
      "Makes the operating ethics behind the portfolio's evidence, credit, and handoff practices explicit.",
    guardrail:
      "Treat as a statement of practice and intent, not proof that every past project perfectly realized every value.",
    doNotSay: [
      "Every collaborator endorsed this statement",
      "Every historical project fully achieved every listed value"
    ],
    protectedBoundaries: [
      "Private collaborator feedback",
      "Private repair processes",
      "Unpublished consent records"
    ],
    surfaces: ["homepage", "about"],
    relatedProjects: [],
    relatedCapabilities: [
      "public-benefit",
      "accessibility",
      "collective-credit",
      "privacy",
      "handoffs"
    ],
    lastReviewed: "2026-07-15"
  },
  {
    id: "thick-arts-studio-services",
    status: "ready",
    supportLevel: "moderate",
    evidenceClass: ["approved-resume", "public-safe-archive-summary"],
    publicWording:
      "Leads an independent web strategy, design, and engineering studio delivering maintainable publishing systems, campaign hubs, e-commerce workflows, documentation infrastructure, resource libraries, and post-launch maintenance.",
    shortWording: "Independent web strategy, design, and engineering studio",
    detailedPublicWording:
      "Through THICK ARTS, Jamie translates client and collaborator needs into maintainable public web systems, campaign and publishing surfaces, e-commerce workflows, documentation and resource infrastructure, and post-launch maintenance.",
    sourceBasis:
      "Approved public resume and public-safe aggregate review of Jamie's long-running web, campaign, publishing, documentation, e-commerce, and maintenance work.",
    whyItMatters:
      "Supports the service scope of Jamie's independent practice without borrowing a generic documentation phrase from an unrelated career summary.",
    guardrail:
      "Present as Jamie's self-attested working history and service scope; do not imply a larger agency, unverified staff, or that every service was delivered to every client.",
    doNotSay: [
      "THICK ARTS has a larger agency staff",
      "Every client received every listed service",
      "Third-party employment or client verification is complete"
    ],
    protectedBoundaries: [
      "Private client identities",
      "Contracts",
      "Credentials",
      "Unpublished client work",
      "Confidential operating details"
    ],
    surfaces: ["resume"],
    relatedProjects: [],
    relatedCapabilities: [
      "web-strategy",
      "design",
      "engineering",
      "documentation",
      "maintenance"
    ],
    lastReviewed: "2026-07-15"
  },
  {
    id: "thick-arts-founder-role-history",
    status: "ready",
    supportLevel: "moderate",
    evidenceClass: ["approved-resume", "jamie-review-confirmation"],
    publicWording:
      "Founder, Technical Project Manager, and Web Systems Lead at THICK ARTS, Jamie's independent practice, from 2012 to the present.",
    shortWording: "THICK ARTS founder and technical project lead since 2012",
    sourceBasis: "Approved public resume and Jamie's reviewed professional-history attestation.",
    guardrail:
      "Present as Jamie's independent practice and self-attested role history; do not imply a larger employer or unverified staff structure.",
    doNotSay: ["Third-party employment verification", "A larger agency staff unless separately sourced"],
    protectedBoundaries: ["Private clients", "Contracts", "Tax records", "Unpublished client work"],
    surfaces: ["resume"],
    relatedProjects: [],
    relatedCapabilities: ["technical-project-management", "web-systems", "implementation"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "wowlist-cofounder-role-history",
    status: "careful",
    supportLevel: "moderate",
    evidenceClass: ["approved-resume", "jamie-review-confirmation"],
    publicWording:
      "Co-Founder, Product and Community Systems for WOWList.org from 2015 to 2020.",
    shortWording: "WOWList co-founder and product/community systems lead",
    sourceBasis: "Approved public resume and Jamie's reviewed professional-history attestation.",
    guardrail:
      "Keep co-founder and co-built language collective; do not infer sole authorship, sole ownership, or sole responsibility for adoption.",
    doNotSay: ["Jamie solely founded WOWList", "Jamie alone built every system", "Jamie alone secured adoption"],
    protectedBoundaries: ["Unapproved collaborator names", "Private ownership records", "Private user data"],
    surfaces: ["resume"],
    relatedProjects: ["wowlist"],
    relatedCapabilities: ["product-systems", "community-platforms"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "sunday-dinner-founder-role-history",
    status: "ready",
    supportLevel: "moderate",
    evidenceClass: ["approved-resume", "jamie-review-confirmation"],
    publicWording:
      "Founder and Systems Steward for Sunday Dinner and 196 Artists Residency from 2012 to the present.",
    shortWording: "Sunday Dinner / 196 founder and systems steward",
    sourceBasis: "Approved public resume and Jamie's reviewed project-history attestation.",
    guardrail:
      "The role title does not transfer ownership of participant work or make private community records public.",
    doNotSay: ["Jamie owns resident work", "The complete participant archive is public"],
    protectedBoundaries: ["Participant identities", "Private messages", "Guest lists", "Unapproved media"],
    surfaces: ["resume"],
    relatedProjects: ["196-sunday-dinner"],
    relatedCapabilities: ["hosting", "onboarding", "continuity-systems"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "kc-town-hall-cofounder-role-history",
    status: "careful",
    supportLevel: "moderate",
    evidenceClass: ["approved-resume", "jamie-review-confirmation"],
    publicWording:
      "Co-Founder and Project Manager for KC Town Hall LLC's historic-restoration and mixed-use-development work from 2015 to 2024.",
    shortWording: "KC Town Hall co-founder and project manager",
    sourceBasis: "Approved public resume and Jamie's reviewed professional-history attestation.",
    guardrail:
      "Keep the title separate from institutional funding decisions, executed-agreement claims, receipt of funds, completion, and current property status.",
    doNotSay: ["Jamie alone secured public funding", "Funding was received", "The project was completed as proposed"],
    protectedBoundaries: ["Private ownership records", "Financial details", "Legal details", "Current property status"],
    surfaces: ["resume"],
    relatedProjects: ["kc-town-hall"],
    relatedCapabilities: ["project-management", "public-benefit-documentation"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "ucsc-degree-honors",
    status: "ready",
    supportLevel: "moderate",
    evidenceClass: ["approved-resume", "jamie-review-confirmation"],
    publicWording:
      "B.A. in Film and Digital Media, with Honors, from the University of California, Santa Cruz.",
    shortWording: "UCSC B.A., Film and Digital Media, Honors",
    sourceBasis: "Approved public resume and Jamie's reviewed education attestation.",
    guardrail: "Treat as a self-attested education record unless formal verification is separately requested.",
    doNotSay: ["Graduate degree", "A different major", "Third-party verification already completed"],
    protectedBoundaries: ["Student ID", "Transcript", "Dates not approved for publication"],
    surfaces: ["resume"],
    relatedProjects: [],
    relatedCapabilities: [],
    lastReviewed: "2026-07-15"
  },
  {
    id: "work-authorization-driver-license",
    status: "ready",
    supportLevel: "moderate",
    evidenceClass: ["approved-resume", "jamie-review-confirmation"],
    publicWording:
      "Valid New York State driver's license; authorized to work in the United States with no U.S. sponsorship required.",
    shortWording: "NYS driver's license and U.S. work authorization",
    sourceBasis: "Approved public resume and Jamie's reviewed eligibility attestation.",
    guardrail:
      "Publish only the general eligibility statement; never publish license, identity-document, or immigration-record numbers or scans.",
    doNotSay: ["Government verification completed", "Any license or identity-document number"],
    protectedBoundaries: ["License number", "Identity documents", "Immigration records", "Scans"],
    surfaces: ["resume"],
    relatedProjects: [],
    relatedCapabilities: [],
    lastReviewed: "2026-07-15"
  },
  {
    id: "technical-stack-operating-history",
    status: "ready",
    supportLevel: "moderate",
    evidenceClass: ["approved-resume", "public-safe-archive-summary"],
    publicWording:
      "Working technical history spanning JavaScript / TypeScript, Node.js, React / Next.js, Ember.js, Python / Django, SQL, Git / GitHub, Docker / Dokku, QGIS, open-data workflows, APIs, and data-product requirements.",
    shortWording: "Cross-stack web, data, and implementation experience",
    detailedPublicWording:
      "Jamie's public and public-safe project record documents implementation work across modern and legacy web stacks, deployment systems, open-data workflows, geographic tools, APIs, and data-product requirements.",
    sourceBasis:
      "Approved public resume, public repositories, deployed project surfaces, and public-safe aggregate code and project-history review.",
    guardrail:
      "This is a working-history inventory, not a claim of equal current mastery, certification, or sole authorship in every technology.",
    doNotSay: [
      "Expert certification in every listed technology",
      "Sole author of every listed system",
      "Equal current depth across every listed tool"
    ],
    protectedBoundaries: [
      "Private repositories",
      "Credentials",
      "Client source code",
      "Unpublished infrastructure details"
    ],
    surfaces: ["resume"],
    relatedProjects: [],
    relatedCapabilities: ["web-systems", "open-data", "implementation"],
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
      "Jamie usually enters when important public-facing work is still loosely defined, listens across stakeholders, maps what is known and unknown, clarifies requirements, turns them into bounded plans with visible owners, milestones, releases, and handoffs, coordinates delivery, surfaces risk, maintains decision records, creates runbooks and source maps, prepares onboarding materials, supports launch and adoption, and leaves maintainable workflows and documentation that people can use without replaying every meeting.",
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
    surfaces: ["homepage", "resume", "technical-operations", "work-card", "about"],
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
