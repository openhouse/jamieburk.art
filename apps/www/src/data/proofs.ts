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
  structuredClaimIds?: string[];
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
    structuredClaimIds: ["CLM-CALLNYC-INDEPENDENT-FOLLOW-ON"],
    lastReviewed: "2026-07-11"
  },
  {
    id: "callnyc-council-member-engagement",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source", "public-safe-archive-summary"],
    publicWording:
      "CallNYC used CouncilStat data to create a public recognition and feedback loop with Council offices; 11 surviving public posts document engagement by accounts of 10 then-sitting NYC Council members.",
    shortWording: "Public response from 10 sitting NYC Council-member accounts",
    detailedPublicWording:
      "CallNYC used CouncilStat data to create a public recognition and feedback loop with Council offices. Eleven surviving public posts document engagement by accounts of 10 then-sitting NYC Council members through interpretation, replies, amplification, acknowledgment, and a resident referral.",
    sourceBasis:
      "Public posts from Council-member accounts and a public-safe archival review of the account timeline and quote-post search results.",
    sourceNote:
      "The account recovery found 107 visible entries against 110 reported posts; three remain unrecovered.",
    whyItMatters:
      "Shows that the resident-facing prototype also created a legible feedback loop with public offices.",
    guardrail:
      "Keep this at account level. Engagement does not establish Council commissioning, adoption, partnership, institutional endorsement, or who personally typed each post.",
    doNotSay: [
      "The New York City Council endorsed CallNYC",
      "Ten Council members formally endorsed CallNYC",
      "Every tagged Council member engaged",
      "The complete account history was recovered",
      "Jamie personally conversed with every member"
    ],
    protectedBoundaries: [
      "Unrecovered account entries",
      "Unidentified liker and reposter identities",
      "Private account data",
      "Unverified personal authorship"
    ],
    surfaces: ["technical-operations", "case-study"],
    relatedProjects: ["callnyc"],
    relatedCapabilities: ["open-data", "stakeholder-engagement", "public-feedback-loops"],
    structuredClaimIds: ["CLM-CALLNYC-COUNCIL-MEMBER-ENGAGEMENT"],
    lastReviewed: "2026-07-12"
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
    id: "fair-rent-operating-layer-design",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-safe-archive-summary"],
    publicWording:
      "Jamie designed a shared intake path, recurring meetings, reusable messages, a process for gathering stories with permission, and an implementation plan for a Commercial Rent Stabilization collaboration. He also created an initial shared working record: running minutes, open questions, action items, privacy rules, and named next steps that gave collaborators a place to track follow-up and carry decisions forward. Campaign decisions and outcomes remained collective.",
    shortWording: "Created a shared working record and designed broader coalition operations",
    detailedPublicWording:
      "Jamie created an initial shared working record that turned meetings into running minutes, open questions, action items, privacy rules, and named next steps. He separately designed a broader system for joining, recurring coordination, reusable communications, permission-based story gathering, and implementation planning; the evidence does not establish that those proposed components were completed or adopted.",
    sourceBasis:
      "Public-safe review of protected 2026 operating-design and running-memory records.",
    sourceNote:
      "The protected evidence supports the initial working record and broader system design, not completion or coalition-wide adoption of every proposed component.",
    whyItMatters:
      "Makes Jamie's current product-operations and implementation practice concrete without exposing the coalition's private working record.",
    guardrail:
      "Separate the working record Jamie created from the broader components he designed; keep coalition outcomes collective and do not imply that every proposed component was adopted or completed.",
    doNotSay: [
      "Jamie built the entire movement",
      "Every proposed component was completed",
      "The coalition adopted the full plan",
      "Jamie owned all strategy or follow-up",
      "Jamie authored the legislation"
    ],
    protectedBoundaries: [
      "Private coalition notes",
      "Current strategy",
      "Stakeholder identities and contact data",
      "Sensitive business stories",
      "Private correspondence",
      "Unapproved working documents"
    ],
    surfaces: ["technical-operations", "case-study", "resume"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["product-operations", "implementation", "knowledge-systems", "stakeholder-coordination"],
    structuredClaimIds: ["CLM-CRS-SHARED-OPERATING-LAYER-2026"],
    lastReviewed: "2026-07-13"
  },
  {
    id: "fair-rent-source-map",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: [
      "approved-resume",
      "public-safe-archive-summary",
      "firsthand-collaborator-context"
    ],
    publicWording:
      "Created a legislative source map and provenance redline tracing Commercial Rent Stabilization bill language across public policy lineages and revision paths.",
    shortWording: "Created a legislative source map and provenance redline",
    detailedPublicWording:
      "Jamie prepared a tracked-change legislative provenance redline that made source layers visible from City Council Intro 93 through Fair Rent NYC recommendations, Small Business Survival Act lineage, and Albany Senate Bill S8319 revisions.",
    sourceBasis:
      "A protected 2026 provenance redline identifies Jamie as preparer and documents the tracked-change source sequence; approved resume language supports the public role framing.",
    sourceNote:
      "The protected artifact supports Jamie's preparer credit and the named source layers. It is not a public citation or an official legislative history.",
    guardrail:
      "Describe Jamie as the preparer of an unofficial working redline. Do not imply legal authority, underlying bill authorship, official status, adoption, endorsement, passage, or implementation.",
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
    structuredClaimIds: ["CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "experimental-media-systems-practice",
    status: "careful",
    supportLevel: "moderate",
    evidenceClass: ["public-source"],
    publicWording:
      "In 2011 Jamie collaborated with Drew Bolton and Garrett Fuselier on NTER CHNG, an interactive text-messaging installation presented through America: Now and Here Kansas City's visual-artists program. Other records document Jamie's interactive video, audio-software, and collaborative music work.",
    shortWording: "Documented creative-technical work across installation, software, video, and sound",
    detailedPublicWording:
      "Archived project and exhibition records document Jamie's collaboration with Drew Bolton and Garrett Fuselier on NTER CHNG, which joined software, gallery architecture, and audience text messages in a public group exchange. Additional dated records document Jamie's 20-minute VHS delay installation Time is Long and a Max/MSP experiment that reordered audio segments by pitch. A community-maintained Discogs release record lists him among the participants on Matmos's 99-contributor album The Consuming Flame; the official label page establishes the collaborative album context but does not individually name Jamie.",
    sourceBasis:
      "The archived NTER CHNG project site, America: Now and Here Kansas City's archived artist page, Cool Hunting's 2006 BAP Lab coverage, Monthly Music Hackathon NYC's 2013 project post, Thrill Jockey's album page, and the Discogs release record.",
    whyItMatters:
      "Preserves precise specimens showing how Jamie has joined technical mechanisms, human participation, and cultural experience without implying a continuous formal practice.",
    guardrail:
      "Keep each contribution at the precision of its source, preserve NTER CHNG's three-person credit, and do not convert participation into event organization, unspecified production credit, or sole authorship.",
    doNotSay: [
      "Jamie solely created, programmed, designed, or produced NTER CHNG",
      "NTER CHNG was presented at the Nerman Museum",
      "Jamie organized BAP Lab",
      "The Max/MSP experiment was a production product",
      "Jamie produced or composed the Matmos album",
      "The reviewed records identify Jamie's specific Matmos contribution"
    ],
    protectedBoundaries: [
      "Unapproved historical participants",
      "Participant messages or telephone numbers from archived exhibition pages",
      "Uncleared event photographs or video",
      "Unrecovered source code",
      "Unverified track-level credits"
    ],
    surfaces: ["lab", "about", "internal-only"],
    relatedProjects: ["nterchng", "time-is-long", "monthly-music-hackathon", "matmos-collaboration"],
    relatedCapabilities: ["interactive-media", "participatory-systems", "creative-coding", "audio-software", "collaboration"],
    structuredClaimIds: ["CLM-NTERCHNG-COLLABORATIVE-INSTALLATION-2011", "CLM-NTERCHNG-AMERICA-NOW-AND-HERE-2011", "CLM-NTERCHNG-REINSTALLATION-OPERATIONS-2011", "CLM-TIME-IS-LONG-INTERACTIVE-VHS-2006", "CLM-SORTED-AUDIO-MAX-MSP-2013", "CLM-MATMOS-CONSUMING-FLAME-PARTICIPANT-2020"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "nyc-artist-coalition-public-web-infrastructure",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["approved-resume", "public-source", "jamie-review-confirmation"],
    publicWording:
      "Co-founded NYC Artist Coalition and built public campaign websites for cultural-space advocacy, including the coalition site, FairRentNYC, Talks Not Raids, Save NYC Spaces, and Let NYC Dance public web surfaces.",
    shortWording: "Co-founded NYC Artist Coalition and built public campaign websites",
    detailedPublicWording:
      "Jamie co-founded NYC Artist Coalition and built campaign websites for the coalition, FairRentNYC, Talks Not Raids, Save NYC Spaces, and Let NYC Dance. The sites gave the public clear places to find resources, seek support, and participate. Campaign decisions and accomplishments remained collective.",
    sourceBasis: "Approved resume language, Jamie confirmation, and public campaign websites.",
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
    lastReviewed: "2026-07-13"
  },
  {
    id: "nyca-campaign-press-architecture",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source", "jamie-review-confirmation"],
    publicWording:
      "Built press sections across four NYC Artist Coalition campaign sites, organizing 46 campaign-to-article placements representing 45 distinct articles into public source trails.",
    shortWording: "Built public source trails across four campaign sites",
    detailedPublicWording:
      "Jamie built press sections across Let NYC Dance, Talks Not Raids, Save NYC Spaces, and FairRentNYC. Surviving live and archived views contain 46 placements representing 45 distinct articles; one NPR article appears on two sites.",
    sourceBasis:
      "Jamie review confirmation; surviving live campaign sites; the December 1, 2021 FairRentNYC Wayback capture; and the current FairRentNYC reference library.",
    sourceNote:
      "The inventory preserves each placement and each distinct article separately. Article bodies require claim-level review before their reporting is reused elsewhere.",
    whyItMatters:
      "Shows Jamie turning campaign context into navigable public evidence infrastructure, not merely publishing isolated calls to action.",
    guardrail:
      "Press placement documents source architecture. It does not imply publisher endorsement, Jamie's authorship of reporting, or sole credit for collective campaign outcomes.",
    doNotSay: [
      "Forty-five publishers endorsed NYC Artist Coalition",
      "Jamie authored the listed reporting",
      "Jamie alone selected every article",
      "Press coverage proves Jamie caused legislative or policy outcomes"
    ],
    protectedBoundaries: [
      "Private CMS records",
      "Private campaign strategy",
      "Unapproved editorial correspondence",
      "Private analytics",
      "Unreviewed article-body claims"
    ],
    surfaces: ["case-study", "technical-operations"],
    relatedProjects: ["fair-rent-nyc", "let-nyc-dance", "talks-not-raids", "save-nyc-spaces"],
    relatedCapabilities: ["campaign-websites", "source-mapping", "information-architecture", "public-guidance"],
    structuredClaimIds: ["CLM-NYCA-CAMPAIGN-PRESS-ARCHITECTURE"],
    lastReviewed: "2026-07-13"
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
      "Jamie built and stewarded workflows and shared materials that helped collaborators explain issues and coordinate calls to action. Campaign decisions and accomplishments remained collective.",
    sourceBasis:
      "Approved resume language, public campaign surfaces, and protected Shared Drive records with Jamie-attributed revision history for member onboarding, web deployment, public-meeting production, and machine-readable policy implementation.",
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
    structuredClaimIds: ["CLM-NYCA-OPERATING-INFRASTRUCTURE-2017-2019"],
    lastReviewed: "2026-07-14"
  },
  {
    id: "nyca-participation-system",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "public-source",
      "public-safe-archive-summary",
      "firsthand-collaborator-context"
    ],
    publicWording:
      "Helped establish and produce NYC Artist Coalition's recurring participation system across public event pages, cultural-space meetings, practical safety and advocacy sessions, and paths into hearings and campaign action.",
    shortWording: "Recurring participation system for NYC Artist Coalition",
    detailedPublicWording:
      "Jamie helped establish and produce a recurring participation system that made it easier for artists and organizers to gather, surface needs, find practical support, and move shared concerns into public hearings and campaign action. The events, pages, campaigns, and outcomes remained collective.",
    sourceBasis:
      "Jamie's first-person account; a 34-slot authenticated Facebook event census with 33 recovered records and one unresolved slot; selected public event pages; a protected public-meeting workflow with Jamie-attributed revision history; and independent reporting on Jamie's coalition advocacy and a Market Hotel town hall.",
    sourceNote:
      "The census establishes the recurring public system and event history. It does not assign Jamie authorship of every event page or turn Facebook response displays into attendance.",
    whyItMatters:
      "Shows Jamie designing and sustaining participation infrastructure that translated cultural-space concerns into usable public paths.",
    guardrail:
      "Use helped establish and produce. Preserve collective event authorship, distinguish rotating-venue practice from an uninterrupted monthly schedule, and keep attendance and policy causality separate.",
    doNotSay: [
      "Jamie alone organized every NYC Artist Coalition event",
      "Jamie authored every event page",
      "Every meeting happened monthly or at a different venue",
      "Facebook response totals equal attendance or unique people",
      "The event system alone caused legislation or agency change"
    ],
    protectedBoundaries: [
      "Guest and attendee identities",
      "Invite and friend context",
      "Comments and private analytics",
      "Working-document and meeting-access locators",
      "Private account administration",
      "Event-level divisions of labor not established by public records"
    ],
    surfaces: ["work-card", "case-study", "technical-operations"],
    relatedProjects: ["fair-rent-nyc", "let-nyc-dance", "talks-not-raids", "save-nyc-spaces"],
    relatedCapabilities: [
      "stakeholder-convening",
      "participation-systems",
      "event-operations",
      "public-guidance",
      "civic-systems"
    ],
    structuredClaimIds: ["CLM-NYCAC-PARTICIPATION-SYSTEM"],
    lastReviewed: "2026-07-14"
  },
  {
    id: "wowlist-community-platform",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "approved-resume",
      "public-source",
      "public-safe-archive-summary",
      "firsthand-collaborator-context"
    ],
    publicWording:
      "Co-built WOWList.org, a Django, PostgreSQL/PostGIS, and Ember community-calendar platform adopted by DIY arts and music organizers across roughly 35 city ecosystems.",
    shortWording: "WOWList reached roughly 35 city ecosystems",
    detailedPublicWording:
      "WOWList supported 1,800+ users, 16,000+ posts/events, followable keyword communities, natural-language event entry, weekly digest emails, embeddable calendars, and low-cost deployment for local calendar organizers.",
    sourceBasis:
      "Approved resume language, public-safe aggregate historical summary, and a 2015 Music Hackathon public post identifying Jamie as a co-organizer and WOW List as an event-sharing service.",
    sourceNote:
      "The Music Hackathon post supports only the co-organizer role and event-sharing-service description. Approved resume and archive sources separately support the stack, scale, and adoption wording.",
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
    lastReviewed: "2026-07-14"
  },
  {
    id: "music-hackathon-wowlist-role",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "In 2015, Music Hackathon publicly identified Jamie as a co-organizer and described WOW List as an event-sharing service.",
    detailedPublicWording:
      "A March 2015 Music Hackathon organizational post identifies Jamie as a co-organizer and describes WOW List as an event-sharing service, supplying bounded external role and product-description evidence.",
    sourceBasis:
      "Music Hackathon public post, March 20, 2015.",
    whyItMatters:
      "Provides contemporaneous institutional evidence for Jamie's organizing role and a clear description of the product's purpose.",
    guardrail:
      "Use only for the co-organizer role and event-sharing-service description; keep platform architecture, scale, adoption, and sole authorship separate.",
    doNotSay: [
      "Jamie solely founded Music Hackathon",
      "The post verifies WOW List's stack or scale",
      "Jamie alone built WOW List"
    ],
    protectedBoundaries: [
      "Private collaborator records",
      "Unrecovered role details",
      "Private user data"
    ],
    surfaces: ["internal-only"],
    relatedProjects: ["wowlist"],
    relatedCapabilities: ["community-platforms", "event-infrastructure", "community-organizing"],
    structuredClaimIds: ["CLM-MUSIC-HACKATHON-WOWLIST-ROLE"],
    lastReviewed: "2026-07-14"
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
    sourceBasis:
      "Approved resume language and public-safe aggregate project history support the scale claim; the 2017 Greene Hill profile documents weekly community dinners; a live Sunday Dinner project page and public Facebook event pages independently document a numbered hundredth dinner, a rotating eight-week New York City format, and a civic sign-making potluck. The aggregate counts rely on their separate support, not on a single event page or participant workflow.",
    sourceNote:
      "The live Sunday Dinner 100 page establishes a public floor of one hundred numbered iterations and credits Julia Fredenburg's image. It does not prove the 300-plus aggregate, attendance, an exact date, sole hosting, or image-reuse rights.",
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
    structuredClaimIds: [
      "CLM-SUNDAY-DINNER-WEEKLY-COMMUNITY-HOSTING",
      "CLM-SUNDAY-DINNER-HUNDREDTH-ITERATION-TRACE"
    ],
    lastReviewed: "2026-07-15"
  },
  {
    id: "196-residency-acceptance-workflow",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-safe-archive-summary", "jamie-review-confirmation"],
    publicWording:
      "A 2023 acceptance workflow shows Jamie reviewing one residency proposal, planning the space with the artist, and arranging 24-hour self-service access for the artist and a collaborator.",
    shortWording: "One documented residency acceptance and access workflow",
    detailedPublicWording:
      "A protected acceptance record signed by Jamie documents one 196 Artists Residency process: proposal review, a pre-arrival planning call, configuring the space for the project, and independent 24-hour access for an artist and collaborator.",
    sourceBasis:
      "One protected July 2023 residency acceptance and access record signed by Jamie.",
    whyItMatters:
      "Makes Jamie's hospitality and operating practice concrete without treating private participant records as public content.",
    guardrail:
      "One documented workflow only. It does not support the 20-plus resident-artist count, a universal residency process, participant identification, or publication consent.",
    doNotSay: [
      "This record proves 20-plus resident artists",
      "Every residency used this exact workflow",
      "The participant approved public identification",
      "Jamie created the participant's artwork"
    ],
    protectedBoundaries: [
      "Participant identity",
      "Contact information",
      "Access instructions",
      "Private messages",
      "Unapproved photographs or artwork"
    ],
    surfaces: ["case-study"],
    relatedProjects: ["196-sunday-dinner"],
    relatedCapabilities: ["onboarding", "artist-support", "space-configuration", "access-workflows"],
    structuredClaimIds: ["CLM-196-RESIDENCY-OPERATING-WORKFLOW-2023"],
    lastReviewed: "2026-07-14"
  },
  {
    id: "commercial-vacancy-public-data-pilot",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-safe-archive-summary", "jamie-review-confirmation"],
    publicWording:
      "Developed a privacy-preserving open-data pilot brief for geography-aggregated commercial vacancy and lease-cost indicators, with a minimum data model, coverage and suppression reporting, methods documentation, and explicit confidentiality limits.",
    shortWording: "Commercial vacancy and lease-cost open-data pilot",
    detailedPublicWording:
      "Jamie translated a public-data gap into a smallest serious pilot: reusable aggregate indicators, transparent coverage and suppression, plain-language methods, and explicit exclusions for raw confidential filings and identifying records.",
    sourceBasis:
      "A protected March 2026 public-data brief authored by Jamie and reviewed as a bounded project artifact.",
    whyItMatters:
      "Shows Jamie turning a complex policy and data opportunity into a concrete, privacy-aware implementation proposal.",
    guardrail:
      "Describe proposal design only. Do not imply agency sponsorship, formal acceptance, access to confidential filings, dataset publication, or measured policy impact.",
    doNotSay: [
      "The City adopted Jamie's proposal",
      "Jamie published the proposed dataset",
      "Jamie accessed confidential tax filings",
      "The pilot caused a policy outcome"
    ],
    protectedBoundaries: [
      "Private correspondence",
      "Unpublished routing context",
      "Contact information",
      "Raw confidential filings",
      "Unapproved agency discussions"
    ],
    surfaces: ["technical-operations", "case-study"],
    relatedProjects: ["fair-rent-nyc", "commercial-vacancy-open-data"],
    relatedCapabilities: ["open-data", "requirements", "privacy", "policy-translation"],
    structuredClaimIds: ["CLM-COMMERCIAL-VACANCY-PUBLIC-DATA-PILOT-2026"],
    lastReviewed: "2026-07-14"
  },
  {
    id: "project-social-identity-systems",
    status: "careful",
    supportLevel: "moderate",
    evidenceClass: ["public-source", "public-safe-archive-summary", "jamie-review-confirmation"],
    publicWording:
      "Established and connected public project identities across websites and social accounts for CallNYC, NYC Artist Coalition, WOWList, KC Spaces Fund, and KC Town Hall, creating durable publishing surfaces collaborators could use over time.",
    shortWording: "Established durable public identities collaborators could use",
    detailedPublicWording:
      "Jamie established project accounts and connected them to their public websites. The identities remained usable by collaborators across civic technology, coalition advocacy, community publishing, mutual aid, and neighborhood work; individual post authorship and later stewardship remained shared or project-specific.",
    sourceBasis:
      "Jamie's first-person confirmation, public project-site links, authenticated public profiles, bounded 2026 timeline reviews, and the public-safe @NYCArtC population ledger.",
    sourceNote:
      "The public record verifies the account map and later use. Jamie's account-establishment role remains first-person unless a collaborator or platform record supplies independent corroboration.",
    whyItMatters:
      "Shows product and communications infrastructure that outlived a single launch and supported shared project stewardship.",
    guardrail:
      "Claim account establishment and identity-system work only. Do not attribute every post, editorial decision, audience response, later stewardship action, or project outcome to Jamie.",
    doNotSay: [
      "Jamie authored every project post",
      "Jamie controlled every account for its entire life",
      "Follower counts prove impact",
      "Social engagement proves Jamie caused campaign or policy outcomes"
    ],
    protectedBoundaries: [
      "Private messages",
      "Account access records",
      "Credentials",
      "Private analytics",
      "Unpublished drafts",
      "Follower identities",
      "Personal contact information"
    ],
    surfaces: ["technical-operations", "case-study"],
    relatedProjects: ["callnyc", "fair-rent-nyc", "wowlist", "kc-spaces-fund", "kc-town-hall"],
    relatedCapabilities: ["public-facing-web-systems", "publishing-infrastructure", "information-architecture", "shared-stewardship"],
    structuredClaimIds: ["CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS", "CLM-NYCA-SHARED-SOCIAL-IDENTITY", "CLM-NYCA-SHARED-PUBLISHING-SYSTEM-RANGE"],
    lastReviewed: "2026-07-14"
  },
  {
    id: "nyca-council-member-account-engagement",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source", "public-safe-archive-summary"],
    publicWording:
      "By establishing @NYCArtC as a shared address, Jamie gave collaborators a durable public identity that Council-member accounts could recognize, reply to, invite, and amplify across campaigns; a bounded 2026 review recovered 20 in-term returned posts from seven Council-member accounts.",
    shortWording: "Bounded account-level proof that @NYCArtC became a recognizable address for replies, invitations, and amplification",
    detailedPublicWording:
      "The shared coalition identity remained usable across campaigns as a public address for recognition, replies, invitations, amplification, and policy discussion. Twenty in-term posts returned from seven Council-member accounts provide bounded evidence of that use.",
    sourceBasis:
      "A public-safe authenticated X review of 485 unique returned statuses, with account identity and Council service dates reviewed before counting.",
    sourceNote:
      "Seventeen in-term results rendered @NYCArtC explicitly; three exposed it through X's collapsed reply-recipient context. Three additional results outside the authors' Council terms were excluded.",
    whyItMatters:
      "Shows that the coalition identity became legible enough for public officials to acknowledge, reply to, invite, and amplify across several campaign contexts.",
    guardrail:
      "Keep this at account level and as a minimum recovered search count. Do not infer personal authorship, formal endorsement, commissioning, adoption, partnership, or policy causality.",
    doNotSay: [
      "The New York City Council endorsed NYC Artist Coalition",
      "Seven Council members formally endorsed every coalition campaign",
      "Every tagged Council member engaged",
      "Jamie personally communicated with every member",
      "The search recovered every relevant post"
    ],
    protectedBoundaries: [
      "Private messages",
      "Account-access records",
      "Private analytics",
      "Unrecovered or deleted posts",
      "Unverified personal authorship"
    ],
    surfaces: ["technical-operations", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["public-engagement", "policy-communications", "coalition-operations", "source-mapping"],
    structuredClaimIds: ["CLM-NYCA-COUNCIL-MEMBER-ACCOUNT-ENGAGEMENT"],
    lastReviewed: "2026-07-14"
  },
  {
    id: "kc-spaces-fund-digital-infrastructure",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["public-source", "public-safe-archive-summary", "ai-assisted-archive-review"],
    publicWording:
      "Built KC Spaces Fund's campaign website and supported a project name that worked consistently across web and social channels for the collaborator-led 2020 mutual-aid campaign.",
    shortWording: "Website and cross-channel identity support for KC Spaces Fund",
    detailedPublicWording:
      "Jamie built and maintained the campaign's Ghost-based web stack, customized a reusable campaign theme, supported donation, application, sign-up, and fundraising-display affordances, and helped select a project name available across web and social channels. The collaborator-led Facebook Page used that shared identity while public organizer credit remains with the campaign's named organizers.",
    sourceBasis:
      "Jamie's first-person role clarification, public GoFundMe and campaign routes, the authenticated Facebook census, and AI-assisted archival review of Jamie-provided project records summarized without exposing private source material.",
    sourceNote:
      "Use as an evidence-based archival proof note, not a human collaborator testimonial.",
    whyItMatters:
      "Shows rapid public-facing implementation, technical operations, and campaign infrastructure support for a collective mutual-aid effort.",
    guardrail:
      "Website, digital-operations, and bounded naming support only. Do not frame Jamie as sole naming author, Page owner, post author, public organizer, grant decision-maker, fiscal sponsor, or campaign owner.",
    doNotSay: [
      "Jamie organized KC Spaces Fund",
      "Jamie ran the fundraiser",
      "Jamie made grant decisions",
      "Jamie was the fiscal sponsor",
      "Jamie managed or posted from the Facebook Page",
      "Jamie alone named KC Spaces Fund",
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
    structuredClaimIds: ["CLM-KCSPACES-DIGITAL-IDENTITY-SUPPORT"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "kc-spaces-fund-public-operations-timeline",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source", "public-safe-archive-summary"],
    publicWording:
      "A bounded review of KC Spaces Fund's public account recovered application guidance, fundraising and partner communication, and 11 account-authored #FUNDED grantee highlights.",
    shortWording: "KC Spaces Fund public operations timeline",
    detailedPublicWording:
      "The recovered account history shows how the collective campaign made applications, fundraising, partnerships, and funded-grantee communication legible in public. It does not assign the campaign's posts, grant decisions, organizer role, or fiscal sponsorship to Jamie.",
    sourceBasis:
      "Authenticated public-account review recovering 34 of 35 profile entries, including 27 account-authored posts and seven reposts.",
    sourceNote:
      "Retained as bank-only project context; it does not strengthen Jamie's separate technical-infrastructure claim.",
    whyItMatters:
      "Preserves evidence of how the campaign's public communications supported an operational mutual-aid workflow without converting collective activity into individual credit.",
    guardrail:
      "Describe the account's recovered public function only. Do not infer complete recovery, grant authority, organizer status, fiscal sponsorship, or individual post authorship.",
    doNotSay: [
      "Jamie selected the grantees",
      "Jamie authored every KC Spaces Fund post",
      "The social timeline is a complete grantee or disbursement ledger",
      "Jamie was the campaign's public organizer or fiscal sponsor"
    ],
    protectedBoundaries: [
      "Applicant or grantee records",
      "Donor and subscriber data",
      "Private messages",
      "Account-access records",
      "Private analytics"
    ],
    surfaces: ["internal-only"],
    relatedProjects: ["kc-spaces-fund"],
    relatedCapabilities: ["public-communications", "campaign-operations", "source-mapping"],
    structuredClaimIds: [
      "CLM-KCSPACES-PUBLIC-OPERATIONS-TIMELINE",
      "CLM-KCSPACES-FACEBOOK-CAMPAIGN-ROUTING"
    ],
    lastReviewed: "2026-07-15"
  },
  {
    id: "kc-town-hall-public-operations-channel",
    status: "careful",
    supportLevel: "moderate",
    evidenceClass: ["public-source", "public-safe-archive-summary", "jamie-review-confirmation"],
    publicWording:
      "Established KC Town Hall's public account as part of the project identity; its surviving timeline later functioned as a resident-facing channel for neighborhood information and recurring #TiredOfTires pickups.",
    shortWording: "Established a project identity that became a resident-facing operations channel",
    detailedPublicWording:
      "Jamie confirms that he established @KCTownHall. A 2026 authenticated review recovered 170 of 183 profile entries, including 142 account-authored posts and 95 entries concerning #TiredOfTires, while preserving the distinction between account infrastructure, individual post authorship, program stewardship, and the separate CCED funding lifecycle.",
    sourceBasis:
      "Jamie's first-person account, the public @KCTownHall profile, and an authenticated public-safe timeline review.",
    sourceNote:
      "The public timeline establishes the account's later function; it does not assign each post or program action to Jamie.",
    whyItMatters:
      "Shows a public identity becoming practical neighborhood infrastructure rather than remaining a static project announcement.",
    guardrail:
      "Do not attribute every post, pickup, or later program action to Jamie. Keep the social timeline separate from the CCED award and stewardship-transition records.",
    doNotSay: [
      "Jamie authored every KC Town Hall post",
      "Jamie personally ran every tire pickup",
      "The account proves current program status",
      "The timeline proves funding disbursement or project completion"
    ],
    protectedBoundaries: [
      "Private messages",
      "Account access",
      "Personal contact details",
      "Private participant or pickup records",
      "Private property and funding context"
    ],
    surfaces: ["technical-operations", "case-study"],
    relatedProjects: ["kc-town-hall"],
    relatedCapabilities: ["public-guidance", "program-communications", "community-operations", "shared-stewardship"],
    structuredClaimIds: ["CLM-KCTOWNHALL-PUBLIC-OPERATIONS-CHANNEL"],
    lastReviewed: "2026-07-14"
  },
  {
    id: "kc-town-hall-phase-one-restoration-operations",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["public-safe-archive-summary", "jamie-review-confirmation"],
    publicWording:
      "Project records describe KC Town Hall's Phase One cold-shell work as completed in 2019. Jamie states that he served as general contractor, coordinating multiple trades and daily field sequencing, and designed a neighborhood survey handbill and response workflow used with local partners to shape proposed uses.",
    shortWording: "Coordinated Phase One restoration and a participatory neighborhood requirements process",
    detailedPublicWording:
      "A protected 2019 proposal packet records completed Phase One roof, masonry, framing, water, egress, safety, and related work. Jamie states that he served as Phase One's general contractor, coordinating historic masonry, roofing, carpentry, welding, engineering, architecture, plumbing, and related teams from daily work on site. He also states that he designed a four-by-six-inch neighborhood survey handbill and backing data system; the packet reproduces the survey, names Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as process partners, and says the results shaped the proposal.",
    sourceBasis:
      "Public-safe extraction from the protected 2019 KC Town Hall CCED proposal and support-letter packet, Jamie's July 2026 first-person account, and the public CCED municipal-review record.",
    sourceNote:
      "The packet directly supports Phase One scope, completion, local-trade context, and survey function. Jamie's general-contractor title, daily field method, trade-responsibility map, and handbill/data-system authorship remain first-person unless independently corroborated.",
    whyItMatters:
      "Shows hands-on implementation leadership across historic-building systems, professional and trade coordination, sequencing, field operations, participatory research, and public-purpose documentation.",
    guardrail:
      "Keep the project-prepared Phase One completion statement distinct from independent inspection; keep Jamie's role account labeled as first-person; preserve collaborator and neighborhood-partner credit; and never broaden Phase One completion into completion of the full redevelopment.",
    doNotSay: [
      "The full KC Town Hall redevelopment was completed",
      "The proposal independently identifies Jamie as general contractor",
      "Jamie personally performed every trade",
      "The record establishes Jamie's contractor-license classification",
      "Jamie alone conducted the neighborhood process",
      "The survey was representative or proved consensus",
      "The packet contains one reconciled Phase One total"
    ],
    protectedBoundaries: [
      "Survey responses and participant contact information",
      "Contractor invoices, contracts, and private responsibility records",
      "Financing, banking, legal, signature, and private property details",
      "Unapproved construction and participant photographs",
      "Unreviewed measured drawings, permits, schedules, and inspection records"
    ],
    surfaces: ["technical-operations", "case-study", "internal-only"],
    relatedProjects: ["kc-town-hall"],
    relatedCapabilities: [
      "construction-project-management",
      "vendor-coordination",
      "field-operations",
      "sequencing",
      "participatory-research",
      "stakeholder-engagement"
    ],
    structuredClaimIds: [
      "CLM-KCTOWNHALL-PHASE-ONE-COLD-SHELL-COMPLETION-2019",
      "CLM-KCTOWNHALL-PHASE-ONE-GENERAL-CONTRACTOR-ROLE",
      "CLM-KCTOWNHALL-PARTICIPATORY-SURVEY-SYSTEM-2019",
      "CLM-KCTOWNHALL-SITE-BASED-NEIGHBORHOOD-LISTENING"
    ],
    lastReviewed: "2026-07-15"
  },
  {
    id: "kc-town-hall-public-benefit-documentation",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: ["approved-resume", "public-source", "public-safe-archive-summary", "jamie-review-confirmation"],
    publicWording:
      "Co-led redevelopment planning and public-benefit documentation for adaptive reuse of a long-vacant historic building. The proposal earned a unanimous $490,539 CCED Board recommendation; Kansas City Council then accepted the recommendation and appropriated $490,539. After years of public review, Jamie transitioned stewardship to a mission-aligned organization. City records later closed the unused award as withdrawn.",
    shortWording: "Supported adaptive reuse planning and public-benefit documentation",
    detailedPublicWording:
      "Jamie presented the mixed-use proposal and helped shape planning, public-benefit documentation, stakeholder context, and municipal-review support. Independent reporting documents the prolonged City-contract process. Jamie confirms that he later transitioned stewardship to a mission-aligned organization; City records separately preserve the later administrative withdrawal and reappropriation.",
    sourceBasis: "Kansas City CCED Board meeting records, Kansas City Resolution 190649, Ordinances 190642 and 240317, December 2021 Kansas City Star reporting, approved resume language, public-safe project context, and Jamie review confirmation.",
    sourceNote:
      "All four CCED Board members voted to recommend $490,539 on July 16, 2019. On September 26, the City Council accepted the recommendation and appropriated $490,539. The project still lacked a final City contract in December 2021. Jamie confirms a later stewardship transition; the public record independently establishes only the surrounding timeline and the City's 2024 withdrawal and reappropriation actions.",
    guardrail:
      "Keep the Board recommendation, Council acceptance, appropriation, contract-delay state, Jamie's first-person stewardship transition, City withdrawal record, and reappropriation distinct. Do not imply the Council vote was unanimous, a funding agreement was executed, funds were disbursed, the City transferred the award, the full redevelopment was completed, or public sources establish the successor organization or transition terms. Phase One cold-shell completion is a separate project-record claim.",
    doNotSay: [
      "The City Council unanimously approved KC Town Hall",
      "KC Town Hall received and spent $490,539",
      "A funding agreement was executed",
      "The redevelopment was completed",
      "Jamie abandoned KC Town Hall",
      "The City transferred the CCED award to the successor organization",
      "Jamie alone developed the proposal",
      "Why the project withdrew",
      "Private financial details",
      "Official municipal endorsement beyond the recorded Council actions"
    ],
    protectedBoundaries: [
      "Private financial details",
      "Legal details",
      "Property details",
      "Banking details",
      "Stakeholder details",
      "Reason for the stewardship transition"
    ],
    surfaces: ["technical-operations", "work-card", "case-study"],
    relatedProjects: ["kc-town-hall"],
    relatedCapabilities: ["project-planning", "public-benefit-documentation", "stakeholder-context"],
    structuredClaimIds: ["CLM-KC-TOWN-HALL-PUBLIC-AWARD-LIFECYCLE", "CLM-KC-TOWN-HALL-STEWARDSHIP-TRANSITION"],
    lastReviewed: "2026-07-13"
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
      "Protected June 2026 proposal and system-specification artifacts authored by Jamie, represented through public-safe source and claim records.",
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
    structuredClaimIds: ["CLM-SOURCE-BACKED-MEMORY-DESIGN-2026"],
    lastReviewed: "2026-07-14"
  },
  {
    id: "technical-operations-operating-backbone",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["approved-resume", "public-safe-archive-summary"],
    publicWording:
      "Jamie builds the operating backbone teams need to move emerging public-facing technical work from early shape to launch.",
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
    sourceBasis:
      "A public-safe Maven certificate directly supports completion, course title, instructor names, and issuer. Approved resume language separately supports the 2026 date and curriculum summary.",
    sourceNote:
      "The certificate itself displays no completion date or curriculum detail.",
    guardrail:
      "Treat as professional development and course completion, not professional certification, employment, teaching, instructor affiliation, or proof of proficiency.",
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
    structuredClaimIds: ["CLM-AI-EVALS-COURSE-COMPLETION"],
    lastReviewed: "2026-07-15"
  },
  {
    id: "participatory-open-house-public-program",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "Developed participatory art and shared-space formats through collaborative Shop Shows and the 2006 UC Santa Cruz Open House.",
    shortWording: "Participatory art and shared-space formats, 2003-2006",
    detailedPublicWording:
      "Jamie developed formats that invited people to contribute, revise, and live alongside art through collaborative Shop Shows and the UC Santa Cruz Open House.",
    sourceBasis:
      "Independent 2006 Good Times Santa Cruz profile and public-safe source review.",
    whyItMatters:
      "Extends the operating-structure story into Jamie's early participatory practice without requiring immediate website projection.",
    guardrail:
      "Preserve housemate and participant credit; do not present the work as a formal housing or social-service program.",
    doNotSay: [
      "Jamie solely authored every Shop Show activity",
      "Open House was a formal public housing program",
      "All historical participants approved contemporary portfolio use"
    ],
    protectedBoundaries: [
      "Historical private addresses",
      "Unapproved participant identities",
      "Unapproved photographs",
      "Private correspondence"
    ],
    surfaces: ["internal-only"],
    relatedProjects: ["participatory-public-practice"],
    relatedCapabilities: ["facilitation", "participation-design", "public-programming"],
    structuredClaimIds: ["CLM-PARTICIPATORY-OPEN-HOUSE-AND-SHOP-SHOWS"],
    lastReviewed: "2026-07-12"
  },
  {
    id: "waterways-participatory-practice",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "Conceived and helped organize a collaborative raft expedition, then developed Great Accommodations as participatory river-city installation and public programming.",
    shortWording: "Participatory waterways projects connecting river cities",
    detailedPublicWording:
      "Jamie conceived a collaborative recycled-material raft expedition and later spearheaded Great Accommodations, inviting people in river cities to contribute stories and imagine shared civic life on the water.",
    sourceBasis:
      "Independent 2007 and 2009 Pitch reporting and Charlotte Street's 2009 institutional event record.",
    sourceNote:
      "The sources support a four-month journey from Kansas City to the Gulf of Mexico; the exact landing place remains open.",
    whyItMatters:
      "Shows a long practice of using technical making, public programs, and participatory systems to reconnect people with shared civic infrastructure.",
    guardrail:
      "Use collaborative language, name Suzanne Hogan for letter-based outreach, and distinguish the broadly established Gulf endpoint from an unrecovered exact landing place.",
    doNotSay: [
      "Jamie alone built and operated the raft",
      "The reviewed sources prove the exact Gulf landing place",
      "Jamie solely authored every Great Accommodations component"
    ],
    protectedBoundaries: [
      "Unapproved participant identities",
      "Private host records",
      "Unapproved photographs",
      "Incomplete route and responsibility data"
    ],
    surfaces: ["internal-only"],
    relatedProjects: ["waterways-participatory-practice"],
    relatedCapabilities: ["public-programming", "participation-design", "facilitation"],
    structuredClaimIds: [
      "CLM-WATERWAYS-RAFT-EXPEDITION",
      "CLM-GREAT-ACCOMMODATIONS-PARTICIPATORY-RIVER-CITIES"
    ],
    lastReviewed: "2026-07-13"
  },
  {
    id: "nyca-cabaret-law-direct-organizing",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source", "jamie-review-confirmation"],
    publicWording:
      "Organized fire-code study groups for DIY venues, rallied at City Hall, and testified as a NYC Artist Coalition member in support of repealing the Cabaret Law.",
    shortWording: "Direct organizing and testimony for Cabaret Law repeal",
    detailedPublicWording:
      "In 2017, Jamie organized fire-code study groups for DIY venues, rallied at City Hall, and testified before the City Council as part of the collective campaign to repeal the Cabaret Law.",
    sourceBasis:
      "Gothamist and Mixmag reporting, the Greene Hill Food Co-op interview, and the official New York City Council hearing transcript.",
    whyItMatters:
      "Makes Jamie's direct organizing legible while keeping the successful repeal a collective advocacy and legislative outcome.",
    guardrail:
      "Claim the documented actions directly; do not claim sole campaign leadership, legal authorship, or sole causality for repeal.",
    doNotSay: [
      "Jamie single-handedly repealed the Cabaret Law",
      "Jamie authored the repeal legislation",
      "NYC Artist Coalition acted alone",
      "Jamie provided legal advice"
    ],
    protectedBoundaries: [
      "Private coalition strategy",
      "Unapproved collaborator records",
      "Legal-review materials",
      "Private correspondence"
    ],
    surfaces: ["internal-only"],
    relatedProjects: ["nyc-artist-coalition", "let-nyc-dance"],
    relatedCapabilities: ["coalition-operations", "public-testimony", "policy-communications"],
    structuredClaimIds: ["CLM-NYCA-CABARET-LAW-DIRECT-ORGANIZING"],
    lastReviewed: "2026-07-13"
  },
  {
    id: "nyca-commercial-rent-testimony-2018",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "Testified before the New York City Council's Small Business Committee as a NYC Artist Coalition member, connecting commercial affordability to cultural-space safety and calling for fair leases and commercial rent protections.",
    shortWording: "Council testimony for commercial rent protections",
    detailedPublicWording:
      "In October 2018, Jamie testified as a NYC Artist Coalition member that cultural spaces are small businesses and that commercial affordability is a safety issue, then asked the Council to support fair leases and the Small Business Jobs Survival Act.",
    sourceBasis:
      "Official New York City Council Committee on Small Business hearing transcript, October 22, 2018.",
    whyItMatters:
      "Establishes a documented throughline from Jamie's cultural-space advocacy to his later commercial-rent research and coalition systems work.",
    guardrail:
      "Describe Jamie's testimony and advocacy directly; do not imply legal authorship, legal advice, passage, or sole policy causality.",
    doNotSay: [
      "Jamie authored the Small Business Jobs Survival Act",
      "Jamie provided legal advice",
      "Jamie's testimony caused the bill to pass",
      "The 2018 and current campaigns are the same project"
    ],
    protectedBoundaries: [
      "Private coalition strategy",
      "Legal-review materials",
      "Private correspondence",
      "Unapproved collaborator records"
    ],
    surfaces: ["case-study", "technical-operations"],
    relatedProjects: ["nyc-artist-coalition", "fair-rent-nyc"],
    relatedCapabilities: ["public-testimony", "policy-communications", "stakeholder-context"],
    structuredClaimIds: ["CLM-NYCA-COMMERCIAL-RENT-TESTIMONY-2018"],
    lastReviewed: "2026-07-13"
  },
  {
    id: "kc-eighth-street-tunnel-public-program",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "Led a downtown scavenger-hunt format and hosted a film screening in Kansas City's historic 8th Street Tunnel, connecting public art, transit history, and shared-space advocacy.",
    shortWording: "Participatory public-history program in the 8th Street Tunnel",
    detailedPublicWording:
      "In 2006, Jamie led participants through downtown Kansas City and hosted a three-film screening in the historic 8th Street Tunnel, using an unusual public program to connect transit history with artistic and shared-space possibilities.",
    sourceBasis:
      "Independent KCUR reporting published September 15, 2016.",
    whyItMatters:
      "Extends Jamie's early record of designing participatory formats that help people encounter public infrastructure and imagine future uses.",
    guardrail:
      "Do not imply ownership, current access, current safety, or official long-term authorization; keep this bank-only until it fits a public composition.",
    doNotSay: [
      "Jamie opened the tunnel to the public",
      "The tunnel is currently safe or open",
      "Jamie owned or controlled the site",
      "Event photographs are approved for publication"
    ],
    protectedBoundaries: [
      "Unapproved participant identities",
      "Unapproved photographs",
      "Current access details",
      "Private event records"
    ],
    surfaces: ["internal-only"],
    relatedProjects: ["participatory-public-practice"],
    relatedCapabilities: ["public-programming", "participation-design", "public-history"],
    structuredClaimIds: ["CLM-KC-EIGHTH-STREET-TUNNEL-PUBLIC-PROGRAM"],
    lastReviewed: "2026-07-13"
  },
  {
    id: "claudette-ar-collaboration",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "Collaborated with Michael Rees on an augmented-reality experience for MakeUseVisible Munich and co-produced its source video with Anne Dufy Burkart and Julia Fredenberg.",
    shortWording: "Collaborative augmented-reality experience and source-video production",
    detailedPublicWording:
      "Jamie collaborated with Michael Rees on the AR experience and shared source-video production credit with Anne Dufy Burkart and Julia Fredenberg.",
    sourceBasis:
      "Michael Rees's public Claudette's Theatre on Wheels project page.",
    whyItMatters:
      "Adds a source-backed example of collaborative media implementation while preserving production and authorship boundaries.",
    guardrail:
      "Do not claim sole AR implementation or sole video production; recover the technical stack and exhibition date before public projection.",
    doNotSay: [
      "Jamie solely built the AR experience",
      "Jamie solely produced the source video",
      "The technical stack is recovered",
      "The source video is cleared for publication"
    ],
    protectedBoundaries: [
      "Unapproved source video",
      "Unrecovered technical records",
      "Private production correspondence",
      "Unapproved images"
    ],
    surfaces: ["internal-only"],
    relatedProjects: ["claudette-theatre-on-wheels"],
    relatedCapabilities: ["augmented-reality", "media-production", "collaboration"],
    structuredClaimIds: ["CLM-CLAUDETTE-AR-COLLABORATION"],
    lastReviewed: "2026-07-13"
  },
  {
    id: "nyca-office-nightlife-advocacy",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-source", "jamie-review-confirmation"],
    publicWording:
      "Publicly invited participation in NYC Artist Coalition dialogue with the new Office of Nightlife and spoke at a coalition town hall about making the Office responsive to small and diverse cultural spaces.",
    shortWording: "Office of Nightlife advocacy and public input",
    detailedPublicWording:
      "In 2017, Jamie publicly invited community participation in coalition dialogue with the new Office of Nightlife and was identified among coalition speakers at an Office-focused town hall. The advocacy and event were collective; his complete production role remains under research.",
    sourceBasis:
      "Greene Hill Food Co-op's member interview, Bedford + Bowery and Village Voice reporting, NPR context, and coalition public records.",
    whyItMatters:
      "Makes Jamie's documented public role visible without converting participation into sole production or policy causality.",
    guardrail:
      "Claim Jamie's public invitation and speaking participation directly; keep overall production, coalition influence, and policy outcomes collective.",
    doNotSay: [
      "Jamie alone created the Office of Nightlife",
      "NYC Artist Coalition authored the Office legislation",
      "The town hall caused the Office to be enacted",
      "Every coalition recommendation was adopted"
    ],
    protectedBoundaries: [
      "Private production records",
      "Private coalition strategy",
      "Unapproved collaborator attribution",
      "Private correspondence"
    ],
    surfaces: ["case-study"],
    relatedProjects: ["nyc-artist-coalition", "save-nyc-spaces"],
    relatedCapabilities: ["public-programming", "coalition-operations", "stakeholder-engagement"],
    structuredClaimIds: ["CLM-NYCA-OFFICE-NIGHTLIFE-ADVOCACY"],
    lastReviewed: "2026-07-13"
  },
  {
    id: "talks-not-raids-transparency-to-phaseout",
    status: "pending",
    supportLevel: "moderate",
    evidenceClass: ["public-source", "jamie-review-confirmation"],
    publicWording:
      "Talks Not Raids advocated for MARCH transparency before later reporting requirements and the city's 2023 phaseout; Jamie's specific role remains under research.",
    shortWording: "Talks Not Raids and the MARCH reform sequence",
    detailedPublicWording:
      "The public record establishes campaign advocacy, later reporting and notice legislation, and the 2023 phaseout of MARCH; Jamie's role and the causal pathway remain under research.",
    sourceBasis:
      "Talks Not Raids project archive, official Council legislation, the Mayor's Office phaseout announcement, and Jamie's public-safe recollection.",
    whyItMatters:
      "Preserves a potentially important advocacy-to-government-change story while distinguishing chronology from causality.",
    guardrail:
      "Keep internal until Jamie's individual work and the campaign's contribution to each later policy step are independently sourced.",
    doNotSay: [
      "Jamie single-handedly disbanded MARCH",
      "Talks Not Raids alone caused the phaseout",
      "The campaign authored Introduction 1156",
      "MARCH ended immediately when the campaign launched"
    ],
    protectedBoundaries: [
      "Private campaign strategy",
      "Unapproved coalition roles",
      "Private correspondence",
      "Unreviewed enforcement records"
    ],
    surfaces: ["internal-only"],
    relatedProjects: ["talks-not-raids", "nyc-artist-coalition"],
    relatedCapabilities: ["policy-communications", "public-data", "coalition-operations"],
    structuredClaimIds: ["CLM-TALKS-NOT-RAIDS-TRANSPARENCY-TO-PHASEOUT"],
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
      "commercial-vacancy-public-data-pilot",
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
      "project-social-identity-systems",
      "nyc-artist-coalition-public-web-infrastructure",
      "nyc-artist-coalition-civic-systems",
      "nyca-council-member-account-engagement",
      "kc-spaces-fund-digital-infrastructure",
      "kc-town-hall-public-operations-channel",
      "callnyc-civic-data-guidance",
      "wowlist-community-platform",
      "hje-revenue-growth-contribution"
    ]
  }
].map((row) => ({
  ...row,
  proofs: row.proofIds.map(requireReadyOrCarefulProof)
}));
