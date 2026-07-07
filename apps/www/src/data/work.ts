import { z } from "zod";
import { workEvidenceFor } from "@/data/proofs";
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
      "Led long-running web, e-commerce, marketing, analytics, content, and operational workflow improvements for an 80+ year-old legacy industrial business.",
    role: "Technical Project Manager & Web Systems Lead",
    years: "2012-Present",
    status: "Full case study",
    featured: true,
    priority: 1,
    visibility: "public-safe",
    whatWasUnclear:
      "A legacy business had public voice, customer trust, inventory knowledge, and operating habits that did not automatically translate into modern e-commerce workflows.",
    whatBecameUsable:
      "Catalog, search, checkout, dealer-aware e-commerce, analytics, marketing, content, and operational systems that supported online growth while preserving the company's distinctive institutional voice.",
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
    evidence: workEvidenceFor("harry-j-epstein"),
    knownOpenProtected: {
      known:
        "Jamie led long-term web, e-commerce, analytics, marketing, content, and operations improvements for an 80+ year-old legacy business.",
      open:
        "Specific screenshots, internal workflow diagrams, and detailed revenue breakdowns need Jamie approval before launch.",
      protected:
        "Private dashboards, credentials, customer data, internal revenue detail, vendor terms, and sensitive operating practices stay offline."
    }
  },
  {
    title: "FairRentNYC / Commercial Rent Stabilization",
    slug: "fair-rent-nyc",
    series: "Civic Documentation",
    subtitle: "NYC Artist Coalition, coalition memory, and civic documentation systems",
    summary:
      "Built and stewarded 30+ pages of shared campaign-memory and coordination infrastructure for Commercial Rent Stabilization and storefront-stability advocacy, connecting NYC Artist Coalition cultural-space fieldwork with public-safe civic documentation.",
    role: "Documentation Systems Lead, Coalition Operations Support & NYC Artist Coalition Co-founding Member",
    years: "2024-Present",
    status: "Full case study",
    featured: true,
    priority: 2,
    visibility: "public-safe",
    whatWasUnclear:
      "The work involved many stakeholders, public/private source materials, legal and policy questions, city/state strategy lanes, shifting meetings, and sensitive coalition context that could easily become fragmented or overexposed.",
    whatBecameUsable:
      "Running minutes, action trackers, source maps, legal/policy question logs, public-data asks, cultural-space follow-up notes, public-safe explanations, and 30+ pages of shared campaign memory.",
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
          "A structured way to separate public sources, private notes, open questions, and materials that require review.",
        type: "source map"
      },
      {
        title: "Policy question log",
        description:
          "A working list of unresolved legal, policy, city, and state questions for collaborators to review.",
        type: "decision record"
      },
      {
        title: "Public-safe role and work-lane map",
        description:
          "A bounded framing of Jamie's NYC Artist Coalition role, the coalition's public advocacy context, and current Commercial Rent Stabilization work lanes.",
        type: "source map"
      }
    ],
    tags: [
      "Civic Technology",
      "Knowledge Systems",
      "Documentation",
      "Product Operations",
      "Source-Backed Memory",
      "Public-Facing Tools",
      "NYC Artist Coalition"
    ],
    capabilities: [
      "Meeting Synthesis",
      "Source Mapping",
      "Action Tracking",
      "Public Guidance",
      "Decision Records",
      "Coalition Operations",
      "Cultural-Space Fieldwork"
    ],
    careNote:
      "Public-safe summary of collective civic and coalition work. This page does not publish private notes, legal-review materials, stakeholder lists, raw strategy documents, or unapproved internal materials.",
    sourceLayer:
      "Public sources, public NYC Artist Coalition campaign context, public campaign materials where approved, meeting memory summaries, private/redacted coalition context, and collaborator review still required for named materials.",
    credits: ["Jamie Burkart", "NYC Artist Coalition collaborators", "Commercial Rent Stabilization advocates"],
    publicSafety: {
      note: "Collective-work language is required: contributed to, helped structure, stewarded, supported, and translated."
    },
    currentStatus: "Active public-safe summary. Collaborator and material approvals pending.",
    group: "Civic and public-facing systems",
    roleFit:
      "Civic delivery, product operations, documentation architecture, source-backed memory, public guidance, and implementation support.",
    evidence: workEvidenceFor("fair-rent-nyc"),
    knownOpenProtected: {
      known:
        "Jamie is a co-founding member of NYC Artist Coalition and built public-safe campaign memory, coordination documents, source maps, and follow-up systems for Commercial Rent Stabilization work.",
      open:
        "Which specific public artifacts, collaborators, meeting materials, screenshots, and current strategy details may be named or shown requires approval.",
      protected:
        "Private coalition notes, legal-review materials, stakeholder lists, raw strategy context, private emails, live partner detail, and unapproved quotes are omitted."
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
    evidence: workEvidenceFor("callnyc"),
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
      "Co-built a Python / Django + Ember.js community-calendar platform used across 35+ city scenes, with followable keyword communities, event workflows, email digests, and calendar publishing.",
    role: "Co-builder & Product Operator",
    years: "2010s",
    status: "Short proof page",
    featured: true,
    priority: 4,
    visibility: "public-safe",
    whatWasUnclear:
      "DIY organizers needed lightweight ways to distribute events and maintain community visibility across scenes without relying on one centralized editorial calendar.",
    whatBecameUsable:
      "A followable keyword-community platform with event distribution workflows, organizer-facing publishing patterns, email digests, and calendar integrations.",
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
    capabilities: ["Django", "Ember.js", "Community Platform Design", "Event Workflows"],
    careNote:
      "Historical proof page. Claims should avoid overreading adoption beyond public-safe estimates.",
    sourceLayer:
      "Public-safe summary, historical project context, aggregate local-archive analysis, and screenshots pending Jamie approval.",
    credits: ["Jamie Burkart", "WOWList collaborators"],
    currentStatus: "Historical short proof page.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community systems, product operations, public-facing platforms, and event distribution workflows.",
    evidence: workEvidenceFor("wowlist"),
    knownOpenProtected: {
      known:
        "WOWList was a co-built community-calendar platform organized around followable keyword communities and used across 35+ city scenes.",
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
      "Created Sunday Dinner / 196 Artists Residency as participation infrastructure, documenting 300+ gatherings and supporting 20+ resident artists through hosting, onboarding, facilitation, documentation, and follow-through systems.",
    role: "Host, Organizer & Systems Steward",
    years: "2010s",
    status: "Short proof page",
    featured: true,
    priority: 5,
    visibility: "summary-only",
    whatWasUnclear:
      "A recurring cultural space needed trust-building routines, invitations, hospitality, artist support, and continuity without turning private community records into public spectacle.",
    whatBecameUsable:
      "Repeatable participation infrastructure for 300+ gatherings, resident artists, onboarding, facilitation, documentation, and handoffs.",
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
      "Public-safe summary, approved public materials pending, and private records intentionally omitted.",
    credits: ["Jamie Burkart", "196 / Sunday Dinner community"],
    currentStatus: "Public-safe summary only.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community operations, onboarding, facilitation, documentation, trust-building systems, and continuity planning.",
    evidence: workEvidenceFor("196-sunday-dinner"),
    knownOpenProtected: {
      known:
        "Jamie created and sustained participation infrastructure across recurring gatherings and artist-residency contexts.",
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
      "Co-led redevelopment planning and public-benefit documentation for adaptive reuse of a long-vacant historic building, including public-funding and stakeholder documentation.",
    role: "Co-Founder & Project Manager",
    years: "2020s",
    status: "Short proof page",
    featured: false,
    priority: 6,
    visibility: "public-safe",
    whatWasUnclear:
      "A long-vacant historic building involved public benefit, preservation, funding, stakeholder, and redevelopment questions that needed durable documentation.",
    whatBecameUsable:
      "Planning materials, public-benefit documentation, public-funding support, and stakeholder context for an adaptive reuse effort.",
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
    evidence: workEvidenceFor("kc-town-hall"),
    knownOpenProtected: {
      known:
        "Jamie co-led adaptive reuse planning and documentation for a long-vacant historic building.",
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
