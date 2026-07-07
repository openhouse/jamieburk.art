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
      "Helped translate an 80+ year-old paper-and-phone industrial supply business into searchable, dealer-aware e-commerce, content, analytics, and operations workflows while preserving its distinctive public voice.",
    role: "Technical Project Manager & Web Systems Lead",
    years: "2012-Present",
    status: "Full case study",
    featured: true,
    priority: 1,
    visibility: "public-safe",
    whatWasUnclear:
      "A legacy business had public voice, customer trust, inventory knowledge, and operating habits that did not automatically translate into modern e-commerce workflows.",
    whatBecameUsable:
      "Searchable catalog and order workflows, content and voice systems, analytics-informed improvements, dealer-aware operating patterns, and public provenance tools that supported online growth while preserving the company's distinctive institutional voice.",
    artifactTypes: ["website", "workflow", "analytics summary", "public-safe screenshot"],
    artifacts: [
      {
        title: "E-commerce workflow map",
        description:
          "Representative flow for translating inventory knowledge, customer language, dealer relationships, and order handling into a maintainable online workflow.",
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
      "No private analytics dashboards, revenue details, account/security records, customer data, vendor information, or internal operational materials are published.",
    sourceLayer:
      "Public website, public reporting, public-safe source package, approved resume claims, screenshots pending, and private materials intentionally omitted.",
    credits: ["Jamie Burkart", "Harry J. Epstein Company team"],
    publicSafety: {
      note: "Use only public-safe claims and approved screenshots. Treat metrics as contribution language unless Jamie approves more precise wording."
    },
    currentStatus: "Public-safe full case study. Screenshot approvals pending.",
    group: "Operating systems for teams",
    roleFit:
      "Technical operations, product operations, implementation, business analysis, documentation, and small-business web systems.",
    evidence: [
      "Public reporting documents the 2009 online-store launch with cart, checkout, search, country-of-origin information, catalog navigation, and flying-tools interaction",
      "Public reporting later described online sales as about half the business in 2016",
      "Approved resume claim: led web, e-commerce, analytics, marketing, and operations improvements contributing to 2x revenue growth",
      "Operations workflow improvements and long-term systems stewardship",
      "Stakeholder translation across technical and nontechnical contexts"
    ],
    knownOpenProtected: {
      known:
        "Jamie led long-term web, e-commerce, analytics, marketing, content, and operations improvements for an 80+ year-old legacy business, with impact language grounded in the approved resume and public-source package.",
      open:
        "Specific screenshots, individual legacy-feature authorship, old code, internal workflow diagrams, analytics charts, and detailed revenue breakdowns need Jamie approval before launch.",
      protected:
        "Private dashboards, account/security records, customer data, internal revenue detail, vendor terms, and sensitive operating practices stay offline."
    }
  },
  {
    title: "FairRentNYC / Commercial Rent Stabilization",
    slug: "fair-rent-nyc",
    series: "Civic Documentation",
    subtitle: "Coalition memory and civic documentation systems",
    summary:
      "Helped build and steward 30+ pages of shared Commercial Rent Stabilization campaign memory so collaborators could preserve decisions, route legal/policy questions, coordinate follow-up, and prepare public-safe explanations without exposing private coalition context.",
    role: "Documentation Systems Lead & Coalition Operations Support",
    years: "2024-Present",
    status: "Full case study",
    featured: true,
    priority: 2,
    visibility: "public-safe",
    whatWasUnclear:
      "The work involved many stakeholders, public/private source materials, legal and policy questions, city/state strategy lanes, shifting meetings, and sensitive coalition context that could easily become fragmented or overexposed.",
    whatBecameUsable:
      "Running minutes, action trackers, source maps, legal/policy question logs, city/state strategy lanes, consent-aware story handling, public-data framing, stakeholder follow-up notes, public-safe explanations, and shared campaign memory.",
    artifactTypes: ["source map", "meeting memory", "decision record", "public handout"],
    artifacts: [
      {
        title: "Campaign-memory spine",
        description:
          "A 30+ page shared documentation structure for meetings, next steps, decision context, open questions, and public-safe continuity.",
        type: "meeting memory"
      },
      {
        title: "Source map",
        description:
          "A structured way to separate public sources, private notes, open questions, and materials that require review.",
        type: "source map"
      },
      {
        title: "Policy question log",
        description:
          "A working list of unresolved legal, policy, city, and state questions for collaborators to review.",
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
      "Public-safe summary of collective civic and coalition work. This page does not publish private notes, legal-review materials, stakeholder lists, raw strategy documents, or unapproved internal materials.",
    sourceLayer:
      "Public sources, public campaign materials where approved, meeting memory summaries, private/redacted coalition context, and collaborator review still required for named materials.",
    credits: ["Jamie Burkart", "NYC Artist Coalition collaborators", "Commercial Rent Stabilization advocates"],
    publicSafety: {
      note: "Collective-work language is required: contributed to, helped structure, stewarded, supported, and translated."
    },
    currentStatus: "Active public-safe summary. Collaborator and material approvals pending.",
    group: "Civic and public-facing systems",
    roleFit:
      "Civic delivery, product operations, documentation architecture, source-backed memory, public guidance, and implementation support.",
    evidence: [
      "30+ pages of shared campaign-memory and coordination infrastructure",
      "Running minutes, decision records, action trackers, source maps, and city/state strategy lanes",
      "Consent levels for public, anonymized, confidential/internal, and needs-follow-up stories",
      "Legislative provenance redline mapping Intro 93, Fair Rent NYC recommendations, Small Business Jobs Survival Act-derived provisions, and Albany Senate Bill S8319 revisions",
      "Privacy-preserving commercial vacancy, occupancy, and lease-cost data materials"
    ],
    knownOpenProtected: {
      known:
        "Jamie helped structure and steward public-safe campaign memory, coordination documents, source maps, provenance materials, data framing, consent boundaries, and follow-up systems.",
      open:
        "Which specific public artifacts, collaborators, meeting materials, and screenshots may be named or shown requires approval.",
      protected:
        "Private coalition notes, legal-review materials, stakeholder lists, raw strategy context, private correspondence, and unapproved quotes are omitted."
    }
  },
  {
    title: "CallNYC.org",
    slug: "callnyc",
    series: "Civic Prototype",
    subtitle: "Civic data to resident-facing guidance",
    summary:
      "Built a civic-data prototype translating constituent-services open data into resident-facing find help / next steps guidance.",
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
      "Co-built a Python / Django + Ember.js community-calendar and social-discovery platform with followable keyword communities, weekly digests, Google Calendar sync, and 16,000+ archived posts/events across 35+ active city scenes by July 2017.",
    role: "Co-builder & Product Operator",
    years: "2010s",
    status: "Short proof page",
    featured: true,
    priority: 4,
    visibility: "public-safe",
    whatWasUnclear:
      "DIY organizers needed simple, low-burden ways to distribute events and maintain community visibility across scenes without relying on one centralized editorial calendar.",
    whatBecameUsable:
      "A followable keyword-community platform with event publishing, editable listings, list follows, saved/starred events, going status, weekly digests, calendar sync, media uploads, geolocation records, and organizer-facing distribution patterns.",
    artifactTypes: ["website", "workflow", "prototype", "diagram", "analytics summary"],
    artifacts: [
      {
        title: "Keyword-community model",
        description:
          "A simple, low-burden distribution pattern for followable arts, music, and local-interest communities across city scenes.",
        type: "diagram"
      },
      {
        title: "Archived product-scale summary",
        description:
          "Aggregate July 2017 archive counts used without exposing user records, raw database dumps, or private media.",
        type: "analytics summary"
      }
    ],
    tags: ["Community Systems", "Web Systems", "Product Operations", "Public-Facing Tools"],
    capabilities: ["Django", "Ember.js", "Community Platform Design", "Event Workflows"],
    careNote:
      "Historical proof page. Aggregate counts are archive-backed; raw database records, user data, private media, and organizer records stay offline.",
    sourceLayer:
      "Public-safe aggregate archive analysis, historical project context, transcript/OCR summaries, and screenshots pending Jamie approval.",
    credits: ["Jamie Burkart", "WOWList collaborators"],
    currentStatus: "Historical short proof page.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community systems, product operations, public-facing platforms, and event distribution workflows.",
    evidence: [
      "Python / Django + Ember.js platform",
      "1,846 archived users, 16,142 posts/events, 23,864 lists/tags, 28,837 list follows, and 20,927 saved/starred events by July 2017",
      "35+ active city scenes, using city/region entries with at least 50 geocoded posts/events as the conservative threshold",
      "Email digest and Google Calendar synchronization infrastructure",
      "Participatory publishing model for adding, editing, following, saving, and sharing local events"
    ],
    knownOpenProtected: {
      known:
        "WOWList was a co-built community-calendar and social-discovery platform organized around followable keyword communities, with public-safe aggregate archive counts through July 2017.",
      open:
        "Screenshots, archive links, collaborator-credit details, historical media restoration, and any broader adoption wording need approval.",
      protected:
        "Raw database dumps, account/security records, private media, organizer contact lists, private integration identifiers, and unapproved community records are not published."
    }
  },
  {
    title: "196 Artists Residency / Sunday Dinner",
    slug: "196-sunday-dinner",
    series: "Participation Infrastructure",
    subtitle: "Hosting, onboarding, facilitation, and continuity systems",
    summary:
      "Created Sunday Dinner / 196 Artists Residency as human-scale participation infrastructure, documenting 300+ gatherings and supporting 20+ resident artists through invitation, hosting, onboarding, documentation, and follow-through systems.",
    role: "Founder & Systems Steward",
    years: "2010s",
    status: "Short proof page",
    featured: true,
    priority: 5,
    visibility: "summary-only",
    whatWasUnclear:
      "A recurring cultural space needed trust-building routines, invitations, hospitality, artist support, and continuity without turning private community records into public spectacle.",
    whatBecameUsable:
      "Repeatable participation infrastructure for gatherings, resident artists, invitations, onboarding, facilitation, hospitality, documentation, follow-through, and handoffs.",
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
      "Summary-only page. Raw guest data, attendance records, private community records, and unapproved photos stay offline.",
    sourceLayer:
      "Approved resume claims, public-safe aggregate summary, local workbook structure, approved public materials pending, and private records intentionally omitted.",
    credits: ["Jamie Burkart", "196 / Sunday Dinner community"],
    currentStatus: "Public-safe summary only.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community operations, onboarding, facilitation, documentation, trust-building systems, and continuity planning.",
    evidence: [
      "300+ documented gatherings",
      "20+ resident artists supported",
      "Onboarding and participation systems",
      "Recurring operations and continuity structures",
      "Local workbook archive confirms substantial planning and metadata records without exposing guest data"
    ],
    knownOpenProtected: {
      known:
        "Jamie created and sustained participation infrastructure across recurring gatherings and artist-residency contexts, with 300+ documented gatherings and 20+ resident artists in the approved resume record.",
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
      "Co-led redevelopment planning and public-benefit documentation for adaptive reuse of a long-vacant approximately 6,500 square foot historic building into four commercial spaces and three homes.",
    role: "Co-Founder & Project Manager",
    years: "2020s",
    status: "Short proof page",
    featured: false,
    priority: 6,
    visibility: "public-safe",
    whatWasUnclear:
      "A long-vacant historic building involved public benefit, preservation, funding, stakeholder, and redevelopment questions that needed durable documentation.",
    whatBecameUsable:
      "Planning materials, public-benefit documentation, stakeholder context, neighborhood-process framing, and public-funding materials for an adaptive reuse effort.",
    artifactTypes: ["guide", "source map", "template"],
    artifacts: [
      {
        title: "Public-benefit documentation set",
        description:
          "Representative materials for describing intended public value, funding context, and stakeholder needs.",
        type: "guide"
      }
    ],
    tags: ["Implementation", "Documentation", "Knowledge Systems", "Public-Facing Tools"],
    capabilities: ["Stakeholder Documentation", "Funding Support", "Historic Preservation Context"],
    careNote:
      "Public-safe short proof page. Private financial, legal, property, and stakeholder details are omitted.",
    sourceLayer:
      "Public-safe summary and approved public materials pending.",
    credits: ["Jamie Burkart", "KC Town Hall LLC collaborators"],
    currentStatus: "Public-safe short proof page.",
    group: "Operating systems for teams",
    roleFit:
      "Long-horizon project management, public-benefit documentation, stakeholder coordination, and implementation support.",
    evidence: [
      "Redevelopment planning for a long-vacant approximately 6,500 square foot historic building",
      "Four commercial spaces and three homes in the project frame",
      "Public-benefit documentation and neighborhood-process framing",
      "$490,539 public funding recommendation",
      "Historic preservation and funding-process support"
    ],
    knownOpenProtected: {
      known:
        "Jamie co-led adaptive reuse planning and public-benefit documentation for a long-vacant approximately 6,500 square foot historic building and secured a $490,539 public funding recommendation.",
      open:
        "Specific public-funding materials, named partners, and project status details need approval.",
      protected:
        "Private financial, legal, property, project-finance, and stakeholder details are omitted."
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
