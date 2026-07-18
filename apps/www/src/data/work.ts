import { z } from "zod";
import { getClaimProjection } from "@/data/knowledge-bank";
import type { WorkMeta } from "@/types/work";

const visibilitySchema = z.enum([
  "public",
  "public-safe",
  "redacted",
  "summary-only",
  "private"
]);

const workStatusSchema = z.enum([
  "Full case study",
  "Short proof page",
  "Lab / research",
  "Archived prototype",
  "Public-safe summary only",
  "Draft"
]);

const artifactTypeSchema = z.enum([
  "website",
  "workflow",
  "source map",
  "decision record",
  "public handout",
  "meeting memory",
  "guide",
  "prototype",
  "photo sequence",
  "diagram",
  "download",
  "analytics summary",
  "public-safe screenshot",
  "template",
  "script",
  "map",
  "press"
]);

const workMetaSchema = z.object({
  title: z.string(),
  slug: z.string(),
  series: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  role: z.string(),
  years: z.string(),
  status: workStatusSchema,
  featured: z.boolean(),
  priority: z.number(),
  visibility: visibilitySchema,
  proofBankIds: z.array(z.string()),
  authoredRoleProofIds: z.array(z.string()).default([]),
  whatWasUnclear: z.string(),
  whatBecameUsable: z.string(),
  artifactTypes: z.array(artifactTypeSchema),
  artifacts: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      type: artifactTypeSchema
    })
  ),
  tags: z.array(z.string()),
  capabilities: z.array(z.string()),
  links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
  careNote: z.string().optional(),
  sourceLayer: z.string().optional(),
  credits: z.array(z.string()).optional(),
  publicSafety: z.object({ note: z.string() }).optional(),
  currentStatus: z.string(),
  group: z.enum([
    "Operating systems for teams",
    "Civic and public-facing systems",
    "Community and cultural infrastructure",
    "Source-backed memory / AI lab",
    "Archived prototypes and older platforms"
  ]),
  roleFit: z.string(),
  evidence: z.array(z.string()),
  knownOpenProtected: z.object({
    known: z.string(),
    open: z.string(),
    protected: z.string()
  })
});

