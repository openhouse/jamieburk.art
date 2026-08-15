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
      media: z
        .object({
          src: z.string(),
          alt: z.string(),
          caption: z.string(),
          href: z.string(),
          sourceLabel: z.string(),
          fit: z.enum(["cover", "contain"]).optional()
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
      "Began this client relationship in 2009, formalized the work through Thick Arts LLC in 2012, and led web, e-commerce, analytics, content, marketing, and operational improvements through 2015.",
    role: "Technical Project Manager & Web Systems Lead",
    years: "2009-2015",
    status: "Full case study",
    featured: true,
    priority: 1,
    visibility: "public-safe",
    proofBankIds: [
      "hje-first-client-chronology",
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
        title: "Successor public website",
        description:
          "The company's live successor site provides present-day business context after the documented 2009-2015 engagement; it is not presented as Jamie's implementation or current maintenance work.",
        type: "public-safe screenshot",
        media: {
          src: "/artifacts/hje/public-site.png",
          alt: "Harry J. Epstein Company storefront showing navigation, product search, editorial artwork, video, and commerce controls.",
          caption:
            "Successor website captured July 2026. It provides current business context and is not evidence of Jamie's present stewardship.",
          href: "https://www.harryepstein.com/",
          sourceLabel: "Harry J. Epstein Company successor website"
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
      },
      {
        title: "Maintenance-to-handoff specimen",
        description:
          "A public-safe reconstruction shows how recurring questions became bounded requirements, incremental releases, verification, reusable patterns, and owned next actions.",
        type: "workflow"
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
      "Jamie's authorized first-party client chronology, New York Department of State entity data, public Archive.org storefront captures, the successor website as business context, public-safe summaries, resume-backed impact claims, and private materials intentionally omitted.",
    credits: ["Jamie Burkart", "Harry J. Epstein Company team"],
    publicSafety: {
      note: "Use only public-safe claims and approved screenshots. Treat metrics as contribution language unless Jamie approves more precise wording."
    },
    currentStatus:
      "Historical 2009-2015 client-engagement case study; the successor website is linked only for current business context.",
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
        "Internal workflow diagrams and detailed revenue breakdowns require separate review before publication.",
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
      "As a founding member and organizer of NYC Artist Coalition, implemented and maintained campaign websites and helped build coalition memory, source maps, and coordination infrastructure for cultural-space advocacy, FairRentNYC, Commercial Rent Stabilization, and storefront stability.",
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
      "nyc-artist-coalition-civic-systems",
      "nyc-artist-coalition-participation-system"
    ],
    whatWasUnclear:
      "The work involved many stakeholders, public/private source materials, legal and policy questions, city/state strategy lanes, shifting meetings, and sensitive coalition context that could easily become fragmented or overexposed.",
    whatBecameUsable:
      "Recurring cultural-space meetings, public event pathways, practical safety and legal sessions, town halls, hearings, campaign actions, running minutes, action trackers, source maps, public campaign websites, and shared campaign memory.",
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
        type: "website",
        media: {
          src: "/artifacts/fair-rent-nyc/public-site.png",
          alt: "FairRentNYC campaign homepage with Commercial Rent Stabilization call to action and public reference library.",
          caption:
            "FairRentNYC public campaign surface captured July 2026. The screenshot demonstrates public web and resource-library infrastructure; campaign outcomes remain collective.",
          href: "https://fairrentnyc.nycartc.com/",
          sourceLabel: "FairRentNYC public website"
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
      "Decision Records",
      "Participation Systems"
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
      "Public sources, approved public campaign screenshot, meeting-memory summaries, private/redacted coalition context, and collaborator review for additional named materials.",
    credits: ["Jamie Burkart", "NYC Artist Coalition collaborators", "Commercial Rent Stabilization advocates"],
    publicSafety: {
      note: "Collective-work language is required: contributed to, helped structure, stewarded, supported, and translated."
    },
    currentStatus: "Active public-safe summary with an approved public campaign screenshot.",
    group: "Civic and public-facing systems",
    roleFit:
      "Civic delivery, coalition operations, product operations, documentation architecture, source-backed memory, public guidance, policy communications, and implementation support.",
    evidence: [
      "Founding-member and organizer role in NYC Artist Coalition",
      "Civic systems, coalition operations, and policy-communications infrastructure",
      "Recurring participation system across cultural-space meetings, practical sessions, hearings, town halls, campaign actions, and relief convenings",
      "Public-safe census of 33 Facebook event records, with one additional platform control slot preserved as unresolved",
      "Capture-date census of 445 distinct Facebook posts spanning 2017–2021, preserving 67 cleaned source routes and issue continuity with shared-account authorship boundaries",
      "Campaign materials around Cabaret Law repeal, Office of Nightlife creation, nightlife enforcement reporting, Commercial Rent Stabilization, and storefront stability",
      "30+ pages of shared campaign-memory infrastructure",
      "Running minutes, decision records, action trackers, and source maps",
      "Public campaign websites for NYC Artist Coalition advocacy",
      "Legal/policy questions organized for collaborators",
      "Public-data framing and stakeholder next steps"
    ],
    knownOpenProtected: {
      known:
        "Contemporary reporting identifies Jamie as a founding member and organizer of NYC Artist Coalition; retained Git histories document his direct campaign-site implementation and maintenance alongside public-safe coalition memory, source maps, policy-communications materials, and follow-up systems.",
      open:
        "Additional collaborators, meeting materials, internal artifacts, and screenshots require specific approval.",
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
        type: "prototype",
        media: {
          src: "/artifacts/callnyc/archived-prototype.png",
          alt: "Archived CallNYC prototype showing issue navigation, resident guidance, and a Council member service profile.",
          caption:
            "Archived CallNYC prototype captured July 2026. The banner marks it as an unofficial, non-current snapshot.",
          href: "https://callnyc.org/",
          sourceLabel: "CallNYC archived public prototype"
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
      { label: "Archived project site", url: "https://callnyc.org/" },
      {
        label: "Politico New York archived PDF",
        url: "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf"
      },
      { label: "GitHub repository", url: "https://github.com/openhouse/CallNYC" }
    ],
    careNote:
      "Archived civic-data prototype. Not an official or current City Council service, legal service, emergency service, or comprehensive civic guidance source.",
    sourceLayer:
      "CouncilStat / constituent-services open data, archived project context, verified Politico New York coverage, public GitHub repository, and approved archived-prototype screenshot.",
    credits: ["Jamie Burkart", "Civic-data collaborators"],
    publicSafety: {
      note: "This page must make the archived and unofficial status visible wherever the project is summarized."
    },
    currentStatus: "Archived prototype with an approved public-safe screenshot.",
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
        "Additional screenshots and archive links require separate review before publication.",
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
      "Co-built and operated a natural-language community-calendar platform for DIY arts and music organizers active in 35+ city ecosystems.",
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
      "Community Platform Delivery",
      "Organizer Workflow Design",
      "Product Operations",
      "Community Platform Design",
      "Event Workflows"
    ],
    links: [{ label: "Project site", url: "https://wowlist.org/" }],
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
      "Natural-language publishing and followable keyword communities",
      "Organizer-led activity in 35+ city ecosystems"
    ],
    knownOpenProtected: {
      known:
        "WOWList was a co-built community-calendar platform organized around followable keyword communities.",
      open:
        "Screenshots, archive links, and individual technical-contribution allocation need further review.",
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
    years: "2010s-present",
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
        title: "Residency onboarding handoff",
        description:
          "A redacted reconstruction shows proposal review, orientation, space configuration, independent access, and continued support without exposing participant or access details.",
        type: "workflow"
      },
      {
        title: "Recurring gathering operations",
        description:
          "A second reconstruction shows invitation, response, hosting, minimal continuity documentation, and follow-up while every participant-level value remains private.",
        type: "template"
      }
    ],
    tags: ["Community Systems", "Documentation", "Implementation", "Knowledge Systems"],
    capabilities: ["Onboarding", "Facilitation", "Hospitality Systems", "Artist Support"],
    careNote:
      "Summary-only page. Raw guest data, attendance records, private community records, and unapproved photos stay offline.",
    sourceLayer:
      "Public-safe summary, approved public materials pending, and private records intentionally omitted.",
    credits: ["Jamie Burkart", "196 / Sunday Dinner community"],
    currentStatus: "Active practice; public-safe summary only.",
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
    subtitle: "A $490,539 public funding award, field implementation, and responsible transition",
    summary:
      "Secured a $490,539 public funding award by co-developing KC Town Hall's successful CCED proposal and serving as the City's named developer/presenter for the exact request, then transitioned the project to a mission-aligned organization.",
    role: "Co-founder, Project Manager & CCED Developer/Presenter",
    years: "2019-2024 public record",
    status: "Short proof page",
    featured: false,
    priority: 6,
    visibility: "public-safe",
    proofBankIds: [
      "kc-town-hall-public-benefit-documentation",
      "kc-town-hall-public-service-interface"
    ],
    whatWasUnclear:
      "A long-vacant historic building involved public benefit, preservation, funding, stakeholder, and redevelopment questions that needed durable documentation.",
    whatBecameUsable:
      "A successful $490,539 public funding request, planning materials, public-benefit documentation, stakeholder context, a multi-year municipal compliance record, and a mission-aligned transition.",
    artifactTypes: ["map", "guide", "source map", "template"],
    artifacts: [
      {
        title: "Ten-minute-walk proposal map",
        description:
          "A neighborhood-scale planning graphic from the 2019 proposal, presented here as a public-safe crop with obsolete contact details removed.",
        type: "map",
        media: {
          src: "/images/artifacts/kc-town-hall-walkshed.webp",
          alt: "KC Town Hall proposal map showing a ten-minute walking area around the project location.",
          caption:
            "The map made a proposed neighborhood-scale constituency visible. It documents a planning frame, not a completed program or outcome.",
          href: "/images/artifacts/kc-town-hall-walkshed.webp",
          sourceLabel: "proposal map",
          fit: "contain"
        }
      },
      {
        title: "Public-benefit documentation set",
        description:
          "Representative materials for describing intended public value, funding context, and stakeholder needs.",
        type: "guide"
      }
    ],
    tags: ["Implementation", "Documentation", "Knowledge Systems", "Public-Facing Tools"],
    capabilities: ["Stakeholder Documentation", "Funding Support", "Historic Preservation Context"],
    links: [{ label: "Historical project site", url: "https://kctownhall.com/" }],
    careNote:
      "Securing the award names Jamie's documented proposal-and-presentation role; institutional authority remained with the Board and Council, and appropriation was not payment to Jamie. The transition is an authorized first-party professional account. Private personal, financial, legal, property, and stakeholder details are omitted.",
    sourceLayer:
      "Official Kansas City Council and CCED records, a protected public-safe review of the 2019 proposal, the complete public account corpus, Council-role records, approved resume language, and bounded project context.",
    credits: ["Jamie Burkart", "KC Town Hall LLC collaborators"],
    currentStatus: "Jamie later transitioned the project to a mission-aligned organization.",
    group: "Operating systems for teams",
    roleFit:
      "Funding strategy, proposal development, public presentation, long-horizon project management, public-benefit documentation, compliance coordination, and implementation support.",
    evidence: [
      "$490,539 public funding award secured through a successful CCED request",
      "Named City developer/presenter for the exact request",
      "Redevelopment planning",
      "Public-benefit documentation",
      "Named developer point of contact in 2022 and 2023 City reports",
      "M/WBE and CREO compliance progress",
      "Recurring public intake, service coordination, and result reporting",
      "Mission-aligned project transition"
    ],
    knownOpenProtected: {
      known:
        "Jamie co-led the project, served as the City's named developer/presenter for the successful $490,539 request, remained a named developer point of contact through documented compliance progress in 2022-2023, and later transitioned the project to a mission-aligned organization. The complete surviving public-account corpus separately documents a collective resident intake, service-coordination, and reporting workflow.",
      open:
        "The receiving organization, legal form, timing, and transfer scope are intentionally not asserted. The public transcript of Jamie's recalled City Council testimony remains unrecovered.",
      protected:
        "Private personal, correspondence, financial, legal, property, banking, and stakeholder details are omitted."
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
