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
      "Contributed to 2x revenue growth while helping an 80+ year-old legacy industrial business modernize e-commerce, analytics, marketing, content, and operations.",
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
      { label: "Harry J. Epstein Company", url: "https://www.harryepstein.com/" },
      {
        label: "ToolGuyd: online store launch",
        url: "https://toolguyd.com/harry-epstein-launches-new-online-store/"
      },
      {
        label: "KCUR: online sales context",
        url: "https://www.kcur.org/show/central-standard/2016-04-21/how-flying-dolphins-kept-this-old-school-kansas-city-hardware-store-alive"
      }
    ],
    careNote:
      "No private analytics dashboards, revenue details, passwords, customer data, vendor information, or internal operational materials are published.",
    sourceLayer:
      "Public website, public-safe summary, resume-backed impact claims, representative artifacts, and private materials intentionally omitted.",
    credits: ["Jamie Burkart", "Harry J. Epstein Company team"],
    publicSafety: {
      note: "Use only public-safe claims and approved screenshots. Treat metrics as contribution language unless Jamie approves more precise wording."
    },
    currentStatus: "Public-safe full case study. Private source material and unreviewed screenshots are not shown.",
    group: "Operating systems for teams",
    roleFit:
      "Technical operations, product operations, implementation, business analysis, documentation, and small-business web systems.",
    evidence: [
      "Web, e-commerce, marketing, content, and analytics systems",
      "Operations workflow improvements and long-term systems stewardship",
      "Contributed to 2x revenue growth while keeping causal language careful",
      "Stakeholder translation across technical and nontechnical contexts"
    ],
    knownOpenProtected: {
      known:
        "Jamie contributed long-term web, e-commerce, analytics, marketing, content, and operations improvements for an 80+ year-old legacy business.",
      open:
        "Specific screenshots, internal workflow diagrams, and detailed revenue breakdowns require separate review before they are shown publicly.",
      protected:
        "Private dashboards, credentials, customer data, internal revenue detail, vendor terms, and sensitive operating practices stay offline."
    }
  },
  {
    title: "FairRentNYC / Commercial Rent Stabilization",
    slug: "fair-rent-nyc",
    series: "Civic Documentation",
    subtitle: "Coalition memory and civic documentation systems",
    summary:
      "Built and stewarded shared civic operating memory for Commercial Rent Stabilization collaboration: running minutes, action trackers, source maps, public-data framing, and review lanes.",
    role: "Documentation Systems Lead & Coalition Operations Support",
    years: "2024-Present",
    status: "Full case study",
    featured: true,
    priority: 2,
    visibility: "public-safe",
    whatWasUnclear:
      "The work involved many stakeholders, public/private source materials, legal and policy questions, city/state strategy lanes, shifting meetings, and sensitive coalition context that could easily become fragmented or overexposed.",
    whatBecameUsable:
      "Running minutes, action trackers, source maps, legal and policy question logs, public-data framing, stakeholder follow-up notes, public-safe explanations, and shared operating memory so collaborators could orient, coordinate, and continue the work.",
    artifactTypes: ["source map", "meeting memory", "decision record", "public handout"],
    artifacts: [
      {
        title: "Shared operating-memory spine",
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
      "Public-safe summary of collective civic and coalition work. Not legal advice. This page does not publish private notes, legal-review materials, stakeholder lists, raw strategy documents, or unreviewed internal materials.",
    sourceLayer:
      "Public sources, public campaign materials where appropriate, meeting-memory summaries, private/redacted coalition context, and named materials that require separate review before publication.",
    credits: ["Jamie Burkart", "NYC Artist Coalition collaborators", "Commercial Rent Stabilization advocates"],
    publicSafety: {
      note: "Collective-work language is required: contributed to, helped structure, stewarded, supported, and translated."
    },
    currentStatus: "Active public-safe summary. Private coalition context and unreviewed materials are not shown.",
    group: "Civic and public-facing systems",
    roleFit:
      "Civic delivery, product operations, documentation architecture, source-backed memory, public guidance, and implementation support.",
    evidence: [
      "30+ pages of shared civic operating-memory infrastructure",
      "Running minutes, decision records, action trackers, and source maps",
      "Legal/policy questions organized for collaborators",
      "Public-data framing and stakeholder next steps"
    ],
    knownOpenProtected: {
      known:
        "Jamie helped structure and steward public-safe operating memory, coordination documents, source maps, and follow-up systems.",
      open:
        "Which specific public artifacts, collaborators, meeting materials, and screenshots may be named or shown requires separate review.",
      protected:
        "Private coalition notes, legal-review materials, stakeholder lists, raw strategy context, private emails, and unapproved quotes are omitted."
    }
  },
  {
    title: "NYC Artist Coalition Campaign Infrastructure",
    slug: "nyc-artist-coalition",
    series: "Civic Campaign Infrastructure",
    subtitle: "Identity and public campaign websites for cultural-space advocacy",
    summary:
      "Co-founded NYC Artist Coalition; designed its visual identity and built public campaign websites for NYCArtC, Let NYC Dance, Save NYC Spaces, Talks Not Raids, and FairRentNYC.",
    role: "Co-founding Member & Campaign Web Systems Lead",
    years: "2017-Present",
    status: "Short proof page",
    featured: true,
    priority: 2.5,
    visibility: "public-safe",
    whatWasUnclear:
      "Artist-led and community cultural spaces needed public-facing campaign surfaces that could make safety, enforcement, support, and displacement issues understandable without exposing private coalition context.",
    whatBecameUsable:
      "A shared visual identity and a set of public campaign websites with calls to action, coalition framing, press links, public resources, progress markers, and issue explanations.",
    artifactTypes: ["website", "guide", "public handout", "press"],
    artifacts: [
      {
        title: "Coalition identity and campaign sites",
        description:
          "Logo and public web surfaces for NYC Artist Coalition and related campaign efforts.",
        type: "website"
      },
      {
        title: "Public calls to action",
        description:
          "Issue pages that translated cultural-space advocacy into resident-facing and council-facing asks.",
        type: "guide"
      },
      {
        title: "Campaign reference surfaces",
        description:
          "Public links, press references, coalition context, and progress markers that helped supporters understand the work.",
        type: "public handout"
      }
    ],
    tags: [
      "Civic Technology",
      "Campaign Infrastructure",
      "Information Architecture",
      "Web Systems",
      "Cultural Infrastructure",
      "Public-Facing Tools"
    ],
    capabilities: [
      "Identity Design",
      "Campaign Websites",
      "Calls to Action",
      "Public Guidance",
      "Coalition Documentation"
    ],
    links: [
      { label: "NYC Artist Coalition", url: "https://nycartc.com/" },
      { label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" },
      { label: "Talks Not Raids", url: "https://talksnotraids.com/" },
      { label: "Let NYC Dance", url: "https://letnycdance.nycartc.com/" },
      { label: "Save NYC Spaces", url: "https://savenycspaces.nycartc.com/" }
    ],
    careNote:
      "Public-safe summary of collective campaign work. The public sites are shown as campaign infrastructure; private coalition records, CMS/admin details, strategy notes, and unapproved collaborator material stay offline.",
    sourceLayer:
      "Public campaign websites, public-safe authorship summary, public campaign materials, and private coalition/source records intentionally omitted.",
    credits: [
      "Jamie Burkart",
      "NYC Artist Coalition collaborators",
      "Let NYC Dance, Save NYC Spaces, Talks Not Raids, and FairRentNYC campaign collaborators"
    ],
    publicSafety: {
      note: "Use collective-work language for policy outcomes. The individual claim is the identity and website infrastructure, not sole ownership of campaign wins."
    },
    currentStatus: "Public-safe short proof page. Private coalition materials are not shown.",
    group: "Civic and public-facing systems",
    roleFit:
      "Civic technology, campaign infrastructure, public-facing web systems, information architecture, documentation, and implementation support.",
    evidence: [
      "Co-founded NYC Artist Coalition",
      "Designed NYC Artist Coalition visual identity",
      "Built public campaign websites for NYCArtC, Let NYC Dance, Save NYC Spaces, Talks Not Raids, and FairRentNYC",
      "Translated cultural-space safety, support, enforcement, and displacement issues into public calls to action",
      "Maintained public-safe boundaries around private coalition context"
    ],
    knownOpenProtected: {
      known:
        "Jamie co-founded NYC Artist Coalition, designed its visual identity, and built public campaign websites for NAC and related cultural-space advocacy campaigns.",
      open:
        "Screenshots, design source files, CMS records, collaborator names, and detailed build history require separate review before publication.",
      protected:
        "Private coalition notes, strategy records, admin credentials, contact lists, raw source files, private correspondence, and unapproved collaborator details are omitted."
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
          "Politico New York covered CallNYC in 2016 as a website for exploring City Council constituent-services data.",
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
      "CouncilStat / constituent-services open data, archived project context, representative artifacts, and verified Politico New York coverage.",
    credits: ["Jamie Burkart", "Civic-data collaborators"],
    publicSafety: {
      note: "This page must make the archived and unofficial status visible wherever the project is summarized."
    },
    currentStatus: "Archived prototype. Not an official or current City Council service.",
    group: "Civic and public-facing systems",
    roleFit:
      "Civic technology, product translation, open-data workflows, resident guidance, and public-facing web systems.",
    evidence: [
      "Built after a New York City Council civic-data hackathon",
      "Translated CouncilStat / constituent-services open data",
      "Organized public issue pages and resident-facing guidance",
      "Covered by Politico New York in 2016"
    ],
    links: [
      {
        label: "Politico New York archived PDF",
        url: "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf"
      }
    ],
    knownOpenProtected: {
      known:
        "CallNYC translated civic open data into issue pathways and resident-facing guidance as an archived prototype, with Politico New York coverage from 2016.",
      open:
        "Screenshots and additional archive links require separate review before publication.",
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
      "Co-built a Django / PostgreSQL / PostGIS and Ember community-calendar platform organized around followable keyword communities and used across 35+ active city scenes.",
    role: "Co-builder & Product Operator",
    years: "2010s",
    status: "Short proof page",
    featured: true,
    priority: 4,
    visibility: "public-safe",
    whatWasUnclear:
      "DIY organizers needed lightweight ways to distribute events and maintain community visibility across scenes without relying on one centralized editorial calendar.",
    whatBecameUsable:
      "A followable keyword-community platform with event distribution workflows, organizer-facing publishing patterns, and adoption across 35+ active city scenes.",
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
    capabilities: ["Django", "PostgreSQL / PostGIS", "Ember.js", "Community Platform Design", "Event Workflows"],
    careNote:
      "Historical proof page. Claims should avoid overreading adoption beyond public-safe estimates.",
    sourceLayer:
      "Public-safe summary, historical project context, and representative artifacts. Private user and organizer records are not shown.",
    credits: ["Jamie Burkart", "WOWList collaborators"],
    currentStatus: "Historical short proof page.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community systems, product operations, public-facing platforms, and event distribution workflows.",
    evidence: [
      "Django / PostgreSQL / PostGIS and Ember platform",
      "Followable keyword communities",
      "Organizer-facing distribution workflows",
      "1,846 users, 16,142 posts/events, 23,864 lists/tags, 28,837 list follows, and 20,927 saved/starred events by July 2017",
      "35+ active city scenes, defined as city or region entries with at least 50 geocoded posts/events"
    ],
    knownOpenProtected: {
      known:
        "WOWList was a co-built community-calendar platform organized around followable keyword communities, with approved aggregate records supporting 35+ active city scenes.",
      open:
        "Screenshots and archive links require separate review.",
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
    whatWasUnclear:
      "A recurring cultural space needed trust-building routines, invitations, hospitality, artist support, and continuity without turning private community records into public spectacle.",
    whatBecameUsable:
      "Repeatable participation infrastructure for gatherings, resident artists, onboarding, facilitation, and handoffs.",
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
      "Public-safe summary, representative artifacts, and private records intentionally omitted.",
    credits: ["Jamie Burkart", "196 / Sunday Dinner community"],
    currentStatus: "Public-safe summary only.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community operations, onboarding, facilitation, documentation, trust-building systems, and continuity planning.",
    evidence: [
      "Repeatable hosting and continuity systems across 300+ Jamie-approved gatherings",
      "20+ resident artists supported",
      "Onboarding and participation systems",
      "Recurring operations and continuity structures"
    ],
    knownOpenProtected: {
      known:
        "Jamie created and sustained participation infrastructure across recurring gatherings and artist-residency contexts.",
      open:
        "Named participants, photos, and artifacts require consent and separate review.",
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
      "Co-led redevelopment planning and public-benefit documentation for adaptive reuse of a long-vacant building at 36th Street and Indiana Avenue into four commercial spaces and three homes.",
    role: "Project Planning & Documentation Support",
    years: "2020s",
    status: "Short proof page",
    featured: false,
    priority: 6,
    visibility: "public-safe",
    whatWasUnclear:
      "A long-vacant historic building involved public benefit, preservation, funding, stakeholder, and redevelopment questions that needed durable documentation.",
    whatBecameUsable:
      "Planning materials, public-benefit documentation, stakeholder context, and municipal-review support for an adaptive reuse effort with a $490,539 public-funding recommendation.",
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
      "Public-safe summary and representative artifacts. Private project details are not shown.",
    credits: ["Jamie Burkart", "KC Town Hall LLC collaborators"],
    currentStatus: "Public-safe short proof page.",
    group: "Operating systems for teams",
    roleFit:
      "Long-horizon project management, public-benefit documentation, stakeholder coordination, and implementation support.",
    evidence: [
      "Redevelopment planning",
      "Public-benefit documentation",
      "Historic preservation context",
      "$490,539 Central City Economic Development Tax Board funding recommendation in Kansas City File 190649"
    ],
    links: [
      {
        label: "Kansas City Legistar File 190649",
        url: "https://kansascity.legistar.com/LegislationDetail.aspx?ID=5515936&GUID=44A50FFC-321A-41C7-9A86-6ADD9083B156&G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&Options=&Search="
      }
    ],
    knownOpenProtected: {
      known:
        "Jamie co-led adaptive reuse planning and documentation for a long-vacant building, including municipal-review support and a $490,539 public-funding recommendation.",
      open:
        "Final funding, current property status, and named partner details require separate review before publication.",
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
  | "nyc-artist-coalition"
  | "wowlist";

export const featuredWork = workItems.filter((item) => item.featured);

export const workGroups = [
  "Operating systems for teams",
  "Civic and public-facing systems",
  "Community and cultural infrastructure",
  "Source-backed memory / AI lab",
  "Archived prototypes and older platforms"
] as const;
