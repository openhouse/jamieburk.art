import { z } from "zod";
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
      "Jamie helped an 80+ year-old Kansas City industrial supply business translate paper, phone, catalog, dealer-pricing, and warehouse practices into searchable e-commerce, content, analytics, and operational workflows.",
    role: "Technical Project Manager & Web Systems Lead",
    years: "2012-Present",
    status: "Full case study",
    featured: true,
    priority: 1,
    visibility: "public-safe",
    whatWasUnclear:
      "A legacy business had public voice, customer trust, inventory knowledge, and operating habits that did not automatically translate into modern e-commerce workflows.",
    whatBecameUsable:
      "A searchable catalog, cart and checkout flow, dealer-pricing access, product-image workflows, blog publishing, analytics-informed operations, and public web voice that supported online growth while preserving the company's distinctive institutional culture.",
    artifactTypes: ["website", "workflow", "analytics summary", "public-safe screenshot"],
    artifacts: [
      {
        title: "E-commerce workflow and catalog map",
        description:
          "Representative flow for translating inventory knowledge, customer language, search, catalog navigation, cart, checkout, and order handling into maintainable online workflows.",
        type: "workflow"
      },
      {
        title: "Public-safe online growth summary",
        description:
          "Impact framed as a contribution to online growth, supported by resume claims and public reporting, without exposing dashboards or internal revenue detail.",
        type: "analytics summary"
      },
      {
        title: "Content, voice, and product-image system",
        description:
          "Reusable patterns for preserving the company's distinctive public voice across product pages, blog publishing, product photography, marketing, and support surfaces.",
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
      "No protected analytics dashboards, revenue detail, access secrets, customer data, vendor information, or internal operational materials are published.",
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
      "Searchable catalog, cart, checkout, search, country-of-origin, and flying-tools feature publicly documented at launch",
      "Web, e-commerce, marketing, content, analytics, and operational workflow improvements",
      "Dealer-pricing and catalog workflows translated from in-store practices",
      "Contributed to online growth",
      "Stakeholder translation across technical and nontechnical contexts"
    ],
    knownOpenProtected: {
      known:
        "Jamie contributed web, e-commerce, analytics, marketing, content, catalog, and operations improvements for an 80+ year-old Kansas City industrial supply business.",
      open:
        "Specific screenshots, internal workflow diagrams, and detailed revenue breakdowns need Jamie approval before launch.",
      protected:
        "Private dashboards, access secrets, customer data, internal revenue detail, vendor terms, and sensitive operating practices stay offline."
    }
  },
  {
    title: "NYC Artist Coalition / FairRentNYC",
    slug: "fair-rent-nyc",
    series: "Civic Documentation",
    subtitle: "Commercial Rent Stabilization, campaign memory, and civic documentation systems",
    summary:
      "Jamie helps NYC Artist Coalition / FairRentNYC turn cultural-space and small-business advocacy into usable civic infrastructure: campaign pages, public explainers, source maps, running minutes, action systems, legislative provenance, and public-data framing.",
    role: "Co-founder, Civic Systems, Documentation & Policy Communications Lead",
    years: "NYC Artist Coalition: 2017-Present; FairRentNYC: 2018-Present",
    status: "Full case study",
    featured: true,
    priority: 2,
    visibility: "public-safe",
    whatWasUnclear:
      "The work involved cultural-space advocates, small-business stakeholders, public materials, protected collaborator context, legal and policy questions, city/state strategy lanes, shifting meetings, and sensitive coalition context that could easily become fragmented or overexposed.",
    whatBecameUsable:
      "Campaign pages, public explainers, running minutes, action trackers, source maps, legal/policy question logs, legislative provenance redlines, policy-neutral open-data briefs, stakeholder follow-up notes, public-safe explanations, and shared campaign memory.",
    artifactTypes: ["source map", "meeting memory", "decision record", "public handout"],
    artifacts: [
      {
        title: "Campaign-memory spine",
        description:
          "A shared documentation structure for meetings, next steps, decision context, and public-safe continuity.",
        type: "meeting memory"
      },
      {
        title: "Source map",
        description:
          "A structured way to separate public sources, protected collaborator context, open questions, and materials that require review.",
        type: "source map"
      },
      {
        title: "Legislative provenance and data-policy materials",
        description:
          "Public-safe materials tracing bill lineage and scoping privacy-preserving commercial vacancy, occupancy, and lease-cost indicator questions.",
        type: "decision record"
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
      "Public Guidance",
      "Decision Records"
    ],
    careNote:
      "Public-safe summary of collective civic and coalition work. This page does not publish protected collaborator notes, materials requiring legal or policy review, stakeholder rosters, strategy drafts, or unapproved internal materials.",
    sourceLayer:
      "Public campaign pages, public sources, public-safe meeting-memory summaries, redacted coalition context, offline source materials, and collaborator review still required for named materials.",
    credits: ["Jamie Burkart", "NYC Artist Coalition collaborators", "Commercial Rent Stabilization advocates"],
    publicSafety: {
      note: "Collective-work language is required: contributed to, helped structure, stewarded, supported, and translated."
    },
    currentStatus: "Active public-safe summary. Collaborator and material approvals pending.",
    group: "Civic and public-facing systems",
    roleFit:
      "Civic delivery, product operations, documentation architecture, source-backed memory, public guidance, and implementation support.",
    evidence: [
      "NYC Artist Coalition public campaign infrastructure across cultural-space survival, nightlife policy, M.A.R.C.H. transparency, and Commercial Rent Stabilization",
      "30+ pages of shared campaign-memory infrastructure",
      "Running minutes, decision records, action trackers, and source maps",
      "Legislative provenance redline tracing CRS bill language across city, Fair Rent NYC, Small Business Jobs Survival Act lineage, and Albany revisions",
      "Policy-neutral data materials proposing geography-aggregated vacancy, occupancy, and lease-cost indicators",
      "Public-data framing and stakeholder next steps"
    ],
    knownOpenProtected: {
      known:
        "Jamie is a co-founder and civic-systems, documentation, and policy-communications lead for NYC Artist Coalition / FairRentNYC work. He helped structure and steward public-safe campaign memory, coordination documents, source maps, legislative provenance materials, data-policy briefs, and follow-up systems.",
      open:
        "Which specific public artifacts, collaborators, meeting materials, and screenshots may be named or shown requires approval.",
      protected:
        "Protected coalition notes, materials requiring legal or policy review, stakeholder rosters, strategy context, protected messages, and unapproved quotes are omitted."
    }
  },
  {
    title: "CallNYC.org",
    slug: "callnyc",
    series: "Civic Prototype",
    subtitle: "Civic data to resident-facing guidance",
    summary:
      "Jamie built a civic-data prototype that translated constituent-services open data into resident-facing issue pathways, district context, and possible next steps.",
    role: "Civic-Tech Builder & Product Translator",
    years: "2014-2015",
    status: "Full case study",
    featured: true,
    priority: 3,
    visibility: "public-safe",
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
          "A civic-data interpretation layer built after a New York City Council civic-data hackathon.",
        type: "map"
      },
      {
        title: "Archived press note",
        description:
          "External coverage can be linked after Jamie confirms the correct Politico New York citation.",
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
    careNote:
      "Archived civic-data prototype. Not an official or current City Council service, legal service, emergency service, or comprehensive civic guidance source.",
    sourceLayer:
      "CouncilStat / constituent-services open data, archived project context, public-safe screenshots pending, and press citation pending.",
    credits: ["Jamie Burkart", "Civic-data collaborators"],
    publicSafety: {
      note: "This page must make the archived and unofficial status visible wherever the project is summarized."
    },
    currentStatus: "Archived prototype. Public-safe screenshots and citation approvals pending.",
    group: "Civic and public-facing systems",
    roleFit:
      "Civic technology, product translation, open-data workflows, resident guidance, and public-facing web systems.",
    evidence: [
      "Built after a New York City Council civic-data hackathon",
      "Translated CouncilStat / constituent-services open data",
      "Organized public issue pages and resident-facing guidance",
      "Historical civic-tech demo with press citation pending"
    ],
    knownOpenProtected: {
      known:
        "CallNYC translated civic open data into issue pathways and resident-facing guidance as an archived prototype.",
      open:
        "The correct archive link, screenshots, and press citation need Jamie approval before publication.",
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
      "Jamie co-built a Python / Django and Ember.js community-calendar platform that helped DIY arts and music organizers publish, classify, follow, save, and distribute events through keyword communities.",
    role: "Co-builder & Product Operator",
    years: "2014-2022",
    status: "Short proof page",
    featured: true,
    priority: 4,
    visibility: "public-safe",
    whatWasUnclear:
      "DIY organizers needed low-overhead ways to distribute events and maintain community visibility across scenes without relying on one centralized editorial calendar.",
    whatBecameUsable:
      "A full-stack event-discovery platform with posts/events, tags/lists, follows, saved events, going status, email digests, embeddable calendars, Google Calendar synchronization, and organizer-facing publishing patterns.",
    artifactTypes: ["website", "workflow", "prototype"],
    artifacts: [
      {
        title: "Keyword-community model",
        description:
          "A low-overhead distribution pattern for followable arts, music, DIY, and local-interest communities.",
        type: "diagram"
      },
      {
        title: "Archived production scale summary",
        description:
          "Local archive analysis supports public-safe aggregate claims about users, posts/events, lists/tags, follows, saved events, and active city scenes without publishing raw records.",
        type: "analytics summary"
      }
    ],
    tags: ["Community Systems", "Web Systems", "Product Operations", "Public-Facing Tools"],
    capabilities: ["Django", "Ember.js", "Community Platform Design", "Event Workflows"],
    careNote:
      "Historical proof page. Aggregate archive counts may be used; raw records, user records, private media, and database exports stay offline.",
    sourceLayer:
      "Local archive analysis, public-safe summary, historical project context, transcript context, and screenshots pending Jamie approval.",
    credits: ["Jamie Burkart", "WOWList collaborators"],
    publicSafety: {
      note: "Historical proof page. Do not publish private user records, organizer contact rosters, or unapproved community materials."
    },
    currentStatus: "Historical short proof page.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community systems, product operations, public-facing platforms, and event distribution workflows.",
    evidence: [
      "Python / Django + Ember.js platform",
      "Local archive analysis: 1,846 users and 16,142 posts/events by July 2017",
      "23,864 lists/tags, 28,837 list follows, and 20,927 saved/starred events in the archived database",
      "35+ active city scenes using a conservative 50+ geocoded posts/events threshold",
      "Google Calendar synchronization and email digest infrastructure"
    ],
    knownOpenProtected: {
      known:
        "WOWList was a co-built community-calendar and social-discovery platform organized around followable keyword communities, with aggregate archive evidence for meaningful production use.",
      open:
        "Screenshots, archive links, restored visuals, and exact adoption wording need approval.",
      protected:
        "Raw database exports, user records, private media, organizer contact rosters, and unapproved community records are not published."
    }
  },
  {
    title: "196 Artists Residency / Sunday Dinner",
    slug: "196-sunday-dinner",
    series: "Participation Infrastructure",
    subtitle: "Hosting, onboarding, facilitation, and continuity systems",
    summary:
      "Jamie created repeatable hosting, onboarding, facilitation, documentation, and continuity systems across 300+ Sunday Dinner gatherings and 20+ resident artists.",
    role: "Host, Organizer & Systems Steward",
    years: "Sunday Dinner: 2012-Present; residency: 2020-Present",
    status: "Short proof page",
    featured: true,
    priority: 5,
    visibility: "summary-only",
    whatWasUnclear:
      "A recurring cultural space needed trust-building routines, invitations, hospitality, artist support, and continuity without turning private community records into public spectacle.",
    whatBecameUsable:
      "Repeatable participation infrastructure for gatherings, resident artists, intake, onboarding, scheduling, hospitality, facilitation, documentation, and handoffs.",
    artifactTypes: ["photo sequence", "workflow", "template"],
    artifacts: [
      {
        title: "Gathering rhythm",
        description:
          "A representative structure for welcoming, hosting, documenting, and continuing recurring cultural work.",
        type: "workflow"
      }
    ],
    tags: ["Community Systems", "Documentation", "Implementation", "Knowledge Systems"],
    capabilities: ["Onboarding", "Facilitation", "Hospitality Systems", "Artist Support"],
    careNote:
      "Summary-only page. Identifying participant records, attendance records, private community records, and unapproved photos stay offline.",
    sourceLayer:
      "Public-safe summary, approved public materials pending, and private records intentionally omitted.",
    credits: ["Jamie Burkart", "196 / Sunday Dinner community"],
    publicSafety: {
      note: "Summary-only public surface. Participant identities, private records, addresses, and unapproved images remain protected unless Jamie and the relevant people approve publication."
    },
    currentStatus: "Public-safe summary only.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community operations, onboarding, facilitation, documentation, trust-building systems, and continuity planning.",
    evidence: [
      "300+ gatherings documented",
      "20+ resident artists supported",
      "Intake, scheduling, onboarding, hospitality, facilitation, and documentation systems",
      "Recurring operations and continuity structures"
    ],
    knownOpenProtected: {
      known:
        "Jamie created and sustained participation infrastructure across 300+ gatherings and 20+ resident-artist contexts.",
      open:
        "Named participants, photos, and artifacts require consent and approval.",
      protected:
        "Identifying participant records, private records, attendance rosters, addresses, and unapproved images are omitted."
    }
  },
  {
    title: "KC Town Hall LLC",
    slug: "kc-town-hall",
    series: "Built Environment",
    subtitle: "Adaptive reuse planning and public-benefit documentation",
    summary:
      "Jamie co-led redevelopment planning and public-benefit documentation for adaptive reuse of a long-vacant approximately 6,500 sq. ft. historic building into four commercial spaces and three homes.",
    role: "Co-founder & Project Manager, Historic Restoration / Mixed-Use Development",
    years: "2015-2024",
    status: "Short proof page",
    featured: false,
    priority: 6,
    visibility: "public-safe",
    whatWasUnclear:
      "A long-vacant historic building involved public benefit, preservation, funding, stakeholder, and redevelopment questions that needed durable documentation.",
    whatBecameUsable:
      "Planning materials, public-benefit documentation, stakeholder context, and funding-process materials for a mixed-use adaptive reuse effort.",
    artifactTypes: ["guide", "source map", "template"],
    artifacts: [
      {
        title: "Public-benefit documentation set",
        description:
          "Representative materials for describing intended public value, funding context, and stakeholder needs.",
        type: "guide"
      },
      {
        title: "Funding-process support",
        description:
          "Public-safe summary of documentation and local funding strategy connected to a $490,539 public funding recommendation.",
        type: "public handout"
      }
    ],
    tags: ["Implementation", "Documentation", "Knowledge Systems", "Public-Facing Tools"],
    capabilities: ["Stakeholder Documentation", "Funding Support", "Historic Preservation Context"],
    careNote:
      "Public-safe short proof page. Private financial, legal, property, and stakeholder details are omitted.",
    sourceLayer:
      "Public-safe summary and approved public materials pending.",
    credits: ["Jamie Burkart", "KC Town Hall LLC collaborators"],
    publicSafety: {
      note: "Public-safe short proof page. Legal, property, finance-sensitive, banking, and stakeholder details remain omitted unless explicitly approved."
    },
    currentStatus: "Public-safe short proof page.",
    group: "Operating systems for teams",
    roleFit:
      "Long-horizon project management, public-benefit documentation, stakeholder coordination, and implementation support.",
    evidence: [
      "Redevelopment planning",
      "Public-benefit documentation",
      "Historic preservation context",
      "Approximately 6,500 sq. ft. long-vacant building planned for four commercial spaces and three homes",
      "$490,539 public funding recommendation"
    ],
    knownOpenProtected: {
      known:
        "Jamie co-led adaptive reuse planning and documentation for a long-vacant approximately 6,500 sq. ft. historic building and helped secure a $490,539 public funding recommendation.",
      open:
        "Specific public-funding materials, named partners, and project status details need approval.",
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
