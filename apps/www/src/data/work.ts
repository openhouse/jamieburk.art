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
  whatWasUnclear: z.string(),
  whatBecameUsable: z.string(),
  artifactTypes: z.array(artifactTypeSchema),
  artifacts: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      type: artifactTypeSchema,
      asset: z
        .object({
          src: z.string().startsWith("/artifacts/"),
          width: z.number().int().positive(),
          height: z.number().int().positive(),
          alt: z.string().min(20),
          caption: z.string().min(20),
          sourceUrl: z.string().url(),
          capturedAt: z.string(),
          evidenceScope: z.enum(["direct", "contextual", "representative"]),
          rightsStatus: z.enum(["public-web-capture", "approved"])
        })
        .optional()
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
        title: "Public e-commerce storefront",
        description:
          "The public New Items collection shows the customer-facing catalog, filters, product cards, pricing, cart actions, and brand voice working as one maintained storefront.",
        type: "public-safe screenshot",
        asset: {
          src: "/artifacts/hje/public-storefront.png",
          width: 1425,
          height: 891,
          alt: "Harry J. Epstein Company New Items storefront with category filters, product cards, prices, cart actions, and hand-drawn brand artwork.",
          caption:
            "Public storefront capture, July 2026. It directly documents the maintained customer-facing catalog and distinctive public voice; it does not expose private analytics, orders, or revenue data.",
          sourceUrl: "https://www.harryepstein.com/collections/new-items",
          capturedAt: "2026-07-12",
          evidenceScope: "direct",
          rightsStatus: "public-web-capture"
        }
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
      "Public website, dated public-site capture, public-safe summary, resume-backed impact claims, and private materials intentionally omitted.",
    credits: ["Jamie Burkart", "Harry J. Epstein Company team"],
    publicSafety: {
      note: "Use only public-safe claims and approved screenshots. Treat metrics as contribution language unless Jamie approves more precise wording."
    },
    currentStatus: "Public-safe full case study with a dated public-site capture.",
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
        "A dated public storefront capture documents the maintained customer-facing catalog and distinctive public voice.",
      open:
        "Additional screenshots, internal workflow diagrams, and more detailed impact evidence require separate review before publication.",
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
      "Co-founded NYC Artist Coalition and built public-facing civic systems, campaign websites, coalition memory, source maps, and coordination infrastructure for cultural-space advocacy, FairRentNYC, Commercial Rent Stabilization, and storefront stability.",
    role: "Co-Founder, Civic Systems, Coalition Operations & Policy Communications Lead",
    years: "2017-Present",
    status: "Full case study",
    featured: true,
    priority: 2,
    visibility: "public-safe",
    proofBankIds: [
      "fair-rent-campaign-memory",
      "fair-rent-source-map",
      "nyc-artist-coalition-public-web-infrastructure",
      "nyc-artist-coalition-civic-systems"
    ],
    whatWasUnclear:
      "The work involved many stakeholders, public/private source materials, legal and policy questions, city/state strategy lanes, shifting meetings, and sensitive coalition context that could easily become fragmented or overexposed.",
    whatBecameUsable:
      "Running minutes, action trackers, source maps, legal/policy question logs, public-data framing, stakeholder follow-up notes, public-safe explanations, public campaign websites, and shared campaign memory.",
    artifactTypes: ["website", "source map", "meeting memory", "decision record", "public handout"],
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
        title: "Public campaign web surfaces",
        description:
          "Public-safe website infrastructure for NYC Artist Coalition advocacy, FairRentNYC, Talks Not Raids, and Let NYC Dance.",
        type: "public-safe screenshot",
        asset: {
          src: "/artifacts/fair-rent-nyc/public-campaign-site.png",
          width: 1425,
          height: 891,
          alt: "Fair Rent NYC public explainer page with campaign navigation and plain-language Commercial Rent Stabilization information.",
          caption:
            "Public FairRentNYC explainer capture, July 2026. It directly documents a campaign information surface and plain-language policy communication; it does not establish sole authorship or individual policy outcomes.",
          sourceUrl: "https://fairrentnyc.nycartc.com/what-is-commercial-rent-stabilization/",
          capturedAt: "2026-07-12",
          evidenceScope: "direct",
          rightsStatus: "public-web-capture"
        }
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
      "Public Guidance",
      "Decision Records"
    ],
    links: [
      { label: "NYC Artist Coalition", url: "https://nycartc.com/" },
      { label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" },
      { label: "Talks Not Raids", url: "https://talksnotraids.com/" },
      { label: "Let NYC Dance", url: "https://letnycdance.nycartc.com/" }
    ],
    careNote:
      "Public-safe summary of collective civic and coalition work. This page does not publish private notes, legal-review materials, stakeholder lists, raw strategy documents, or unapproved internal materials.",
    sourceLayer:
      "Public sources, public campaign materials where approved, meeting memory summaries, private/redacted coalition context, and collaborator review still required for named materials.",
    credits: ["Jamie Burkart", "NYC Artist Coalition collaborators", "Commercial Rent Stabilization advocates"],
    publicSafety: {
      note: "Collective-work language is required: contributed to, helped structure, stewarded, supported, and translated."
    },
    currentStatus: "Active public-safe summary with a dated public campaign-site capture. Additional collaborator materials remain approval-gated.",
    group: "Civic and public-facing systems",
    roleFit:
      "Civic delivery, coalition operations, product operations, documentation architecture, source-backed memory, public guidance, policy communications, and implementation support.",
    evidence: [
      "Co-founder role in NYC Artist Coalition",
      "Civic systems, coalition operations, and policy-communications infrastructure",
      "Campaign materials around Cabaret Law repeal, Office of Nightlife creation, nightlife enforcement reporting, Commercial Rent Stabilization, and storefront stability",
      "30+ pages of shared campaign-memory infrastructure",
      "Running minutes, decision records, action trackers, and source maps",
      "Public campaign websites for NYC Artist Coalition advocacy",
      "Legal/policy questions organized for collaborators",
      "Public-data framing and stakeholder next steps"
    ],
    knownOpenProtected: {
      known:
        "A dated FairRentNYC capture documents a public campaign surface, and an official 2018 Council transcript documents Jamie's testimony as a coalition member.",
      open:
        "Additional named collaborators, meeting materials, photographs, and internal campaign artifacts require separate approval.",
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
        type: "public-safe screenshot",
        asset: {
          src: "/artifacts/callnyc/public-prototype.png",
          width: 1185,
          height: 375,
          alt: "Archived CallNYC interface with an issue navigation list, search field, resident-facing explanation, and visible archived-project disclaimer.",
          caption:
            "Public archived-prototype capture, July 2026. It directly documents the issue-first navigation and resident-facing framing.",
          sourceUrl: "https://callnyc.org/",
          capturedAt: "2026-07-12",
          evidenceScope: "direct",
          rightsStatus: "public-web-capture"
        }
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
      "CouncilStat / constituent-services open data, archived project context, verified Politico New York coverage, public GitHub repository, and a dated public prototype capture.",
    credits: ["Jamie Burkart", "Civic-data collaborators"],
    publicSafety: {
      note: "This page must make the archived and unofficial status visible wherever the project is summarized."
    },
    currentStatus: "Archived prototype with a dated public-site capture.",
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
        "Politico's 2016 coverage, the public source repository, and a dated prototype capture document the independent project and its surviving interface.",
      open:
        "No dedicated Civic Hall event page, complete agenda, registration form, or participant roster has been recovered.",
      protected:
        "A participant photograph remains withheld pending photographer credit, rights review, and subject-consent review."
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
    proofBankIds: ["sunday-dinner-196-participation-infrastructure"],
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
      "Public-safe summary, approved public materials pending, and private records intentionally omitted.",
    credits: ["Jamie Burkart", "196 / Sunday Dinner community"],
    currentStatus: "Public-safe summary only.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community operations, onboarding, facilitation, documentation, trust-building systems, and continuity planning.",
    evidence: [
      "300+ hosted gatherings",
      "20+ resident artists supported",
      "Onboarding and participation systems",
      "Recurring operations and continuity structures"
    ],
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
    subtitle: "Proposed adaptive reuse and public-benefit documentation",
    summary: [
      getClaimProjection(
        "CLM-KC-TOWN-HALL-PLANNING-DOCUMENTATION-ROLE",
        "work-card",
        "/work"
      ).text,
      getClaimProjection("CLM-KC-TOWN-HALL-PROPOSAL-2019", "work-card", "/work").text,
      getClaimProjection(
        "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019",
        "work-card",
        "/work"
      ).text,
      getClaimProjection("CLM-KC-TOWN-HALL-WITHDRAWN-2024", "work-card", "/work").text
    ].join(" "),
    role: "Project Planning & Documentation Support",
    years: "2019-2024",
    status: "Short proof page",
    featured: false,
    priority: 6,
    visibility: "public-safe",
    proofBankIds: ["kc-town-hall-public-benefit-documentation"],
    whatWasUnclear:
      "A long-vacant historic building involved public benefit, preservation, funding, stakeholder, and redevelopment questions that needed durable documentation.",
    whatBecameUsable:
      "A reviewable mixed-use proposal, public-benefit case, stakeholder context, and municipal funding record, with the later withdrawal clearly documented.",
    artifactTypes: ["guide", "source map", "template"],
    artifacts: [
      {
        title: "Public-benefit documentation set",
        description:
          "Planning materials and public records describing the proposed use, intended public value, funding context, and later project status.",
        type: "guide"
      }
    ],
    tags: ["Implementation", "Documentation", "Knowledge Systems", "Public-Facing Tools"],
    capabilities: ["Stakeholder Documentation", "Funding Support", "Historic Preservation Context"],
    links: [
      {
        label: "2019 CCED public minutes",
        url: "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000"
      },
      {
        label: "2019 Council resolution",
        url: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=44A50FFC-321A-41C7-9A86-6ADD9083B156&ID=5515936&Options=&Search="
      },
      {
        label: "2019 appropriation ordinance",
        url: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=B387009F-F7F7-454D-950A-E44588056314&ID=5515929&Options=&Search="
      },
      {
        label: "2024 withdrawal ordinance",
        url: "https://clerk.kcmo.gov/LegislationDetail.aspx?GUID=E3F31A7F-65F8-464E-ABD4-197DEB6D80C8&ID=6586846&Options=&Search="
      }
    ],
    careNote:
      "Public-safe short proof page. Private financial, legal, property, and stakeholder details are omitted.",
    sourceLayer:
      "Official Kansas City public meeting and legislation records, with private project records omitted.",
    credits: ["Jamie Burkart", "KC Town Hall LLC collaborators"],
    currentStatus: "Project withdrawn in 2024; the unused public allocation was reappropriated.",
    group: "Operating systems for teams",
    roleFit:
      "Long-horizon project management, public-benefit documentation, stakeholder coordination, and implementation support.",
    evidence: [
      "Redevelopment planning",
      "Public-benefit documentation",
      "Jamie identified as the public proposal presenter",
      "Council acceptance of the $490,539 recommendation",
      "$490,539 project appropriation",
      "2024 withdrawal and reappropriation record"
    ],
    knownOpenProtected: {
      known:
        "Jamie's approved resume supports the planning and documentation role; official records support his presenter role, the $490,539 proposal, the Council's acceptance and appropriation, and the later withdrawal.",
      open:
        "The records do not establish an executed funding agreement, disbursement, construction, reasons for withdrawal, or every collaborator's role.",
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