const workItemsInput = [
  {
    title: "Harry J. Epstein Company",
    slug: "harry-j-epstein",
    series: "Operating Structure",
    subtitle: "E-commerce and operations modernization",
    summary:
      "Helped an 80+ year-old legacy industrial business adapt to e-commerce through web, analytics, marketing, content, and operational workflow improvements.",
    role: "Technical Project Manager & Web Systems Lead",
    years: "2012-Present",
    status: "Full case study",
    featured: true,
    priority: 1,
    visibility: "public-safe",
    proofBankIds: [
      "hje-modernization-stewardship",
      "hje-revenue-growth-contribution"
    ],
    whatWasUnclear:
      "A legacy business had public voice, customer trust, inventory knowledge, and operating habits that did not automatically translate into modern e-commerce workflows.",
    whatBecameUsable:
      "Improved web, e-commerce, analytics, marketing, content, and operational systems that supported online growth while preserving the company's distinctive institutional voice.",
    artifactTypes: ["website", "workflow", "analytics summary", "public-safe screenshot"],
    artifacts: [
      {
        title: "E-commerce workflow map",
        description:
          "Representative flow for translating inventory knowledge, customer language, and order handling into a maintainable online workflow.",
        type: "workflow"
      },
      {
        title: "Public-safe analytics summary",
        description:
          "Impact framed as a contribution to online growth without exposing private dashboards or internal revenue detail.",
        type: "analytics summary"
      },
      {
        title: "Content and voice system",
        description:
          "Reusable patterns for preserving the company's distinctive public voice across product, marketing, and support surfaces.",
        type: "template"
      }
    ],
    tags: [
      "Technical Operations",
      "Product Operations",
      "Implementation",
      "Documentation",
      "Small Business",
      "Public-Facing Tools"
    ],
    capabilities: [
      "Requirements",
      "Workflow Mapping",
      "Handoffs",
      "Analytics",
      "Public-Facing Web Systems"
    ],
    links: [{ label: "Website", url: "https://www.harryepstein.com/" }],
    careNote:
      "No private analytics dashboards, revenue details, passwords, customer data, vendor information, or internal operational materials are published.",
    sourceLayer:
      "Public website, public-safe summary, approved screenshots pending, resume-backed impact claims, and private materials intentionally omitted.",
    credits: ["Jamie Burkart", "Harry J. Epstein Company team"],
    publicSafety: {
      note: "Use only public-safe claims and approved screenshots. Treat metrics as contribution language unless Jamie approves more precise wording."
    },
    currentStatus: "Public-safe full case study. Screenshot approvals pending.",
    group: "Operating systems for teams",
    roleFit:
      "Technical operations, product operations, implementation, business analysis, documentation, and small-business web systems.",
    evidence: [
      "Web, e-commerce, marketing, content, and analytics systems",
      "Operations workflow improvements and long-term systems stewardship",
      "Contributed to 2x revenue growth",
      "Stakeholder translation across technical and nontechnical contexts"
    ],
    knownOpenProtected: {
      known:
        "Jamie contributed long-term web, e-commerce, analytics, marketing, content, and operations improvements for an 80+ year-old legacy business.",
      open:
        "Specific screenshots, internal workflow diagrams, and detailed revenue breakdowns need Jamie approval before launch.",
      protected:
        "Private dashboards, credentials, customer data, internal revenue detail, vendor terms, and sensitive operating practices stay offline."
    }
  },
  {
    title: "NYC Artist Coalition / FairRentNYC",
    slug: "fair-rent-nyc",
    series: "Civic Systems",
    subtitle: "Cultural-space advocacy, coalition memory, and Commercial Rent Stabilization",
    summary:
      "Jamie describes his role as a NYC Artist Coalition co-founder who built campaign websites and a shared publishing system that collaborators used to explain issues, share resources, and organize participation. Surviving public sources corroborate the infrastructure and specific actions, while the full responsibility map remains under research and campaign decisions and outcomes remain collective.",
    role: "Civic Systems, Coalition Operations & Policy Communications",
    years: "2017-Present",
    status: "Full case study",
    featured: true,
    priority: 2,
    visibility: "public-safe",
    proofBankIds: [
      "fair-rent-campaign-memory",
      "fair-rent-operating-layer-design",
      "fair-rent-source-map",
      "project-social-identity-systems",
      "nyc-artist-coalition-public-web-infrastructure",
      "nyca-council-member-account-engagement",
      "nyca-campaign-press-architecture",
      "nyc-artist-coalition-civic-systems",
      "nyca-participation-system",
      "nyca-cabaret-law-direct-organizing",
      "nyca-office-nightlife-advocacy",
      "nyca-commercial-rent-testimony-2018",
      "commercial-vacancy-public-data-pilot"
    ],
    authoredRoleProofIds: [
      "project-social-identity-systems",
      "nyc-artist-coalition-public-web-infrastructure",
      "nyca-council-member-account-engagement",
      "nyca-campaign-press-architecture",
      "nyca-participation-system"
    ],
    whatWasUnclear:
      "The work involved many stakeholders, public/private source materials, legal and policy questions, city/state strategy lanes, shifting meetings, and sensitive coalition context that could easily become fragmented or overexposed.",
    whatBecameUsable: getClaimProjection(
      "CLM-CRS-SHARED-OPERATING-LAYER-2026",
      "work-card",
      "/work"
    ).text,
    artifactTypes: ["website", "source map", "meeting memory", "decision record", "public handout"],
    artifacts: [
      {
        title: "Campaign-memory spine",
        description:
          "A shared documentation structure for meetings, next steps, decision context, and public-safe continuity.",
        type: "meeting memory"
      },
      {
        title: "Coalition operating design",
        description:
          "A bounded design for intake, recurring coordination, reusable messages, consent-aware story handling, implementation planning, and durable shared memory.",
        type: "decision record"
      },
      {
        title: "Source map and policy question log",
        description:
          "A structured way to separate public sources, private notes, open legal and policy questions, and materials that require collaborator review.",
        type: "source map"
      },
      {
        title: "Campaign websites and shared identity",
        description:
          "Public-safe campaign websites connected to a durable @NYCArtC publishing identity, with shared authorship kept explicit.",
        type: "website"
      },
      {
        title: "Recurring participation system",
        description:
          "Public event pages, cultural-space meetings, practical safety and advocacy sessions, and paths from artist concerns to hearings and campaign action.",
        type: "meeting memory"
      },
      {
        title: "Campaign press corpus",
        description:
          "A governed index of 46 campaign-to-article placements representing 45 distinct articles across four live and archived campaign surfaces.",
        type: "source map"
      }
    ],
    tags: [
      "Civic Technology",
      "Knowledge Systems",
      "Documentation",
      "Product Operations",
      "Source-Backed Memory",
      "Public-Facing Tools"
    ],
    capabilities: [
      "Meeting Synthesis",
      "Source Mapping",
      "Action Tracking",
      "Campaign Websites",
      "Stakeholder Convening",
      "Participation Systems",
      "Public Guidance",
      "Decision Records"
    ],
    links: [
      { label: "NYC Artist Coalition", url: "https://nycartc.com/" },
      { label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" },
      { label: "Talks Not Raids", url: "https://talksnotraids.com/" },
      { label: "Let NYC Dance", url: "https://letnycdance.nycartc.com/" },
      { label: "Save NYC Spaces", url: "https://savenycspaces.nycartc.com/" },
      { label: "2018 Council testimony", url: "https://legistar.council.nyc.gov/View.ashx?GUID=3BAD981A-69D8-4D99-A882-52442F36F5A2&ID=6792384&M=F" }
    ],
    careNote:
      "Public-safe summary of collective civic and coalition work. This page does not publish private notes, legal-review materials, stakeholder lists, raw strategy documents, or unapproved internal materials.",
    sourceLayer:
      "Public sources, four live and archived campaign press surfaces, 45 distinct article records, an authenticated public-account and Council-member engagement review, selected protected Shared Drive records with Jamie-attributed revision history, public campaign materials where approved, meeting memory summaries, private/redacted coalition context, and collaborator review still required for named materials.",
    credits: ["Jamie Burkart", "NYC Artist Coalition collaborators", "Commercial Rent Stabilization advocates"],
    publicSafety: {
      note: "Collective-work language is required: contributed to, helped structure, stewarded, supported, and translated."
    },
    currentStatus: "Active public-safe summary. Collaborator and material approvals pending.",
    group: "Civic and public-facing systems",
    roleFit:
      "Civic delivery, coalition operations, product operations, documentation architecture, source-backed memory, public guidance, policy communications, and implementation support.",
    evidence: [
      "Jamie's approved first-person account of a NYC Artist Coalition co-founder role",
      "Civic systems, coalition operations, and policy-communications infrastructure",
      "Campaign materials around Cabaret Law repeal, Office of Nightlife creation, nightlife enforcement reporting, Commercial Rent Stabilization, and storefront stability",
      "30+ pages of shared campaign-memory infrastructure",
      "Designed and began building a shared operating layer for current collaboration",
      "Running minutes, decision records, action trackers, and source maps",
      "Protected 2017-2019 records for member onboarding, Let NYC Dance deployment, public-meeting production, and machine-readable policy implementation",
      "Public campaign websites for NYC Artist Coalition advocacy",
      "Shared @NYCArtC identity connected across five coalition and campaign surfaces",
      "20 recovered in-term X posts returned from seven then-sitting Council-member accounts",
      "46 press placements representing 45 distinct articles across four campaign sites",
      "Documented public organizing and testimony for Cabaret Law repeal",
      "Documented speaking participation in Office of Nightlife town halls",
      "2018 City Council testimony connecting commercial affordability to cultural-space safety",
      "Legal/policy questions organized for collaborators",
      "Public-data framing and stakeholder next steps",
      "2026 privacy-preserving commercial vacancy and lease-cost indicator pilot brief"
    ],
    knownOpenProtected: {
      known:
        "Jamie describes his role as a NYC Artist Coalition co-founder, public campaign-website builder, and creator of shared publishing infrastructure. Surviving sites corroborate the public web system, while the complete founding and responsibility map remains under research. A bounded authenticated review recovered 20 in-term X posts returned from accounts of seven then-sitting Council members; authorship remains at account level and is not formal endorsement. Protected Shared Drive records with Jamie-attributed revision history document operating infrastructure from member onboarding and Let NYC Dance deployment through public-meeting production and machine-readable policy implementation. Current protected records also support his bounded design and initial build of shared Commercial Rent Stabilization coordination tools and a 2026 commercial-vacancy open-data pilot brief; they do not establish adoption or completion. Public records separately document his organizing, speaking, and testimony across Cabaret Law repeal, Office of Nightlife dialogue, and commercial-rent advocacy.",
      open:
        "Which specific public artifacts, collaborators, meeting materials, and screenshots may be named or shown requires approval.",
      protected:
        "Private coalition notes, legal-review materials, stakeholder lists, raw strategy context, private emails, and unapproved quotes are omitted."
    }
  },
  {
    title: "CallNYC.org",
    slug: "callnyc",
    series: "Civic Prototype",
    subtitle: "Civic data to resident-facing guidance",
    summary: getClaimProjection(
      "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
      "work-card",
      "/work"
    ).text,
    role: "Civic-Tech Builder & Product Translator",
    years: "2016 - archived",
    status: "Full case study",
    featured: true,
    priority: 3,
    visibility: "public-safe",
    proofBankIds: [
      "callnyc-civic-data-guidance",
      "callnyc-council-member-engagement"
    ],
    whatWasUnclear:
      "Constituent-services data existed, but residents needed a clearer public-facing pathway from issue to relevant civic office or next step.",
    whatBecameUsable:
      "An archived civic-tech prototype that organized open data into issue pathways, district context, and resident-facing guidance.",
    artifactTypes: ["prototype", "guide", "map", "press"],
    artifacts: [
      {
        title: "Issue pathway prototype",
        description:
          "Public-facing page patterns that moved from constituent issue to relevant office, district context, and possible next step.",
        type: "prototype"
      },
      {
        title: "Open-data translation layer",
        description:
          "An independent interpretation layer built from CouncilStat constituent-services records.",
        type: "map"
      },
      {
        title: "Archived press note",
        description:
          "Politico New York covered CallNYC in 2016 as a public way to explore City Council constituent-services data.",
        type: "press"
      }
    ],
    tags: [
      "Civic Technology",
      "Open Data",
      "Web Systems",
      "Implementation",
      "Public-Facing Tools"
    ],
    capabilities: [
      "Open Data Translation",
      "Resident Guidance",
      "Prototype Delivery",
      "Information Architecture",
      "Public Interfaces"
    ],
    links: [
      {
        label: "Politico New York archived PDF",
        url: "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf"
      },
      { label: "GitHub repository", url: "https://github.com/openhouse/CallNYC" }
    ],
    careNote:
      "Archived civic-data prototype. Not an official or current City Council service, legal service, emergency service, or comprehensive civic guidance source.",
    sourceLayer:
      "CouncilStat / constituent-services open data, archived project context, verified Politico New York coverage, public GitHub repository, and public-safe screenshots pending.",
    credits: ["Jamie Burkart", "Civic-data collaborators"],
    publicSafety: {
      note: "This page must make the archived and unofficial status visible wherever the project is summarized."
    },
    currentStatus: "Archived prototype. Public-safe screenshots pending.",
    group: "Civic and public-facing systems",
    roleFit:
      "Civic technology, product translation, open-data workflows, resident guidance, and public-facing web systems.",
    evidence: [
      "Independent follow-on to the New York City Council's first CouncilStat hackathon",
      "Translated CouncilStat / constituent-services open data",
      "Organized public issue pages and resident-facing guidance",
      "Covered by Politico New York in 2016"
    ],
    knownOpenProtected: {
      known:
        "CallNYC independently translated CouncilStat constituent-services records into issue pathways and resident-facing guidance as an archived prototype with 2016 Politico New York coverage.",
      open:
        "Public-safe screenshots and additional archive links need Jamie approval before publication.",
      protected:
        "No current-service claims, official city affiliation claims, private user data, or unverified guidance are published."
      }
  },
  {
    title: "WOWList.org",
    slug: "wowlist",
    series: "Community Platform",
    subtitle: "Followable keyword communities for arts and music organizers",
    summary:
      "Co-built a Django / PostgreSQL / PostGIS and Ember community-calendar platform organized around followable keyword communities, adopted by DIY arts and music organizers across roughly 35 city ecosystems.",
    role: "Co-builder & Product Operator",
    years: "2010s",
    status: "Short proof page",
    featured: true,
    priority: 4,
    visibility: "public-safe",
    proofBankIds: ["wowlist-community-platform"],
    whatWasUnclear:
      "DIY organizers needed lightweight ways to distribute events and maintain community visibility across scenes without relying on one centralized editorial calendar.",
    whatBecameUsable:
      "A followable keyword-community platform with event distribution workflows and organizer-facing publishing patterns.",
    artifactTypes: ["website", "workflow", "prototype"],
    artifacts: [
      {
        title: "Keyword-community model",
        description:
          "A lightweight distribution pattern for followable arts, music, and local-interest communities.",
        type: "diagram"
      }
    ],
    tags: ["Community Systems", "Web Systems", "Product Operations", "Public-Facing Tools"],
    capabilities: [
      "Django",
      "PostgreSQL / PostGIS",
      "Ember.js",
      "Community Platform Design",
      "Event Workflows"
    ],
    careNote:
      "Historical proof page. Claims should avoid overreading adoption beyond public-safe estimates.",
    sourceLayer:
      "Public-safe summary, historical project context, and screenshots pending Jamie approval.",
    credits: ["Jamie Burkart", "WOWList collaborators"],
    currentStatus: "Historical short proof page.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community systems, product operations, public-facing platforms, and event distribution workflows.",
    evidence: [
      "Django / PostgreSQL / PostGIS and Ember platform",
      "Followable keyword communities",
      "Organizer-facing distribution workflows",
      "Public-safe aggregate records support 1,800+ users and 16,000+ posts/events",
      "Roughly 35 city ecosystems reached"
    ],
    knownOpenProtected: {
      known:
        "WOWList was a co-built community-calendar platform organized around followable keyword communities.",
      open:
        "Screenshots, archive links, and precise adoption wording need approval.",
      protected:
        "Private user data, organizer contact lists, and unapproved community records are not published."
    }
  },
  {
    title: "196 Artists Residency / Sunday Dinner",
    slug: "196-sunday-dinner",
    series: "Participation Infrastructure",
    subtitle: "Hosting, onboarding, facilitation, and continuity systems",
    summary:
      "Created repeatable hosting, onboarding, facilitation, documentation, and continuity systems across 300+ gatherings and 20+ resident artists.",
    role: "Host, Organizer & Systems Steward",
    years: "2010s",
    status: "Short proof page",
    featured: true,
    priority: 5,
    visibility: "summary-only",
    proofBankIds: [
      "sunday-dinner-196-participation-infrastructure",
      "196-residency-acceptance-workflow"
    ],
    whatWasUnclear:
      "A recurring cultural space needed trust-building routines, invitations, hospitality, artist support, and continuity without turning private community records into public spectacle.",
    whatBecameUsable:
      "Repeatable participation infrastructure for gatherings, resident artists, onboarding, facilitation, and handoffs. One documented 2023 residency workflow adds proposal review, pre-arrival planning, space configuration, and independent access as a specific example, not a universal process.",
    artifactTypes: ["photo sequence", "workflow", "template"],
    artifacts: [
      {
        title: "Gathering rhythm",
        description:
          "A representative structure for welcoming, hosting, documenting, and continuing recurring cultural work.",
        type: "workflow"
      },
      {
        title: "Residency acceptance and access workflow",
        description:
          "A documented 2023 workflow for proposal review, pre-arrival coordination, space configuration, and 24-hour self-service access for an artist and collaborator.",
        type: "template"
      }
    ],
    tags: ["Community Systems", "Documentation", "Implementation", "Knowledge Systems"],
    capabilities: ["Onboarding", "Facilitation", "Hospitality Systems", "Artist Support"],
    links: [
      { label: "2017 Greene Hill profile", url: "https://www.greenehillfood.coop/master-blog/2017/12/september-2017-newsletter" }
    ],
    careNote:
      "Summary-only page. Raw guest data, attendance records, private community records, and unapproved photos stay offline.",
    sourceLayer:
      "Greene Hill Food Co-op's 2017 member profile, public-safe aggregate history, and a protected 2023 residency acceptance and access workflow; participant identity and private records remain omitted.",
    credits: ["Jamie Burkart", "196 / Sunday Dinner community"],
    currentStatus: "Public-safe summary only.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community operations, onboarding, facilitation, documentation, trust-building systems, and continuity planning.",
    evidence: [
      "300+ hosted gatherings",
      "20+ resident artists supported",
      "Weekly community-open Sunday dinners documented in a 2017 co-op profile",
      "One documented residency workflow for proposal review, pre-arrival planning, space configuration, and independent 24-hour access",
      "Recurring operations and continuity structures"
    ],
    knownOpenProtected: {
      known:
        "Jamie created and sustained participation infrastructure across recurring gatherings and artist-residency contexts. A 2017 Greene Hill Food Co-op profile independently documents weekly Sunday dinners open to the community, co-hosted with Julia Fredenberg. A protected 2023 acceptance record signed by Jamie separately documents one residency workflow for proposal review, pre-arrival planning, space configuration, and independent 24-hour access.",
      open:
        "Named participants, photos, and artifacts require consent and approval.",
      protected:
        "Raw guest data, private records, attendance lists, addresses, and unapproved images are omitted."
    }
  },
  {
    title: "KC Town Hall LLC",
    slug: "kc-town-hall",
    series: "Built Environment",
    subtitle: "Adaptive reuse planning and public-benefit documentation",
    summary:
      "Jamie describes presenting a mixed-use adaptive-reuse proposal that earned a unanimous $490,539 CCED Board recommendation and subsequent City Council appropriation. Jamie reports that after years of public review, he transitioned stewardship to a mission-aligned organization; City records later closed the unused award as withdrawn.",
    role: "Project Planning & Documentation Support",
    years: "2019-2024",
    status: "Short proof page",
    featured: false,
    priority: 6,
    visibility: "public-safe",
    proofBankIds: [
      "kc-town-hall-public-benefit-documentation",
      "project-social-identity-systems",
      "kc-town-hall-public-operations-channel"
    ],
    authoredRoleProofIds: [
      "kc-town-hall-public-benefit-documentation",
      "kc-town-hall-public-operations-channel"
    ],
    whatWasUnclear:
      "A long-vacant historic building involved public benefit, preservation, funding, stakeholder, and redevelopment questions that needed durable documentation.",
    whatBecameUsable:
      "Planning materials, public-benefit documentation, stakeholder context, and municipal-review support for an adaptive reuse effort.",
    artifactTypes: ["guide", "source map", "template"],
    artifacts: [
      {
        title: "Public-benefit documentation set",
        description:
          "Representative materials for describing intended public value, funding context, and stakeholder needs.",
        type: "guide"
      },
      {
        title: "Resident-facing operations channel",
        description:
          "A public project identity that later carried neighborhood information and recurring #TiredOfTires pickup communication.",
        type: "guide"
      }
    ],
    tags: ["Implementation", "Documentation", "Knowledge Systems", "Public-Facing Tools"],
    capabilities: ["Stakeholder Documentation", "Funding Support", "Historic Preservation Context"],
    links: [
      { label: "2019 CCED Board meeting packet", url: "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000" },
      { label: "Council Resolution 190649", url: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=44A50FFC-321A-41C7-9A86-6ADD9083B156&ID=5515936&Options=&Search=" },
      { label: "Council Ordinance 190642", url: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=B387009F-F7F7-454D-950A-E44588056314&ID=5515929&Options=&Search=" },
      { label: "2021 Kansas City Star reporting", url: "https://www.kansascity.com/news/politics-government/article256377677.html" },
      { label: "2024 withdrawal record", url: "https://clerk.kcmo.gov/LegislationDetail.aspx?GUID=E3F31A7F-65F8-464E-ABD4-197DEB6D80C8&ID=6586846&Options=&Search=" }
    ],
    careNote:
      "Public-safe short proof page. Private financial, legal, property, and stakeholder details are omitted.",
    sourceLayer:
      "Kansas City CCED Board meeting records, City Council Resolution 190649, Ordinances 190642 and 240317, independent 2021 reporting, Jamie's public-safe first-person correction, the public @KCTownHall profile, and a bounded authenticated timeline review.",
    credits: ["Jamie Burkart", "KC Town Hall LLC collaborators"],
    currentStatus: "Jamie reports that he transitioned stewardship to a mission-aligned organization; City records later closed the original unused CCED award as withdrawn and reappropriated it in 2024.",
    group: "Operating systems for teams",
    roleFit:
      "Long-horizon project management, public-benefit documentation, stakeholder coordination, and implementation support.",
    evidence: [
      "Redevelopment planning",
      "Public-benefit documentation",
      "Historic preservation context",
      "Unanimous $490,539 CCED Board recommendation and subsequent City Council appropriation",
      "Years-long City-contract process documented by independent reporting",
      "Reported stewardship transition separated from the City's later withdrawal record",
      "Public account established as part of the project identity and later used for resident-facing neighborhood information"
    ],
    knownOpenProtected: {
      known:
        "Jamie describes presenting and supporting planning and documentation for a mixed-use adaptive-reuse proposal, and reports that he established its public account. All four CCED Board members voted to recommend $490,539 on July 16, 2019. On September 26, the City Council accepted the recommendation and appropriated $490,539. The recovered public timeline later functioned as a resident-facing channel for neighborhood information and recurring #TiredOfTires pickups; it does not assign every post or program action to Jamie. Jamie reports that he later transitioned stewardship to a mission-aligned organization; City records subsequently described the original CCED project as withdrawn and reappropriated the unused funds.",
      open:
        "Public sources reviewed so far do not independently identify the successor organization or establish the timing and terms of transition. City records do not provide a complete stewardship or responsibility map.",
      protected:
        "Private financial, legal, property, banking, and stakeholder details are omitted."
    }
  }
] satisfies WorkMeta[];

export const workItems = workMetaSchema.array().parse(workItemsInput).sort((a, b) => {
  return a.priority - b.priority;
});

export type WorkSlug =
  | "196-sunday-dinner"
  | "callnyc"
  | "fair-rent-nyc"
  | "harry-j-epstein"
  | "kc-town-hall"
  | "wowlist";

export const featuredWork = workItems.filter((item) => item.featured);

export const workGroups = [
  "Operating systems for teams",
  "Civic and public-facing systems",
  "Community and cultural infrastructure",
  "Source-backed memory / AI lab",
  "Archived prototypes and older platforms"
] as const;
