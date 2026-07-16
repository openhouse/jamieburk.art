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
          sourceUrl: z.string().refine(
            (value) => value.startsWith("/") || URL.canParse(value),
            "Expected an absolute URL or a root-relative public asset path",
          ),
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
            "Public storefront capture, July 2026. The maintained customer surface brings catalog filters, product detail, pricing, cart actions, and the company's distinctive voice into one usable experience.",
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
        "A dated storefront capture and approved contribution claim document the public customer surface and the work's relationship to online growth.",
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
      "fair-rent-public-data-pilot",
      "nyc-artist-coalition-public-web-infrastructure",
      "nyc-artist-coalition-civic-systems",
      "nyc-artist-coalition-participation-system"
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
      },
      {
        title: "Privacy-preserving commercial-data pilot",
        description:
          "A two-page public handout turns a broad vacancy and lease-cost question into a bounded RPIE-derived data-product proposal with explicit privacy and publication safeguards.",
        type: "public handout",
        asset: {
          src: "/artifacts/fair-rent-nyc/toward-a-fuller-public-baseline.png",
          width: 1275,
          height: 1650,
          alt: "First page of Jamie Burkart's public handout proposing privacy-preserving commercial vacancy and lease-cost indicators derived from aggregated RPIE filings.",
          caption:
            "Jamie-authored School of Data handout, March 27, 2026. The document turns a broad policy question into a proposed indicator table, coverage and suppression table, methods note, and confidentiality boundary.",
          sourceUrl: "/artifacts/fair-rent-nyc/toward-a-fuller-public-baseline.pdf",
          capturedAt: "2026-03-27",
          evidenceScope: "direct",
          rightsStatus: "approved"
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
      "A shared running-memory system connecting recurring meetings to decisions, owners, open questions, consent boundaries, and reusable templates",
      "A privacy-aware stakeholder tracker connecting outreach lanes and asks to ownership, due dates, consent, and data-quality flags",
      "A multilingual alignment record connecting facilitation to action items, governance questions, and public-share boundaries",
      "A legislative provenance redline tracing public policy source layers through S8319",
      "A public, privacy-preserving commercial-data pilot proposal",
      "Public campaign websites for NYC Artist Coalition advocacy",
      "Legal/policy questions organized for collaborators",
      "Public-data framing and stakeholder next steps"
    ],
    knownOpenProtected: {
      known:
        "Public artifacts and protected operating records substantiate the web, testimony, data-product, stakeholder-tracking, and meeting-documentation work described in this case study.",
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
        "Politico's coverage and the public repository corroborate the independent build; the dated prototype capture shows the issue-first interface.",
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
      "Jamie co-built a Django / PostgreSQL / PostGIS and Ember community-calendar platform for DIY arts and music organizers, with activity across roughly 35 city ecosystems.",
    role: "Co-builder & Product Operator",
    years: "2010s-2020s",
    status: "Short proof page",
    featured: true,
    priority: 4,
    visibility: "public-safe",
    proofBankIds: ["wowlist-community-platform"],
    whatWasUnclear:
      "DIY organizers needed lightweight ways to distribute events and maintain community visibility across scenes without relying on one centralized editorial calendar.",
    whatBecameUsable:
      "A followable keyword-community platform with event distribution workflows and organizer-facing publishing patterns.",
    artifactTypes: ["website"],
    artifacts: [
      {
        title: "Archived WOW List home page",
        description:
          "The May 2017 public interface presented WOW List as a simple way to find and share things to do in real life.",
        type: "website",
        asset: {
          src: "/artifacts/wowlist/archived-home-2017.png",
          width: 1440,
          height: 934,
          alt: "Archived WOW List home page with the hand-painted project mark, people gathered around a table, device drawings, and find-and-share product language.",
          caption:
            "Archived May 2017 home page. The interface pairs WOW List's hand-made visual identity with a direct promise to help people find and share things to do in real life.",
          sourceUrl: "https://web.archive.org/web/20170512190157/https://wowlist.org/",
          capturedAt: "2017-05-12",
          evidenceScope: "direct",
          rightsStatus: "public-web-capture"
        }
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
      "Historical proof page. Public-use signals do not by themselves measure total adoption or impact.",
    credits: ["Jamie Burkart", "WOWList collaborators"],
    currentStatus: "Historical short proof page.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community systems, product operations, public-facing platforms, and event distribution workflows.",
    evidence: [
      "Django / PostgreSQL / PostGIS and Ember platform",
      "Followable keyword communities",
      "Organizer-facing distribution workflows",
      "Public evidence of organizer use and community-created onboarding",
      "Peer attribution of Jamie's maker role",
      "The project's public event-sharing and community-building mission language",
      "Public-safe aggregate records support 1,800+ users and 16,000+ posts/events",
      "Activity across roughly 35 city ecosystems"
    ],
    knownOpenProtected: {
      known:
        "The cited organizer, peer, aggregate, and public mission records establish the four public claims above.",
      open:
        "The @WOWListNYC to @wowlist handle lineage and use beyond the documented records remain unresolved.",
      protected:
        "Private community records are not published."
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
      "Public-safe summary, a surviving public RSVP page, and protected source relationships for residency onboarding and recurring-event operations; raw records remain omitted.",
    credits: ["Jamie Burkart", "196 / Sunday Dinner community"],
    currentStatus: "Public-safe summary only.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community operations, onboarding, facilitation, documentation, trust-building systems, and continuity planning.",
    evidence: [
      "300+ hosted gatherings",
      "20+ resident artists supported",
      "A documented residency workflow covering acceptance, pre-arrival coordination, space configuration, and independent access",
      "A recurring invitation and continuity system covering event themes, invitations, replies, attendance signals, and follow-up",
      "Public event records identifying the 100th gathering in 2014 and the 200th in 2016, with Julia Fredenburg and Jamie Burkart displayed as organizers of the latter"
    ],
    knownOpenProtected: {
      known:
        "Jamie created and sustained participation infrastructure across recurring gatherings and artist-residency contexts; protected operating records document onboarding and continuity workflows, while public event metadata records 100th and 200th milestones and shared stewardship.",
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
    subtitle: "Proposed adaptive reuse, neighborhood operations, and public-benefit documentation",
    summary: [
      getClaimProjection(
        "CLM-KC-TOWN-HALL-PLANNING-DOCUMENTATION-ROLE",
        "work-card",
        "/work"
      ).text,
      "Built resident-input and neighborhood-service workflows alongside the public funding process.",
      getClaimProjection(
        "CLM-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION",
        "work-card",
        "/work"
      ).text
    ].join(" "),
    role: "Co-founder, Project Operations & Documentation",
    years: "2018-2024",
    status: "Short proof page",
    featured: false,
    priority: 6,
    visibility: "public-safe",
    proofBankIds: ["kc-town-hall-public-benefit-documentation"],
    whatWasUnclear:
      "A long-vacant historic building involved public benefit, preservation, funding, stakeholder, and redevelopment questions that needed durable documentation.",
    whatBecameUsable:
      "A reviewable mixed-use proposal, resident-input loop, recurring neighborhood-service workflow, public-benefit case, municipal funding record, and documented stewardship transition.",
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
      },
      {
        label: "KC Town Hall public account",
        url: "https://x.com/KCTownHall"
      },
      {
        label: "Archived Tired of Tires workflow",
        url: "https://web.archive.org/web/20201030223311/http://kctownhall.com/tires/"
      }
    ],
    careNote:
      "Public-safe short proof page. Private financial, legal, property, and stakeholder details are omitted.",
    sourceLayer:
      "Official Kansas City public meeting and legislation records plus Jamie's public-use confirmation of the later transition, with private project records omitted.",
    credits: ["Jamie Burkart", "KC Town Hall LLC collaborators"],
    currentStatus:
      "Archived proof of a proposed rehabilitation that did not proceed under its public award; the planning record and later stewardship transition remain documented.",
    group: "Operating systems for teams",
    roleFit:
      "Long-horizon project management, neighborhood operations, service-intake design, public-benefit documentation, stakeholder coordination, and implementation support.",
    evidence: [
      "Redevelopment planning",
      "Public-benefit documentation",
      "Jamie identified as the public proposal presenter",
      "Council acceptance of the $490,539 recommendation",
      "$490,539 project appropriation",
      "A public-safe review of all 183 records currently displayed by the project-account profile",
      "100 tire-related account records documenting recurring household pickup intake and updates",
      "Direct mission-relevant responses from three sitting Council-member accounts",
      "External qualitative corroboration of a KC Town Hall tire drop-off",
      "2024 withdrawal and reappropriation record",
      "Jamie-confirmed transition to a mission-aligned organization"
    ],
    knownOpenProtected: {
      known:
        "Official municipal records document Jamie's presenter role and the proposal's review sequence. The complete displayed account population supports bounded resident-input, recurring neighborhood-service, civic-resource, and stakeholder-response patterns; Jamie confirms the later stewardship transition.",
      open:
        "The records do not establish an executed funding agreement, disbursement, construction, every collaborator's role, the receiving organization's identity, the form or timing of the transition, or the project's current status.",
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
