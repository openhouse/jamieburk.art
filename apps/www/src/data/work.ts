import { z } from "zod";
import { getClaimProjection } from "@/data/knowledge-bank";
import type { WorkMeta } from "@/types/work";

const visibilitySchema = z.enum([
  "public",
  "public-safe",
  "redacted",
  "summary-only",
  "private",
]);

const workStatusSchema = z.enum([
  "Full case study",
  "Short proof page",
  "Lab / research",
  "Archived prototype",
  "Public-safe summary only",
  "Draft",
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
  "press",
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
  whatWasUnclear: z.string(),
  whatBecameUsable: z.string(),
  artifactTypes: z.array(artifactTypeSchema),
  artifacts: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      type: artifactTypeSchema,
    }),
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
    "Archived prototypes and older platforms",
  ]),
  roleFit: z.string(),
  evidence: z.array(z.string()),
  knownOpenProtected: z.object({
    known: z.string(),
    open: z.string(),
    protected: z.string(),
  }),
});

const workItemsInput = [
  {
    title: "Harry J. Epstein Company",
    slug: "harry-j-epstein",
    series: "Operating Structure",
    subtitle: "E-commerce and operations modernization",
    summary:
      "Helped an 80+ year-old industrial business adapt to e-commerce through web, analytics, content, marketing, and workflow improvements that contributed to a period of 2x revenue growth.",
    role: "Technical Project Manager & Web Systems Lead",
    years: "2012-Present",
    status: "Full case study",
    featured: true,
    priority: 1,
    visibility: "public-safe",
    proofBankIds: [
      "hje-modernization-stewardship",
      "hje-revenue-growth-contribution",
    ],
    whatWasUnclear:
      "A legacy business had public voice, customer trust, inventory knowledge, and operating habits that did not automatically translate into modern e-commerce workflows.",
    whatBecameUsable:
      "Improved web, e-commerce, analytics, marketing, content, and operational systems that supported online growth while preserving the company's distinctive institutional voice.",
    artifactTypes: [
      "website",
      "workflow",
      "analytics summary",
      "public-safe screenshot",
    ],
    artifacts: [
      {
        title: "E-commerce workflow map",
        description:
          "Representative flow for translating inventory knowledge, customer language, and order handling into a maintainable online workflow.",
        type: "workflow",
      },
      {
        title: "Public-safe analytics summary",
        description:
          "Impact framed as a contribution to online growth without exposing private dashboards or internal revenue detail.",
        type: "analytics summary",
      },
      {
        title: "Content and voice system",
        description:
          "Reusable patterns for preserving the company's distinctive public voice across product, marketing, and support surfaces.",
        type: "template",
      },
    ],
    tags: [
      "Technical Operations",
      "Product Operations",
      "Implementation",
      "Documentation",
      "Small Business",
      "Public-Facing Tools",
    ],
    capabilities: [
      "Requirements",
      "Workflow Mapping",
      "Handoffs",
      "Analytics",
      "Public-Facing Web Systems",
    ],
    links: [{ label: "Website", url: "https://www.harryepstein.com/" }],
    careNote:
      "No private analytics dashboards, revenue details, passwords, customer data, vendor information, or internal operational materials are published.",
    sourceLayer:
      "Public website, public-safe summary, approved screenshots pending, resume-backed impact claims, and private materials intentionally omitted.",
    credits: ["Jamie Burkart", "Harry J. Epstein Company team"],
    publicSafety: {
      note: "Use only public-safe claims and approved screenshots. Treat metrics as contribution language unless Jamie approves more precise wording.",
    },
    currentStatus: "Public-safe full case study. Screenshot approvals pending.",
    group: "Operating systems for teams",
    roleFit:
      "Technical operations, product operations, implementation, business analysis, documentation, and small-business web systems.",
    evidence: [
      "Web, e-commerce, marketing, content, and analytics systems",
      "Operations workflow improvements and long-term systems stewardship",
      "Contributed to 2x revenue growth",
      "Stakeholder translation across technical and nontechnical contexts",
    ],
    knownOpenProtected: {
      known:
        "Jamie contributed long-term web, e-commerce, analytics, marketing, content, and operations improvements for an 80+ year-old legacy business.",
      open: "Specific screenshots, internal workflow diagrams, and detailed revenue breakdowns need Jamie approval before launch.",
      protected:
        "Private dashboards, credentials, customer data, internal revenue detail, vendor terms, and sensitive operating practices stay offline.",
    },
  },
  {
    title: "NYC Artist Coalition / FairRentNYC",
    slug: "fair-rent-nyc",
    series: "Civic Systems",
    subtitle:
      "Cultural-space advocacy, coalition memory, and Commercial Rent Stabilization",
    summary:
      "Co-founded NYC Artist Coalition and built public civic systems, campaign websites, source maps, and shared campaign memory for cultural-space advocacy, public testimony, and durable coalition work.",
    role: "Co-Founder, Civic Systems & Policy Communications",
    years: "2017-Present; current collaboration 2026-Present",
    status: "Full case study",
    featured: true,
    priority: 2,
    visibility: "public-safe",
    proofBankIds: [
      "fair-rent-campaign-memory",
      "fair-rent-source-map",
      "nyc-artist-coalition-public-web-infrastructure",
      "nyc-artist-coalition-civic-systems",
    ],
    whatWasUnclear:
      "The work involved many stakeholders, public/private source materials, legal and policy questions, city/state strategy lanes, shifting meetings, and sensitive coalition context that could easily become fragmented or overexposed.",
    whatBecameUsable:
      "A six-part coalition operating plan, consent-aware collaborative running memory, a legislative provenance redline, a Jamie-attributed multi-action working draft later edited by a collaborator, and requirements for privacy-preserving public-data work, alongside campaign websites, public testimony, and an auditable policy trail.",
    artifactTypes: [
      "website",
      "source map",
      "meeting memory",
      "decision record",
      "guide",
      "public handout",
    ],
    artifacts: [
      {
        title: "Campaign-memory spine",
        description:
          "A shared documentation structure for meetings, next steps, decision context, and public-safe continuity.",
        type: "meeting memory",
      },
      {
        title: "Six-part coalition operating plan",
        description:
          "A clear front door, recurring room, shared public line, stewarded story bank, implementation-readiness packet, and durable source-of-truth spine.",
        type: "decision record",
      },
      {
        title: "Legislative source map and provenance redline",
        description:
          "A traceable view of bill language across public policy lineages and revision paths, separated from protected legal-review context.",
        type: "source map",
      },
      {
        title: "Policy question log",
        description:
          "A working list of unresolved legal, policy, city, and state questions for collaborators to review.",
        type: "decision record",
      },
      {
        title: "Privacy-preserving public-data pilot",
        description:
          "Requirements for aggregate vacancy and lease-cost indicators, coverage and suppression reporting, methods, and release versioning.",
        type: "decision record",
      },
      {
        title: "Public campaign web surfaces",
        description:
          "Public-safe website infrastructure for NYC Artist Coalition advocacy, FairRentNYC, Talks Not Raids, and Let NYC Dance.",
        type: "website",
      },
      {
        title: "Multi-action guidance working draft",
        description:
          "A Jamie-attributed working draft that turned three concurrent civic lanes into clear audience actions; a collaborator later edited it, and publication or use is not established.",
        type: "guide",
      },
      {
        title: "Public testimony and policy trail",
        description:
          "Cited records place Jamie's direct advocacy and Council testimony alongside separately credited coalition campaigns, enacted transparency requirements, and later City action; they do not establish individual causality.",
        type: "public handout",
      },
    ],
    tags: [
      "Civic Technology",
      "Knowledge Systems",
      "Documentation",
      "Product Operations",
      "Source-Backed Memory",
      "Public-Facing Tools",
    ],
    capabilities: [
      "Meeting Synthesis",
      "Source Mapping",
      "Action Tracking",
      "Campaign Websites",
      "Public Guidance",
      "Decision Records",
    ],
    links: [
      { label: "NYC Artist Coalition", url: "https://nycartc.com/" },
      { label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" },
      { label: "Talks Not Raids", url: "https://talksnotraids.com/" },
      { label: "Let NYC Dance", url: "https://letnycdance.nycartc.com/" },
      { label: "NYC Artist Coalition on X", url: "https://x.com/NYCArtC" },
      {
        label: "2019 Council testimony",
        url: "https://legistar.council.nyc.gov/View.ashx?GUID=2582E680-452D-46B1-8DE1-C5C5168F5D63&ID=7080592&M=F",
      },
      {
        label: "Local Law 220 record",
        url: "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=6A35ADA6-86E7-40B0-AD39-5B6E376FD23F&ID=3704342&Options=ID%7CText%7C&Search=1156",
      },
    ],
    careNote:
      "Public-safe summary of collective civic and coalition work. This page does not publish private notes, legal-review materials, stakeholder lists, raw strategy documents, or unapproved internal materials.",
    sourceLayer:
      "Public campaign materials, independent reporting, City-hosted records, Council testimony and legislation, meeting-memory summaries, revision-attributed Shared Drive artifacts, and private/redacted coalition context.",
    credits: [
      "Jamie Burkart",
      "NYC Artist Coalition collaborators",
      "Commercial Rent Stabilization advocates",
    ],
    publicSafety: {
      note: "Collective-work language is required: contributed to, helped structure, stewarded, supported, and translated.",
    },
    currentStatus:
      "Active cited public-safe case study. Additional collaborator and artifact approvals remain welcome.",
    group: "Civic and public-facing systems",
    roleFit:
      "Civic delivery, coalition operations, product operations, documentation architecture, source-backed memory, public guidance, policy communications, and implementation support.",
    evidence: [
      "Co-founder role in NYC Artist Coalition",
      "Civic systems, coalition operations, and policy-communications infrastructure",
      "Independent reporting identifies Jamie as a founding member and participant in the multi-group Cabaret Law repeal campaign",
      "2019 Council testimony records Jamie asking for Talks Not Raids, MARCH transparency, and direct problem-solving with cultural establishments",
      "Local Law 220 later required MARCH reporting and advance notice with exceptions; the City replaced MARCH with CURE in 2023",
      "Campaign materials around Cabaret Law repeal, Office of Nightlife accountability, nightlife enforcement reporting, Commercial Rent Stabilization, and storefront stability",
      "30+ pages of shared campaign-memory infrastructure",
      "Running minutes, decision records, action trackers, and source maps",
      "Six-part coalition operating plan with explicit role boundaries",
      "Privacy-preserving commercial vacancy and lease-cost data pilot specification",
      "Jamie-attributed multi-action working draft later edited by a collaborator",
      "Public campaign websites for NYC Artist Coalition advocacy",
      "Mission-relevant public engagement from at least four NYC Council Member accounts in the recovered 2017-2020 social corpus",
      "Legal/policy questions organized for collaborators",
      "Public-data framing and stakeholder next steps",
    ],
    knownOpenProtected: {
      known:
        "Public reporting identifies Jamie as a founding member of NYC Artist Coalition. He built campaign web infrastructure, participated in Cabaret Law advocacy, testified for Talks Not Raids, and developed civic systems and source-backed campaign memory.",
      open: "Which specific public artifacts, collaborators, meeting materials, and screenshots may be named or shown requires approval.",
      protected:
        "Private coalition notes, legal-review materials, stakeholder lists, raw strategy context, private emails, and unapproved quotes are omitted.",
    },
  },
  {
    title: "CallNYC.org",
    slug: "callnyc",
    series: "Civic Prototype",
    subtitle: "Civic data to resident-facing guidance",
    summary: getClaimProjection(
      "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
      "work-card",
      "/work",
    ).text,
    role: "Civic-Tech Builder & Product Translator",
    years: "2016 - archived",
    status: "Full case study",
    featured: true,
    priority: 3,
    visibility: "public-safe",
    proofBankIds: ["callnyc-civic-data-guidance"],
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
        type: "prototype",
      },
      {
        title: "Open-data translation layer",
        description:
          "An independent interpretation layer built from CouncilStat constituent-services records.",
        type: "map",
      },
      {
        title: "Archived press note",
        description:
          "Politico New York covered CallNYC in 2016 as a public way to explore City Council constituent-services data.",
        type: "press",
      },
    ],
    tags: [
      "Civic Technology",
      "Open Data",
      "Web Systems",
      "Implementation",
      "Public-Facing Tools",
    ],
    capabilities: [
      "Open Data Translation",
      "Resident Guidance",
      "Prototype Delivery",
      "Information Architecture",
      "Public Interfaces",
    ],
    links: [
      {
        label: "Politico New York archived PDF",
        url: "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf",
      },
      {
        label: "GitHub repository",
        url: "https://github.com/openhouse/CallNYC",
      },
      { label: "CallNYC on X", url: "https://x.com/CallNYCApp" },
    ],
    careNote:
      "Archived civic-data prototype. Not an official or current City Council service, legal service, emergency service, or comprehensive civic guidance source.",
    sourceLayer:
      "CouncilStat / constituent-services open data, archived project context, verified Politico New York coverage, public GitHub repository, and a metadata-only full-population review of the historical project account.",
    credits: ["Jamie Burkart", "Civic-data collaborators"],
    publicSafety: {
      note: "This page must make the archived and unofficial status visible wherever the project is summarized.",
    },
    currentStatus: "Archived prototype. Public-safe screenshots pending.",
    group: "Civic and public-facing systems",
    roleFit:
      "Civic technology, product translation, open-data workflows, resident guidance, and public-facing web systems.",
    evidence: [
      "Independent follow-on to the New York City Council's first CouncilStat hackathon",
      "Translated CouncilStat / constituent-services open data",
      "Organized public issue pages and resident-facing guidance",
      "Covered by Politico New York in 2016",
      "At least eight distinct historical NYC Council Member accounts publicly replied to, shared, quote-posted, quoted, or acknowledged CallNYC",
      "Across the retrievable account population, issue-specific posts repeatedly paired a Council office with one of 62 distinct service or API pathways spanning 16 service domains",
    ],
    knownOpenProtected: {
      known:
        "CallNYC independently translated CouncilStat constituent-services records into issue pathways and resident-facing guidance as an archived prototype with 2016 Politico New York coverage.",
      open: "Public-safe screenshots and additional archive links need Jamie approval before publication.",
      protected:
        "No current-service claims, official city affiliation claims, private user data, or unverified guidance are published.",
    },
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
        type: "diagram",
      },
    ],
    tags: [
      "Community Systems",
      "Web Systems",
      "Product Operations",
      "Public-Facing Tools",
    ],
    capabilities: [
      "Django",
      "PostgreSQL / PostGIS",
      "Ember.js",
      "Community Platform Design",
      "Event Workflows",
    ],
    links: [{ label: "WOW List on X", url: "https://x.com/wowlist" }],
    careNote:
      "Historical proof page. Claims should avoid overreading adoption beyond public-safe estimates.",
    sourceLayer:
      "Public-safe aggregate records, historical project context, and a metadata-only review of all 38 records reported by the project-account profile.",
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
      "Roughly 35 city ecosystems reached",
      "All 38 profile-counted project-account records reviewed across Posts and Replies",
      "Historical account used for product support, community onboarding, source curation, event distribution, and rapid civic coordination",
      "Bounded search recovered 10 mission-relevant third-party accounts; nine independently posted a WOW List URL",
    ],
    knownOpenProtected: {
      known:
        "WOWList was a co-built community-calendar platform organized around followable keyword communities.",
      open:
        "Screenshot selection and the exact historical relationship between @WOWListNYC and @wowlist remain open.",
      protected:
        "Private user data, organizer contact lists, and unapproved community records are not published.",
    },
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
    ],
    whatWasUnclear:
      "A recurring cultural space needed trust-building routines, invitations, hospitality, artist support, and continuity without turning private community records into public spectacle.",
    whatBecameUsable:
      "Repeatable participation infrastructure for gatherings and resident artists, including a scheduled acceptance, pre-arrival orientation, space configuration, and independent access handoff.",
    artifactTypes: ["photo sequence", "workflow", "template"],
    artifacts: [
      {
        title: "Gathering rhythm",
        description:
          "A representative structure for welcoming, hosting, documenting, and continuing recurring cultural work.",
        type: "workflow",
      },
      {
        title: "Residency acceptance and access handoff",
        description:
          "A template-based 2023 workflow for schedule, orientation, space configuration, and independent collaborator access.",
        type: "template",
      },
    ],
    tags: [
      "Community Systems",
      "Documentation",
      "Implementation",
      "Knowledge Systems",
    ],
    capabilities: [
      "Onboarding",
      "Facilitation",
      "Hospitality Systems",
      "Artist Support",
    ],
    careNote:
      "Summary-only page. Raw guest data, attendance records, private community records, and unapproved photos stay offline.",
    sourceLayer:
      "Public-safe summary plus a revision-attributed onboarding template; participant identities, access details, and raw community records remain private.",
    credits: ["Jamie Burkart", "196 / Sunday Dinner community"],
    currentStatus: "Public-safe summary only.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community operations, onboarding, facilitation, documentation, trust-building systems, and continuity planning.",
    evidence: [
      "300+ hosted gatherings",
      "20+ resident artists supported",
      "Onboarding and participation systems",
      "Revision-attributed residency acceptance and access handoff",
      "Recurring operations and continuity structures",
    ],
    knownOpenProtected: {
      known:
        "Jamie created and sustained participation infrastructure across recurring gatherings and artist-residency contexts.",
      open: "Named participants, photos, and artifacts require consent and approval.",
      protected:
        "Raw guest data, private records, attendance lists, addresses, and unapproved images are omitted.",
    },
  },
  {
    title: "KC Town Hall LLC",
    slug: "kc-town-hall",
    series: "Built Environment",
    subtitle: "Historic restoration, participatory development, and neighborhood operations",
    summary:
      "KC Town Hall completed a $189,629 Phase One cold-shell restoration in 2019. The packet names Jamie and Julia Fredenburg as founders/project managers; Jamie states that he also served as Phase One general contractor and daily site coordinator. He designed a resident survey system and coordinated recurring neighborhood service operations alongside the later, separately documented municipal funding process.",
    role: "Founder & Project Manager; Phase One General Contractor (first-hand account)",
    years: "2018-2022; 2019 funding decision; 2024 disposition",
    status: "Short proof page",
    featured: false,
    priority: 6,
    visibility: "public-safe",
    proofBankIds: ["kc-town-hall-public-benefit-documentation"],
    whatWasUnclear:
      "A long-vacant building required historic restoration, trade sequencing, resident input, public-benefit design, recurring neighborhood operations, and careful distinctions among recommendation, Council authorization, appropriation, contract execution, and payment.",
    whatBecameUsable:
      "A completed cold shell, coordinated restoration workflows, a survey-to-proposal input loop, recurring tire-pickup operations, public-benefit documentation, municipal-review support, a source-backed funding chronology, and, in Jamie's first-hand account, continuity through a mission-aligned transition.",
    artifactTypes: ["guide", "source map", "template"],
    artifacts: [
      {
        title: "Phase One cold-shell scope",
        description:
          "A $189,629 completed-2019 scope covering roof deck, insulation and TPO membrane, historic masonry, framing, water connection, egress, safety, access, cleanup, and related site work.",
        type: "source map",
      },
      {
        title: "Resident survey and backing data system",
        description:
          "A low-friction 4-by-6-inch handbill and data workflow that allowed neighborhood input to enter proposal and use decisions.",
        type: "template",
      },
      {
        title: "Public-benefit documentation set",
        description:
          "Representative materials for describing intended public value, funding context, and stakeholder needs.",
        type: "guide",
      },
      {
        title: "Municipal funding decision record",
        description:
          "Official proposal, resolution, appropriation, and reappropriation records that distinguish authorization from receipt.",
        type: "source map",
      },
      {
        title: "Public operating and source archive",
        description:
          "A complete 183-record account corpus preserving resident-input, recurring tire-pickup, civic-resource, posted-link, and stakeholder-response patterns with explicit evidence boundaries.",
        type: "source map",
      },
    ],
    tags: [
      "Implementation",
      "Project Delivery",
      "Documentation",
      "Knowledge Systems",
      "Public-Facing Tools",
      "Community Operations",
    ],
    capabilities: [
      "Stakeholder Documentation",
      "Construction Coordination",
      "Participatory Research",
      "Service Operations",
      "Funding Support",
      "Historic Preservation Context",
      "Public Information Systems",
    ],
    careNote:
      "The packet's documented Phase One scope, public social records, and Jamie's first-hand role clarification are distinguished. Collective credit remains visible; private contacts, survey responses, routes, reasons, and financial, legal, property, or stakeholder details remain omitted.",
    sourceLayer:
      "A public-safe archival review of the 2019 CCED packet, official KCMO proposal and Council records, a complete public-safe 183-record @KCTownHall corpus, public participant and environmental-collaborator posts, a protected multi-year operating log, and Jamie's bounded first-hand clarifications.",
    links: [{ label: "KC Town Hall on X", url: "https://x.com/KCTownHall" }],
    credits: [
      "Jamie Burkart",
      "Julia Fredenburg",
      "KC Town Hall architecture, preservation, trade, neighborhood, and project collaborators",
    ],
    currentStatus:
      "Historical project. Jamie states that he transitioned the project to a mission-aligned organization. Separately, the City's 2024 record states that KC Town Hall withdrew and the full 2019 appropriation remained unused and was reappropriated.",
    group: "Operating systems for teams",
    roleFit:
      "Construction and implementation coordination, participatory research, recurring service operations, public-benefit documentation, stakeholder coordination, and long-horizon handoff.",
    evidence: [
      "$189,629 Phase One cold-shell restoration completed in 2019",
      "Founder/project-manager designation; Phase One general-contractor role in Jamie's first-hand account",
      "4-by-6-inch resident survey handbill and backing data system",
      "Survey input documented as directly shaping the proposal and influencing proposed retail uses",
      "Recurring TiredOfTires field operations from 2019 through 2022, with exact totals held for reconciliation",
      "Redevelopment planning",
      "Public-benefit documentation",
      "City-listed developer/presenter role",
      "CCED Board recommendation and Council acceptance",
      "$490,539 Council appropriation, later reappropriated unused",
      "Project transition to a mission-aligned organization (Jamie's first-hand account)",
      "Institutional context from a complete 183-record @KCTownHall archival review: resident input, recurring service intake, civic information, and three direct Council Member account responses",
    ],
    knownOpenProtected: {
      known:
        "The 2019 packet identifies Jamie and Julia Fredenburg as founders/project managers, documents a $189,629 Phase One cold-shell scope and a survey-to-proposal input loop, and supports 2019 completion alongside Jamie's first-hand confirmation. Public records corroborate Jamie's direct TiredOfTires operations. The City separately listed him as developer/presenter for Phase Two, then documented the Board recommendation, Council appropriation, later withdrawal, and reappropriation of the unused amount.",
      open: "Jamie's general-contractor title, TiredOfTires design and City-coordination role, Indian Mound expansion, and Cleveland Avenue Unify to Beautify role need independent role-bearing records. Exact tire and resident-savings totals, survey response volume, an executed funding agreement, receipt, expenditure, receiving-organization identity, and transition terms remain unverified or protected.",
      protected:
        "Private reasons, contacts, raw survey responses, household routes, contracts, invoices, and financial, legal, property, banking, or stakeholder details are omitted.",
    },
  },
] satisfies WorkMeta[];

export const workItems = workMetaSchema
  .array()
  .parse(workItemsInput)
  .sort((a, b) => {
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
  "Archived prototypes and older platforms",
] as const;
