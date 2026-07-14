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
    id: "callnyc-council-member-amplification",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "At least five sitting NYC Council members publicly amplified CallNYC in 2016.",
    shortWording: "Publicly amplified by at least five sitting NYC Council members",
    detailedPublicWording:
      "Helen Rosenthal directly recommended CallNYC to constituents; Ydanis Rodriguez, Rosie Mendez, and Mathieu Eugene quote-amplified project recognitions; and Peter Koo retweeted a CallNYC recognition.",
    sourceBasis:
      "Public member-account posts, an archived CallNYC post with a resolvable retweet object, and New York City Council stated-meeting minutes confirming 2016 officeholding.",
    whyItMatters:
      "Shows that an independently built civic-data interface reached relevant public officials and earned visible amplification.",
    guardrail:
      "Use at least five as a verified minimum and individual-account amplification, never as an official NYC Council endorsement.",
    doNotSay: [
      "The NYC Council officially endorsed CallNYC",
      "Only five Council members engaged",
      "Every mention, tag, like, or repost was Council-member engagement"
    ],
    protectedBoundaries: [
      "Do not publish private account data or infer engagement beyond the recovered public record"
    ],
    surfaces: ["resume", "technical-operations", "case-study"],
    relatedProjects: ["callnyc"],
    relatedCapabilities: ["public-interest-technology", "stakeholder-adoption", "civic-data"],
    lastReviewed: "2026-07-12"
  },
  {
    id: "callnyc-public-engagement-architecture",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "Built a civic-data engagement layer documented by 71 recognition posts naming 26 Council-member accounts and linking to 61 issue pages across 16 constituent-service categories.",
    shortWording:
      "Built a civic-data engagement layer spanning 61 issue pathways and 26 Council-member accounts",
    detailedPublicWording:
      "CallNYC translated CouncilStat issue categories into a repeatable public-engagement system: 71 recovered recognition posts named 26 sitting Council-member accounts and linked to 61 issue pages across 16 service categories.",
    sourceBasis:
      "A 107-item authenticated public-post ledger, New York City Council stated-meeting minutes confirming 2016 officeholding, and current public dataset metadata distinguishing issues from cases and people.",
    whyItMatters:
      "Shows the operational scale and audience design behind the prototype, not only the existence of a website.",
    guardrail:
      "Treat tags as intended institutional reach, not reciprocal engagement; treat CouncilStat rows as issues, not unique people helped or service outcomes.",
    doNotSay: [
      "Twenty-six Council members engaged with or endorsed CallNYC",
      "CallNYC helped a verified number of unique residents",
      "Seventy-one posts document seventy-one service outcomes",
      "The ledger is a complete platform export",
      "Jamie authored every @CallNYCApp post"
    ],
    protectedBoundaries: [
      "Authentication and session material",
      "Private messages and account analytics",
      "Unrecovered status content",
      "Individual post authorship"
    ],
    surfaces: ["technical-operations", "case-study"],
    relatedProjects: ["callnyc"],
    relatedCapabilities: [
      "public-interest-technology",
      "stakeholder-engagement",
      "information-architecture",
      "source-backed-analysis"
    ],
    lastReviewed: "2026-07-13"
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
      "Designed and maintained a lightweight operating backbone for a multi-organization Commercial Rent Stabilization collaboration.",
    shortWording: "A lightweight operating backbone for multi-organization policy work",
    detailedPublicWording:
      "Jamie turned meetings and source material into running minutes, decision records, action ownership, open questions, source boundaries, and coordinated city/state work that collaborators could use.",
    sourceBasis:
      "Approved resume language and a public-safe archival review of an April 2026 operating plan and April-May running minutes.",
    sourceNote: "Use collective-work language and omit private coalition context.",
    whyItMatters:
      "Shows documentation as operating infrastructure for sensitive, collective civic work.",
    guardrail:
      "Use collective-work language and do not publish raw or private coalition context.",
    doNotSay: [
      "Jamie led the movement",
      "Jamie owned the campaign",
      "Jamie provided official legal analysis",
      "Jamie single-handedly created the policy work",
      "Jamie completed every proposed operating deliverable"
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
    lastReviewed: "2026-07-13"
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
    lastReviewed: "2026-07-07"
  },
  {
    id: "commercial-vacancy-public-data-brief",
    status: "careful",
    supportLevel: "strong",
    evidenceClass: ["public-safe-archive-summary"],
    publicWording:
      "Prepared a public-data brief proposing privacy-preserving, geography-aggregated commercial vacancy, occupancy, and lease-cost indicators alongside New York City's existing storefront data.",
    shortWording:
      "Designed a privacy-preserving commercial vacancy data proposal",
    detailedPublicWording:
      "Jamie translated administrative-data constraints into a practical open-data proposal using RPIE-derived aggregate indicators, coverage and suppression rules, a methods note, and explicit exclusions for raw filings, tenant identities, parcel-level rent rows, and lease documents.",
    sourceBasis:
      "Public-safe review of Jamie's March 2026 authored brief in a project Shared Drive.",
    whyItMatters:
      "Shows public-interest data product framing, privacy-by-design, policy translation, and implementation scoping in one concrete artifact.",
    guardrail:
      "Describe this as Jamie's proposal. Do not imply City endorsement, adoption, implementation, publication, or access to confidential filings.",
    doNotSay: [
      "New York City adopted Jamie's proposal",
      "Jamie published an official City dataset",
      "Jamie had access to confidential RPIE filings",
      "The proposed pilot was implemented"
    ],
    protectedBoundaries: [
      "Underlying Shared Drive URL and access metadata",
      "Raw filings",
      "Tenant identities",
      "Parcel-level rent rows",
      "Lease documents",
      "Unverified maps"
    ],
    surfaces: ["technical-operations", "case-study"],
    relatedProjects: ["fair-rent-nyc", "commercial-vacancy-public-data"],
    relatedCapabilities: ["open-data", "privacy-by-design", "policy-translation", "implementation-scoping"],
    lastReviewed: "2026-07-13"
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
      "Jamie helped give NYC Artist Coalition a public-facing civic systems layer: campaign websites, issue explanations, calls to action, public resources, and support paths for cultural-space advocacy.",
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
      "Approved resume language, contemporaneous reporting, public campaign surfaces, Council hearing and legislative records, and public-safe NYC Artist Coalition project history.",
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
    lastReviewed: "2026-07-12"
  },
  {
    id: "nyc-artist-coalition-cabaret-organizing",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "In 2017, organized fire-code study groups for DIY venues and publicly advocated at City Hall for full repeal of the Cabaret Law as part of NYC Artist Coalition.",
    shortWording:
      "Organized DIY-venue fire-code study groups and supported Cabaret Law repeal advocacy",
    detailedPublicWording:
      "Contemporaneous Gothamist reporting identifies Jamie with NYC Artist Coalition, documents his fire-code study groups for DIY venues, and quotes his City Hall advocacy for full repeal of the Cabaret Law.",
    sourceBasis:
      "Emma Whitford's June 19, 2017 Gothamist reporting and the canonical source relationship in the knowledge bank.",
    whyItMatters:
      "Adds a concrete, externally reported example of Jamie turning safety, regulation, and venue experience into public education and civic advocacy.",
    guardrail:
      "Use this as evidence of Jamie's organizing contribution, not sole causality for the collective repeal outcome.",
    doNotSay: [
      "Jamie alone repealed the Cabaret Law",
      "Jamie authored the repeal legislation",
      "Jamie solely led NYC Artist Coalition"
    ],
    protectedBoundaries: [
      "Private coalition strategy",
      "Unapproved collaborator context",
      "Unverified causal claims about repeal"
    ],
    surfaces: ["technical-operations", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["public-education", "civic-advocacy", "stakeholder-coordination"],
    lastReviewed: "2026-07-12"
  },
  {
    id: "project-social-identity-systems",
    status: "careful",
    supportLevel: "moderate",
    evidenceClass: ["public-source", "jamie-review-confirmation"],
    publicWording:
      "Established public-facing identities for CallNYC, WOW List, NYC Artist Coalition, and KC Town Hall, including shared systems collaborators carried across campaigns, programs, and changing stewardship.",
    shortWording: "Established durable public identities collaborators could carry forward",
    detailedPublicWording:
      "Jamie established the project accounts and shared identity systems; public timelines show durable use across CallNYC, WOW List, KC Town Hall, Let NYC Dance, Talks Not Raids, Save NYC Spaces, and FairRentNYC. A 441-record census of the surviving NYC Artist Coalition Facebook timeline shows the identity functioning across events, public meetings, campaign calls, source routes, and partner voices from 2017 through 2021; the recovered X record spans February 2017 through May 2026.",
    sourceBasis:
      "Jamie's firsthand confirmation; authenticated read-only review of the public @CallNYCApp, @NYCArtC, @wowlist, and @KCTownHall profiles; and a 441-record public-safe census of the surviving NYC Artist Coalition Facebook timeline.",
    whyItMatters:
      "Shows a systems contribution that made public work recognizable, reusable, and maintainable by collaborators beyond one person's posting activity.",
    guardrail:
      "Account establishment is Jamie's contribution; post authorship, campaign authorship, and outcomes remain collective unless separately sourced. Jamie's recollection that he predominantly operated the Facebook Page remains an open research lead because the inspected surfaces did not expose individual publisher attribution.",
    doNotSay: [
      "Jamie authored every project-account post",
      "Jamie solely owned the coalition voice",
      "Jamie published all 441 NYC Artist Coalition Facebook records",
      "Creating an account proves sole credit for campaign outcomes"
    ],
    protectedBoundaries: [
      "Authentication details",
      "Private messages",
      "Account analytics",
      "Post-level authorship without evidence"
    ],
    surfaces: ["technical-operations", "case-study"],
    relatedProjects: ["callnyc", "wowlist", "fair-rent-nyc", "kc-town-hall"],
    relatedCapabilities: ["public-identity-systems", "handoffs", "campaign-infrastructure"],
    lastReviewed: "2026-07-14"
  },
  {
    id: "nyc-artist-coalition-social-engagement",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "Authenticated archival review recovered 24 direct public interactions from at least seven contemporaneous NYC Council-member accounts with @NYCArtC across multiple campaigns.",
    shortWording: "24 interactions from at least seven Council-member accounts",
    detailedPublicWording:
      "The full inbound pass recovered 501 rendered public search records from 178 accounts, including 347 explicit @NYCArtC mentions and 154 separately marked search or thread-context records. The Council-member subset spans Cabaret Law repeal, MARCH transparency, arts-and-culture support, and FairRentNYC; the figures are documented recovery floors, not complete historical censuses.",
    sourceBasis:
      "A 501-record public engagement ledger, seven representative member-account status pages, authenticated public-profile review, and contemporaneous Council context.",
    whyItMatters:
      "Shows that the shared campaign identity reached relevant public officials across distinct policy and cultural-space efforts.",
    guardrail:
      "Describe individual-account interaction as a recovered minimum, never as official Council endorsement, policy causality, or proof of Jamie's post authorship.",
    doNotSay: [
      "Only seven Council members engaged",
      "The NYC Council endorsed NYC Artist Coalition",
      "Social engagement caused policy outcomes",
      "Jamie authored every @NYCArtC post"
    ],
    protectedBoundaries: [
      "Authentication details",
      "Private analytics",
      "Private messages",
      "Unrecoverable team-post authorship"
    ],
    surfaces: ["technical-operations", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: ["public-engagement", "stakeholder-adoption", "campaign-infrastructure"],
    lastReviewed: "2026-07-14"
  },
  {
    id: "nyc-artist-coalition-participation-system",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["public-source", "jamie-review-confirmation"],
    publicWording:
      "Helped establish and produce NYC Artist Coalition's recurring participation system: public event pages, meetings rotated among cultural spaces, practical safety and advocacy sessions, and pathways from artist concerns to hearings and campaign action.",
    shortWording: "Built a recurring participation system from cultural-space meetings to public action",
    detailedPublicWording:
      "A 34-slot Facebook event census accounts for 33 recovered event records and one unresolved slot. Twelve recurring-meeting records span ten named physical venues and two virtual meetings; the wider record includes public hearings, safety training, legal and architectural Q&A, venue-support actions, panels, rallies, and relief coordination.",
    sourceBasis:
      "Jamie's firsthand role account, a twice-traversed authenticated event census, ten selected public event pages, independent Village Voice reporting on the Market Hotel town hall, and Gothamist reporting on Jamie's coalition and fire-safety work.",
    whyItMatters:
      "Shows how Jamie turns listening, practical support, public identity, and institutional pathways into repeatable participation infrastructure.",
    guardrail:
      "Use helped establish and produce, preserve collective credit, and keep Facebook responses distinct from physical attendance. The current interface is not an official Meta export and one of 34 control slots remains unresolved.",
    doNotSay: [
      "Jamie alone organized every NYC Artist Coalition event",
      "Jamie authored every event page",
      "Every meeting happened monthly or at a different venue",
      "Facebook responses equal attendance or unique people reached",
      "The event system alone caused legislation or agency change",
      "All 34 event records were recovered"
    ],
    protectedBoundaries: [
      "Guest and attendee identities",
      "Invite and friend context",
      "Comments and participant profiles",
      "Meeting-access paths and credentials",
      "Private account administration and analytics"
    ],
    surfaces: ["technical-operations", "case-study"],
    relatedProjects: ["fair-rent-nyc"],
    relatedCapabilities: [
      "participation-infrastructure",
      "event-systems",
      "public-engagement",
      "civic-implementation",
      "stakeholder-translation"
    ],
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
      "WOWList supported 1,800+ users, 16,000+ posts/events, followable keyword communities, natural-language event entry, weekly digest emails, embeddable calendars, and low-cost deployment for local calendar organizers. Public Facebook records show the distributed model in use through member-led calendars in nine cities, a 41-event Los Angeles contribution, and later Phoenix organizer continuity.",
    sourceBasis:
      "Approved resume language, verified public-safe archive counts, a 2017 Greene Hill Food Co-op interview, a 2015 Music Hackathon post identifying Jamie as a co-organizer and describing WOW List as an event-sharing service, selected public Facebook records, and a protected Page-management aggregate identifying Jamie as publisher on 51 matching records with six unresolved.",
    guardrail:
      "Use approximate adoption language, describe city activity as member-led calendars rather than official chapters, preserve Richard's shared-project credit, and keep Facebook publisher attribution distinct from sole drafting, source authorship, product ownership, or management of every social channel.",
    doNotSay: [
      "Official chapters in 35 cities",
      "Full ownership of all organizer adoption",
      "Current active platform unless confirmed",
      "Jamie published all 57 surviving Facebook records",
      "Jamie authored every quoted or reshared word",
      "Jamie managed every WOW List social channel"
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
    id: "wowlist-public-support-surface",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["public-source"],
    publicWording:
      "The public account Jamie established became a direct support surface: its six surviving replies explained feed scope, profile navigation, multi-list event submission, local-calendar onboarding, and project lineage.",
    shortWording: "Turned a shared project identity into a direct public support surface",
    detailedPublicWording:
      "A full-population review recovered all 38 items in the current @wowlist profile control. All six account replies functioned as product support, onboarding, or local-calendar identity guidance, while account establishment and individual post authorship remain separately bounded.",
    sourceBasis:
      "Six public @wowlist replies, a 38-record authenticated public-profile ledger, and Jamie's separately held account-establishment confirmation.",
    whyItMatters:
      "Shows product operations in use: public identity, information architecture, onboarding, event submission, and community handoff worked together as one service surface.",
    guardrail:
      "Credit Jamie with establishing the account and co-building the product; do not assign individual post authorship, adoption, or impact from the social corpus.",
    doNotSay: [
      "Jamie personally wrote all six replies",
      "X was WOWList's only support channel",
      "The current 38-post population is a complete platform export",
      "The social record proves adoption scale or impact"
    ],
    protectedBoundaries: [
      "Authentication details",
      "Private messages",
      "Account analytics",
      "Unrecoverable individual post authorship"
    ],
    surfaces: ["technical-operations", "case-study"],
    relatedProjects: ["wowlist"],
    relatedCapabilities: ["product-support", "onboarding", "public-identity-systems", "event-workflows"],
    lastReviewed: "2026-07-14"
  },
  {
    id: "sunday-dinner-196-participation-infrastructure",
    status: "careful",
    supportLevel: "careful",
    evidenceClass: [
      "approved-resume",
      "public-source",
      "public-safe-archive-summary",
      "jamie-review-confirmation"
    ],
    publicWording:
      "Created repeatable hosting, onboarding, facilitation, documentation, and continuity systems across 300+ gatherings and 20+ resident artists.",
    shortWording: "300+ gatherings and 20+ resident artists supported",
    detailedPublicWording:
      "Jamie made recurring cultural work easier to continue through practical invitation, hosting, proposal review, resident onboarding, space configuration, facilitation, documentation, and follow-through systems.",
    sourceBasis:
      "Approved resume language and protected aggregate project records support the scale claim; a 2017 Greene Hill Food Co-op interview documents weekly Sunday dinners open to the community; public Facebook event pages document the hundredth dinner, a rotating eight-week New York City format, and a civic sign-making potluck; and a protected 2023 acceptance record confirms Jamie's proposal-review and onboarding workflow for one residency.",
    guardrail:
      "Keep the page summary-only and avoid turning community trust work into spectacle.",
    doNotSay: [
      "Institutional ownership of participants' work",
      "Comprehensive public archive",
      "Attendance database",
      "One onboarding record independently verifies the 20-plus resident aggregate"
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
    lastReviewed: "2026-07-13"
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
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["approved-resume", "public-source", "public-safe-archive-summary"],
    publicWording:
      "Presented KC Town Hall's adaptive-reuse proposal in Kansas City's public process; after the CCED board's unanimous recommendation, the Council allocated $490,539 and authorized funding-agreement negotiations.",
    shortWording: "Presented the $490,539 Council-allocated KC Town Hall proposal",
    detailedPublicWording:
      "Jamie helped shape planning, public-benefit documentation, stakeholder context, and municipal-review support for an adaptive-reuse effort. Official records identify him as presenter, record the board's unanimous recommendation, and show that the Council allocated $490,539 on September 26, 2019, and authorized funding-agreement negotiations.",
    sourceBasis:
      "Approved resume language, City of Kansas City Central City Economic Development Sales Tax Board minutes, Committee Substitute for Ordinance No. 190642, Second Committee Substitute for Resolution No. 190649, and public-safe project context.",
    guardrail:
      "Council allocation and negotiation authority do not establish an executed agreement, receipt or disbursement of funds, later implementation, project completion, or Jamie's sole causality for the Council vote. Jamie's project involvement is historical; a later stewardship transition remains firsthand research context rather than part of this source-backed claim.",
    doNotSay: [
      "KC Town Hall received or was disbursed $490,539",
      "The funding agreement was executed",
      "Jamie caused the Council vote",
      "Current property status",
      "Private financial details",
      "Project completion or official municipal endorsement beyond the public record"
    ],
    protectedBoundaries: [
      "Private financial details",
      "Legal details",
      "Property details",
      "Banking details",
      "Stakeholder details"
    ],
    surfaces: ["technical-operations", "work-card", "case-study"],
    relatedProjects: ["kc-town-hall"],
    relatedCapabilities: ["project-planning", "public-benefit-documentation", "stakeholder-context"],
    lastReviewed: "2026-07-13"
  },
  {
    id: "kc-town-hall-public-identity-infrastructure",
    status: "ready",
    supportLevel: "strong",
    evidenceClass: ["jamie-review-confirmation", "public-source"],
    publicWording:
      "Established KC Town Hall's public-facing identity and participation surface; collaborators carried it forward across resident input, neighborhood operations, civic information, and public exchange.",
    shortWording: "Established a durable public identity and participation system",
    detailedPublicWording:
      "Jamie established KC Town Hall's public-facing identity and participation surface. The surviving shared-account record shows that system carrying resident-input, restoration, neighborhood-operations, public-service, and civic-exchange records from 2018 through 2022.",
    sourceBasis:
      "Jamie's firsthand account-establishment confirmation, the public July 2018 launch post, and a July 2026 authenticated full-population audit of the surviving @KCTownHall profile.",
    guardrail:
      "Credit Jamie with establishing the identity system. Do not assign him every shared-account post or later program operation; project stewardship continued after his historical involvement ended. The audit dispositions 181 recovered items and two explicit unresolved profile-count slots and is not a platform export.",
    doNotSay: [
      "Jamie authored every @KCTownHall post",
      "Jamie operated every later KC Town Hall program",
      "All 183 profile-count slots were recovered at item level",
      "Social interaction proves endorsement, funding support, audience scale, or impact"
    ],
    protectedBoundaries: [
      "Authentication and session material",
      "Private messages and account analytics",
      "Personal transition circumstances",
      "Unapproved receiving-organization identity"
    ],
    surfaces: ["technical-operations", "work-card", "case-study"],
    relatedProjects: ["kc-town-hall"],
    relatedCapabilities: [
      "public-facing-web-systems",
      "participation-infrastructure",
      "stakeholder-context",
      "technical-operations"
    ],
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
  "callnyc-council-member-amplification",
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
      "wowlist-community-platform",
      "wowlist-public-support-surface"
    ]
  },
  {
    capability: "Risk surfacing and decision clarity",
    toward: "Making open questions, public/private boundaries, and stakeholder next steps visible.",
    proofIds: [
      "fair-rent-campaign-memory",
      "fair-rent-source-map",
      "commercial-vacancy-public-data-brief",
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
      "nyc-artist-coalition-cabaret-organizing",
      "project-social-identity-systems",
      "nyc-artist-coalition-social-engagement",
      "kc-spaces-fund-digital-infrastructure",
      "callnyc-civic-data-guidance",
      "callnyc-council-member-amplification",
      "callnyc-public-engagement-architecture",
      "wowlist-community-platform",
      "kc-town-hall-public-identity-infrastructure",
      "hje-revenue-growth-contribution"
    ]
  }
].map((row) => ({
  ...row,
  proofs: row.proofIds.map(requireReadyOrCarefulProof)
}));
