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
      "Helped an 80+ year-old legacy industrial business move from phone-and-paper ordering into e-commerce, content, analytics, and operational workflow systems.",
    role: "Technical Project Manager & Web Systems Lead",
    years: "2012-Present",
    status: "Full case study",
    featured: true,
    priority: 1,
    visibility: "public-safe",
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
    links: [
      { label: "Website", url: "https://www.harryepstein.com/" },
      {
        label: "2009 online-store coverage",
        url: "https://toolguyd.com/harry-epstein-launches-new-online-store/"
      },
      {
        label: "KCUR profile",
        url: "https://www.kcur.org/show/central-standard/2016-04-21/how-flying-dolphins-kept-this-old-school-kansas-city-hardware-store-alive"
      }
    ],
    careNote:
      "No private analytics dashboards, revenue details, passwords, customer data, vendor information, or internal operational materials are published.",
    sourceLayer:
      "Public website, public-safe summary, approved screenshots pending, public reporting on online-sales share, and private materials intentionally omitted.",
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
      "Coverage of the online-store launch noted that previous orders had to be called in",
      "Public reporting later described online sales as roughly half the business by 2016",
      "Stakeholder translation across technical and nontechnical contexts"
    ],
    knownOpenProtected: {
      known:
        "Jamie contributed long-term web, e-commerce, analytics, marketing, content, and operations improvements for an 80+ year-old legacy business whose online sales were later reported as roughly half the business.",
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
    subtitle: "NYC Artist Coalition fieldwork and campaign memory systems",
    summary:
      "Helped cultural-space and small-business affordability work become documented, source-backed, consent-aware, and usable across Fair Rent NYC, NYC Artist Coalition, CRS, and aligned partner contexts.",
    role: "Cultural-Space Fieldworker & Coalition Infrastructure Support",
    years: "2024-Present",
    status: "Full case study",
    featured: true,
    priority: 2,
    visibility: "public-safe",
    whatWasUnclear:
      "The work involved cultural spaces, small businesses, public/private source materials, legal and policy questions, city/state strategy lanes, shifting meetings, and sensitive coalition context that could easily become fragmented or overexposed.",
    whatBecameUsable:
      "Running minutes, next-step trackers, decision records, source maps, legal/policy question logs, public-data framing, consent-aware field follow-up, public-safe explanations, and shared campaign documentation.",
    artifactTypes: ["source map", "meeting memory", "decision record", "public handout", "workflow"],
    artifacts: [
      {
        title: "Campaign documentation spine",
        description:
          "A shared documentation structure for meetings, next steps, decision context, public-safe continuity, and no-surprises coordination.",
        type: "meeting memory"
      },
      {
        title: "Source map",
        description:
          "A structured way to separate public sources, private notes, open questions, and materials that require review.",
        type: "source map"
      },
      {
        title: "Cultural-space follow-up workflow",
        description:
          "A consent-aware fieldwork pattern for moving from events and conversations to clear ownership, source context, and appropriate next steps.",
        type: "workflow"
      }
    ],
    tags: [
      "Civic Technology",
      "Knowledge Systems",
      "Documentation",
      "Product Operations",
      "Source-Backed Memory",
      "Public-Facing Tools",
      "Cultural Infrastructure"
    ],
    capabilities: [
      "Meeting Synthesis",
      "Source Mapping",
      "Action Tracking",
      "Public Guidance",
      "Decision Records",
      "Consent-Aware Follow-Up"
    ],
    links: [
      { label: "NYC Artist Coalition", url: "https://nycartc.com/contact/" },
      { label: "NYC Artist Coalition priorities", url: "https://nycartc.com/priorities/" },
      { label: "Let NYC Dance / Cabaret Law repeal", url: "https://nycartc.com/letnycdance/" },
      { label: "Fair Rent NYC", url: "https://fairrentnyc.nycartc.com/" }
    ],
    careNote:
      "Public-safe summary of collective civic and coalition work. This page does not publish private notes, legal-review materials, stakeholder lists, raw strategy documents, or unapproved internal materials.",
    sourceLayer:
      "Public NYC Artist Coalition and Fair Rent NYC pages, public campaign materials where approved, public-safe meeting memory summaries, private/redacted coalition context, and collaborator review still required for named materials.",
    credits: ["Jamie Burkart", "NYC Artist Coalition collaborators", "Fair Rent NYC collaborators", "Commercial Rent Stabilization advocates"],
    publicSafety: {
      note: "Collective-work language is required: participated in, contributed to, helped structure, stewarded, supported, and translated."
    },
    currentStatus: "Active public-safe summary. Current-work details are time-bound and collaborator/material approvals are still required before adding named private evidence.",
    group: "Civic and public-facing systems",
    roleFit:
      "Civic delivery, product operations, documentation architecture, source-backed memory, public guidance, and implementation support.",
    evidence: [
      "NYC Artist Coalition public mission and priorities around informal and affordable community spaces",
      "Cabaret Law repeal participation as collective advocacy, not sole-credit proof",
      "Shared campaign documentation and coordination infrastructure",
      "Running minutes, decision records, next-step trackers, and source maps",
      "Legal/policy questions organized for collaborators",
      "Public-data framing, consent-aware follow-up, and stakeholder next steps"
    ],
    knownOpenProtected: {
      known:
        "Jamie participates as a cultural-space fieldworker and coalition infrastructure support, helping structure public-safe campaign documentation, source maps, data framing, and consent-aware follow-up systems.",
      open:
        "Which current-work details, specific public artifacts, collaborators, meeting materials, and screenshots may be named or shown requires approval.",
      protected:
        "Private coalition notes, legal-review materials, stakeholder lists, raw strategy context, private emails, unapproved quotes, and venue-level lease or landlord details are omitted."
    }
  },
  {
    title: "CallNYC.org",
    slug: "callnyc",
    series: "Civic Prototype",
    subtitle: "Civic data to resident-facing guidance",
    summary:
      "Built a civic-data prototype translating constituent-services open data into resident-facing guidance so people could more easily understand an issue category, civic context, and possible next step.",
    role: "Civic-Tech Builder & Product Translator",
    years: "2014-2015",
    status: "Full case study",
    featured: true,
    priority: 3,
    visibility: "public-safe",
    whatWasUnclear:
      "Constituent-services open data existed, but residents needed a clearer public-facing pathway from issue category to relevant civic office, district context, or next step.",
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
      "Co-built a Python / Django + Ember.js community-calendar platform that helped local arts and music communities publish, distribute, and follow events through keyword-based community calendars and low-cost web infrastructure.",
    role: "Co-builder & Product Operator",
    years: "2010s",
    status: "Short proof page",
    featured: true,
    priority: 4,
    visibility: "public-safe",
    whatWasUnclear:
      "DIY organizers, local calendar editors, and community publishers needed low-overhead ways to distribute events and maintain community visibility without relying on one centralized editorial calendar.",
    whatBecameUsable:
      "A followable keyword-community platform with event distribution workflows and organizer-facing publishing patterns.",
    artifactTypes: ["website", "workflow", "prototype"],
    artifacts: [
      {
        title: "Keyword-community model",
        description:
          "A low-overhead distribution pattern for followable arts, music, and local-interest communities.",
        type: "diagram"
      }
    ],
    tags: ["Community Systems", "Web Systems", "Product Operations", "Public-Facing Tools"],
    capabilities: ["Django", "Ember.js", "Community Platform Design", "Event Workflows"],
    careNote:
      "Historical proof page. Claims should avoid overreading adoption beyond public-safe estimates.",
    sourceLayer:
      "Public-safe summary, historical project context, and screenshots pending Jamie approval.",
    credits: ["Jamie Burkart", "WOWList collaborators"],
    currentStatus: "Historical short proof page.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community systems, product operations, public-facing platforms, local calendar publishing, and event distribution workflows.",
    evidence: [
      "Python / Django + Ember.js platform",
      "Followable keyword communities",
      "Local calendar organizer and editor workflows",
      "City-based arts and music communities reached"
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
      "Created repeatable hosting, onboarding, RSVP, attendance, facilitation, documentation, and continuity systems that helped visiting and local artists find a foothold in New York cultural life.",
    role: "Host, Organizer & Systems Steward",
    years: "2012-2021",
    status: "Short proof page",
    featured: true,
    priority: 5,
    visibility: "summary-only",
    whatWasUnclear:
      "A recurring cultural space needed trust-building routines, invitations, hospitality, artist support, and continuity without turning private community records into public spectacle.",
    whatBecameUsable:
      "Repeatable participation infrastructure for 300+ dated gatherings, resident artists, onboarding, hospitality, documentation, facilitation, and continuity handoffs.",
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
      "Public-safe aggregate summary from a private RSVP/attendance workbook and Jamie-reviewed private archive evidence. Raw records, names, contact details, and unapproved images are intentionally omitted.",
    credits: ["Jamie Burkart", "196 / Sunday Dinner community"],
    currentStatus: "Public-safe summary only.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community operations, onboarding, facilitation, documentation, trust-building systems, and continuity planning.",
    evidence: [
      "Recurring gathering systems",
      "Private workbook documents 346 unique dated gathering records from 2012 to 2021",
      "RSVP and attendance fields include yes/no, attended, did not attend, rates, scores, and total possible attendance",
      "Resident-artist support systems",
      "20+ resident-artist participation supported by Jamie-reviewed private archive evidence",
      "Onboarding and participation systems",
      "Recurring operations and continuity structures"
    ],
    knownOpenProtected: {
      known:
        "Jamie created and sustained participation infrastructure across 300+ recurring gatherings and resident-artist contexts, supported by aggregate workbook and Jamie-reviewed archive evidence.",
      open:
        "Named participants, photos, residency artifacts, and any specific attendance examples require consent and approval.",
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
      "Translated a long-vacant historic building into a public-benefit redevelopment plan; public records show a $490,539 CCED funding recommendation for the KC Town Hall project.",
    role: "Project Planning & Public-Benefit Documentation Lead",
    years: "2020s",
    status: "Short proof page",
    featured: false,
    priority: 6,
    visibility: "public-safe",
    whatWasUnclear:
      "A long-vacant historic building involved public benefit, preservation, funding, stakeholder, and redevelopment questions that needed durable documentation.",
    whatBecameUsable:
      "Planning materials, public-benefit documentation, funding context, and stakeholder coordination materials that supported a public-record funding recommendation.",
    artifactTypes: ["guide", "source map", "template", "public handout"],
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
    links: [
      {
        label: "Kansas City public record",
        url: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=44A50FFC-321A-41C7-9A86-6ADD9083B156&ID=5515936&Options=&Search="
      }
    ],
    careNote:
      "Public-safe short proof page. Private financial, legal, property, and stakeholder details are omitted.",
    sourceLayer:
      "Public Kansas City legislative record, public-safe summary, and approved public materials pending.",
    credits: ["Jamie Burkart", "KC Town Hall LLC collaborators"],
    currentStatus: "Public-safe short proof page.",
    group: "Operating systems for teams",
    roleFit:
      "Long-horizon project management, public-benefit documentation, stakeholder coordination, and implementation support.",
    evidence: [
      "Redevelopment planning support",
      "Public-benefit documentation",
      "Historic preservation context",
      "Public record shows a $490,539 Central City Economic Development funding recommendation for the KC Town Hall project",
      "Funding process support"
    ],
    knownOpenProtected: {
      known:
        "Jamie supported adaptive reuse planning and public-benefit documentation for a long-vacant historic building; public records show a $490,539 CCED funding recommendation for the KC Town Hall project.",
      open:
        "Named partners beyond public records, project-status details, and private funding materials need approval.",
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
