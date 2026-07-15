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

const proofIdsSchema = z.array(z.string()).min(1);
const workStatementProofsSchema = z.object({
  title: proofIdsSchema,
  subtitle: proofIdsSchema,
  role: proofIdsSchema,
  summary: proofIdsSchema,
  years: proofIdsSchema,
  series: proofIdsSchema,
  status: proofIdsSchema,
  visibility: proofIdsSchema,
  group: proofIdsSchema,
  featured: proofIdsSchema,
  priority: proofIdsSchema,
  whatWasUnclear: proofIdsSchema,
  whatBecameUsable: proofIdsSchema,
  roleFit: proofIdsSchema,
  tags: proofIdsSchema,
  artifactTypes: proofIdsSchema,
  artifacts: z.array(proofIdsSchema),
  evidence: z.array(proofIdsSchema),
  known: proofIdsSchema,
  open: proofIdsSchema,
  protected: proofIdsSchema,
  careNote: proofIdsSchema,
  currentStatus: proofIdsSchema,
  publicSafetyNote: proofIdsSchema,
  sourceLayer: proofIdsSchema,
  credits: proofIdsSchema,
  links: proofIdsSchema
});

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
  statementProofs: workStatementProofsSchema,
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
    statementProofs: {
      title: ["hje-modernization-stewardship"],
      subtitle: ["hje-modernization-stewardship"],
      role: ["hje-modernization-stewardship"],
      summary: ["hje-modernization-stewardship"],
      years: ["hje-modernization-stewardship"],
      series: ["hje-modernization-stewardship"],
      status: ["hje-modernization-stewardship"],
      visibility: ["hje-modernization-stewardship"],
      group: ["hje-modernization-stewardship"],
      featured: ["hje-modernization-stewardship"],
      priority: ["hje-modernization-stewardship"],
      whatWasUnclear: ["hje-modernization-stewardship"],
      whatBecameUsable: ["hje-modernization-stewardship"],
      roleFit: ["hje-modernization-stewardship"],
      tags: ["hje-modernization-stewardship"],
      artifactTypes: ["hje-modernization-stewardship"],
      artifacts: [
        ["hje-modernization-stewardship"],
        ["hje-revenue-growth-contribution"],
        ["hje-modernization-stewardship"]
      ],
      evidence: [
        ["hje-modernization-stewardship"],
        ["hje-modernization-stewardship"],
        ["hje-revenue-growth-contribution"],
        ["hje-modernization-stewardship"]
      ],
      known: ["hje-modernization-stewardship"],
      open: ["hje-modernization-stewardship"],
      protected: ["hje-modernization-stewardship"],
      careNote: ["hje-modernization-stewardship"],
      currentStatus: ["hje-modernization-stewardship"],
      publicSafetyNote: ["hje-modernization-stewardship"],
      sourceLayer: ["hje-modernization-stewardship"],
      credits: ["hje-modernization-stewardship"],
      links: ["hje-modernization-stewardship"]
    },
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
      "Served as a founding-era NYC Artist Coalition organizer and built public-facing civic systems, campaign websites, coalition memory, source maps, and coordination infrastructure. Public records now connect that operating role to Cabaret Law repeal advocacy, Office of Nightlife public engagement, Talks Not Raids, FairRentNYC, and Commercial Rent Stabilization.",
    role: "Founding-Era Organizer, Civic Systems & Coalition Operations",
    years: "2017-Present",
    status: "Full case study",
    featured: true,
    priority: 2,
    visibility: "public-safe",
    proofBankIds: [
      "fair-rent-campaign-memory",
      "fair-rent-source-map",
      "fair-rent-public-data-pilot",
      "fair-rent-2023-web-relaunch",
      "commercial-vacancy-quarterly-corpus",
      "nyc-artist-coalition-public-web-infrastructure",
      "nyc-artist-coalition-civic-systems",
      "nyc-artist-coalition-public-outcome-arc",
      "nyc-artist-coalition-campaign-press-corpus",
      "nyc-artist-coalition-founding-era-role",
      "nyc-artist-coalition-participation-system",
      "nyc-artist-coalition-shared-public-identity",
      "nyc-artist-coalition-x-source-circulation"
    ],
    statementProofs: {
      title: ["nyc-artist-coalition-founding-era-role"],
      subtitle: ["nyc-artist-coalition-civic-systems"],
      role: ["nyc-artist-coalition-founding-era-role"],
      summary: [
        "nyc-artist-coalition-founding-era-role",
        "nyc-artist-coalition-civic-systems",
        "nyc-artist-coalition-public-web-infrastructure"
      ],
      years: ["nyc-artist-coalition-founding-era-role"],
      series: ["nyc-artist-coalition-civic-systems"],
      status: ["nyc-artist-coalition-civic-systems"],
      visibility: ["fair-rent-campaign-memory"],
      group: ["nyc-artist-coalition-civic-systems"],
      featured: ["nyc-artist-coalition-civic-systems"],
      priority: ["nyc-artist-coalition-civic-systems"],
      whatWasUnclear: ["fair-rent-campaign-memory"],
      whatBecameUsable: [
        "fair-rent-campaign-memory",
        "fair-rent-source-map",
        "fair-rent-public-data-pilot",
        "nyc-artist-coalition-public-web-infrastructure",
        "nyc-artist-coalition-participation-system"
      ],
      roleFit: [
        "nyc-artist-coalition-civic-systems",
        "fair-rent-campaign-memory"
      ],
      tags: ["nyc-artist-coalition-civic-systems"],
      artifactTypes: ["fair-rent-campaign-memory", "fair-rent-source-map"],
      artifacts: [
        ["fair-rent-campaign-memory"],
        ["fair-rent-source-map"],
        ["fair-rent-source-map"],
        ["fair-rent-public-data-pilot"],
        ["fair-rent-2023-web-relaunch"],
        ["commercial-vacancy-quarterly-corpus"],
        [
          "nyc-artist-coalition-public-web-infrastructure",
          "nyc-artist-coalition-campaign-press-corpus"
        ]
      ],
      evidence: [
        ["nyc-artist-coalition-founding-era-role"],
        ["nyc-artist-coalition-civic-systems"],
        ["nyc-artist-coalition-civic-systems"],
        ["nyc-artist-coalition-public-web-infrastructure"],
        ["nyc-artist-coalition-public-outcome-arc"],
        ["fair-rent-campaign-memory"],
        ["fair-rent-campaign-memory", "fair-rent-source-map"],
        ["fair-rent-public-data-pilot"],
        ["nyc-artist-coalition-public-web-infrastructure"],
        ["nyc-artist-coalition-participation-system"],
        ["nyc-artist-coalition-shared-public-identity"],
        ["nyc-artist-coalition-x-source-circulation"],
        ["nyc-artist-coalition-campaign-press-corpus"],
        ["fair-rent-source-map"],
        ["nyc-artist-coalition-civic-systems"]
      ],
      known: [
        "nyc-artist-coalition-founding-era-role",
        "nyc-artist-coalition-civic-systems",
        "nyc-artist-coalition-public-web-infrastructure",
        "nyc-artist-coalition-public-outcome-arc",
        "nyc-artist-coalition-participation-system",
        "nyc-artist-coalition-shared-public-identity"
      ],
      open: [
        "fair-rent-campaign-memory",
        "fair-rent-source-map",
        "nyc-artist-coalition-shared-public-identity",
        "nyc-artist-coalition-x-source-circulation"
      ],
      protected: ["fair-rent-campaign-memory"],
      careNote: ["fair-rent-campaign-memory"],
      currentStatus: ["fair-rent-campaign-memory"],
      publicSafetyNote: ["fair-rent-campaign-memory"],
      sourceLayer: [
        "fair-rent-source-map",
        "nyc-artist-coalition-campaign-press-corpus",
        "nyc-artist-coalition-x-source-circulation"
      ],
      credits: ["nyc-artist-coalition-civic-systems"],
      links: ["nyc-artist-coalition-public-web-infrastructure"]
    },
    whatWasUnclear:
      "The work involved many stakeholders, public/private source materials, legal and policy questions, city/state strategy lanes, shifting meetings, and sensitive coalition context that could easily become fragmented or overexposed.",
    whatBecameUsable:
      "Running minutes, action trackers, source maps, policy question logs, a privacy-preserving commercial-data pilot specification, stakeholder follow-up, public campaign websites, and resident-facing action tools that connected legislation to calls, district contacts, evidence, events, and coalition participation.",
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
        title: "Privacy-preserving data pilot",
        description:
          "A smallest-serious-v1 for aggregate commercial vacancy and lease-cost indicators, with schema, coverage, suppression, methods, and explicit confidential-data exclusions.",
        type: "source map"
      },
      {
        title: "2023 website relaunch",
        description:
          "A versioned shared implementation checklist connected web updates, public action tools, campaign calls, press materials, forms, documents, and follow-through.",
        type: "website"
      },
      {
        title: "20-year vacancy-data corpus",
        description:
          "A structured working corpus of 81 quarterly HUD-USPS business-vacancy snapshots spanning Q4 2005 through Q4 2025.",
        type: "source map"
      },
      {
        title: "Public campaign web surfaces",
        description:
          "Documented public-safe website infrastructure for Let NYC Dance, Talks Not Raids, and FairRentNYC. Four campaign press indexes, including Save NYC Spaces, are preserved separately as collective campaign context.",
        type: "website"
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
      "Data Product Scoping",
      "Action Tracking",
      "Campaign Websites",
      "Public Guidance",
      "Decision Records"
    ],
    links: [
      { label: "NYC Artist Coalition", url: "https://nycartc.com/" },
      { label: "FairRentNYC", url: "https://fairrentnyc.nycartc.com/" },
      { label: "FairRentNYC 2021 archive", url: "https://web.archive.org/web/20211201104425/https://fairrentnyc.nycartc.com/" },
      { label: "Talks Not Raids", url: "https://talksnotraids.com/" },
      { label: "Let NYC Dance", url: "https://letnycdance.nycartc.com/" },
      { label: "Save NYC Spaces", url: "https://savenycspaces.nycartc.com/" },
      { label: "2017 interview", url: "https://www.greenehillfood.coop/master-blog/2017/12/september-2017-newsletter" },
      { label: "Cabaret repeal record", url: "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=6FDA3305-06B3-47B3-9DF6-21B605C5A8EE&ID=3086319&Options=ID%7CText%7C&Search=cabaret" },
      { label: "Office of Nightlife", url: "https://www.nyc.gov/site/mome/news/091917-nightlife-office.page" },
      { label: "MARCH transparency law", url: "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=6A35ADA6-86E7-40B0-AD39-5B6E376FD23F&ID=3704342&Options=ID%7CText%7C&Search=1156" },
      { label: "NYC Artist Coalition on X", url: "https://x.com/NYCArtC" }
    ],
    careNote:
      "Public-safe summary of collective civic and coalition work. This page does not publish private notes, legal-review materials, stakeholder lists, raw strategy documents, or unapproved internal materials.",
    sourceLayer:
      "Public sources, four structured campaign press indexes, a governed 3,367-item public X account corpus with an explicit 1,757-item gap, a governed 33-event Facebook corpus with one unresolved host-control slot, public campaign materials where approved, meeting memory summaries, private/redacted coalition context, and collaborator review still required for named materials.",
    credits: ["Jamie Burkart", "NYC Artist Coalition collaborators", "Commercial Rent Stabilization advocates"],
    publicSafety: {
      note: "Collective-work language is required: contributed to, helped structure, stewarded, supported, and translated."
    },
    currentStatus: "Active public-safe summary. Collaborator and material approvals pending.",
    group: "Civic and public-facing systems",
    roleFit:
      "Civic delivery, coalition operations, product operations, documentation architecture, source-backed memory, public guidance, policy communications, and implementation support.",
    evidence: [
      "Founding-era organizing role in NYC Artist Coalition",
      "Civic systems, coalition operations, and policy-communications infrastructure",
      "Publicly documented 2017 Cabaret Law repeal advocacy and invitation into coalition dialogue about the Office of Nightlife",
      "Resident-facing campaign systems linking legislation, public data, district contacts, events, partner credit, and calls to action",
      "Collective outcome record: Cabaret licensing repealed in 2017; MARCH reporting and notice requirements enacted in 2019; MARCH dismantled in 2023",
      "30+ pages of shared campaign-memory infrastructure",
      "Running minutes, decision records, action trackers, and source maps",
      "Privacy-preserving commercial-data pilot specification with schema, suppression, methods, and exclusions",
      "Public campaign websites for NYC Artist Coalition advocacy",
      "Recurring participation system spanning cultural-space meetings, practical support sessions, town halls, hearings, campaigns, and relief convenings",
      "One shared public account identity carrying Fair Rent NYC, Save NYC Spaces, Let NYC Dance, and Talks Not Raids across the recovered 2017-2026 record",
      "446 of 696 recovered authored posts linking outward to campaign tools, public records, reporting, forms, events, and field resources",
      "45 campaign press-index entries representing 44 distinct article URLs",
      "Legal/policy questions organized for collaborators",
      "Public-data framing and stakeholder next steps"
    ],
    knownOpenProtected: {
      known:
        "Jamie served as a founding-era NYC Artist Coalition organizer and built public web, civic-action, campaign-memory, legislative-provenance, and commercial-data product-scoping infrastructure. Public sources document his Cabaret Law advocacy and Office of Nightlife public-engagement work; the shared public identity carried four campaign systems across the recovered 2017-2026 record; official records establish related City outcomes while preserving collective and institutional credit.",
      open:
        "Which specific public artifacts, collaborators, meeting materials, and screenshots may be named or shown requires approval. The account's 1,757-item recovery gap and Jamie's account-establishment role remain open research.",
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
    statementProofs: {
      title: ["callnyc-civic-data-guidance"],
      subtitle: ["callnyc-civic-data-guidance"],
      role: ["callnyc-civic-data-guidance"],
      summary: ["callnyc-civic-data-guidance"],
      years: ["callnyc-civic-data-guidance"],
      series: ["callnyc-civic-data-guidance"],
      status: ["callnyc-civic-data-guidance"],
      visibility: ["callnyc-civic-data-guidance"],
      group: ["callnyc-civic-data-guidance"],
      featured: ["callnyc-civic-data-guidance"],
      priority: ["callnyc-civic-data-guidance"],
      whatWasUnclear: ["callnyc-civic-data-guidance"],
      whatBecameUsable: ["callnyc-civic-data-guidance"],
      roleFit: ["callnyc-civic-data-guidance"],
      tags: ["callnyc-civic-data-guidance"],
      artifactTypes: ["callnyc-civic-data-guidance"],
      artifacts: [
        ["callnyc-civic-data-guidance"],
        ["callnyc-civic-data-guidance"],
        ["callnyc-civic-data-guidance"],
        ["callnyc-civic-data-guidance"]
      ],
      evidence: [
        ["callnyc-civic-data-guidance"],
        ["callnyc-civic-data-guidance"],
        ["callnyc-civic-data-guidance"],
        ["callnyc-civic-data-guidance"],
        ["callnyc-civic-data-guidance"]
      ],
      known: ["callnyc-civic-data-guidance"],
      open: ["callnyc-civic-data-guidance"],
      protected: ["callnyc-civic-data-guidance"],
      careNote: ["callnyc-civic-data-guidance"],
      currentStatus: ["callnyc-civic-data-guidance"],
      publicSafetyNote: ["callnyc-civic-data-guidance"],
      sourceLayer: ["callnyc-civic-data-guidance"],
      credits: ["callnyc-civic-data-guidance"],
      links: ["callnyc-civic-data-guidance"]
    },
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
        title: "Public engagement system",
        description:
          "A repeatable recognition, issue-linking, and Council-contact pattern documented across the complete recoverable project-account corpus.",
        type: "guide"
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
      "Public Interfaces",
      "Stakeholder Engagement"
    ],
    links: [
      {
        label: "Politico New York archived PDF",
        url: "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf"
      },
      { label: "GitHub repository", url: "https://github.com/openhouse/CallNYC" },
      { label: "CallNYC on X", url: "https://x.com/CallNYCapp" }
    ],
    careNote:
      "Archived civic-data prototype. Not an official or current City Council service, legal service, emergency service, or comprehensive civic guidance source.",
    sourceLayer:
      "CouncilStat / constituent-services open data, a complete recoverable 107-item project-account corpus, verified Politico New York coverage, public GitHub repository, and public-safe screenshots pending.",
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
      "Ran a repeatable public recognition and issue-linking system across 26 Council members and 61 normalized CallNYC issue pages",
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
    proofBankIds: [
      "wowlist-community-platform",
      "wowlist-public-support-practice",
      "wowlist-civic-care-circulation"
    ],
    statementProofs: {
      title: ["wowlist-community-platform"],
      subtitle: ["wowlist-community-platform"],
      role: ["wowlist-community-platform"],
      summary: ["wowlist-community-platform"],
      years: ["wowlist-community-platform"],
      series: ["wowlist-community-platform"],
      status: ["wowlist-community-platform"],
      visibility: ["wowlist-community-platform"],
      group: ["wowlist-community-platform"],
      featured: ["wowlist-community-platform"],
      priority: ["wowlist-community-platform"],
      whatWasUnclear: ["wowlist-community-platform"],
      whatBecameUsable: [
        "wowlist-community-platform",
        "wowlist-public-support-practice"
      ],
      roleFit: ["wowlist-community-platform"],
      tags: ["wowlist-community-platform"],
      artifactTypes: ["wowlist-community-platform"],
      artifacts: [["wowlist-community-platform"]],
      evidence: [
        ["wowlist-community-platform"],
        ["wowlist-community-platform"],
        ["wowlist-public-support-practice"],
        ["wowlist-civic-care-circulation"],
        ["wowlist-community-platform"],
        ["wowlist-community-platform"]
      ],
      known: ["wowlist-community-platform"],
      open: ["wowlist-community-platform"],
      protected: ["wowlist-community-platform"],
      careNote: ["wowlist-community-platform"],
      currentStatus: ["wowlist-community-platform"],
      publicSafetyNote: ["wowlist-community-platform"],
      sourceLayer: [
        "wowlist-community-platform",
        "wowlist-public-support-practice",
        "wowlist-civic-care-circulation"
      ],
      credits: ["wowlist-community-platform"],
      links: ["wowlist-community-platform"]
    },
    whatWasUnclear:
      "DIY organizers needed lightweight ways to distribute events and maintain community visibility across scenes without relying on one centralized editorial calendar.",
    whatBecameUsable:
      "A followable keyword-community platform with event distribution workflows, organizer-facing publishing, and a public support loop for product questions and workflow friction.",
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
    links: [{ label: "WOW List on X", url: "https://x.com/wowlist" }],
    careNote:
      "Historical proof page. Claims should avoid overreading adoption beyond public-safe estimates.",
    sourceLayer:
      "Approved resume language and a public-safe aggregate historical summary support the scale wording; the authenticated July 15 X corpus supports the product-support and civic-curation claims. Screenshots remain pending Jamie approval.",
    credits: ["Jamie Burkart", "WOWList collaborators"],
    currentStatus: "Historical short proof page.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community systems, product operations, public-facing platforms, and event distribution workflows.",
    evidence: [
      "Django / PostgreSQL / PostGIS and Ember platform",
      "Followable keyword communities",
      "Public support threads document location-scope, list-discovery, and event-entry workflow questions",
      "The project account's public trace combines direct calendar links with curation of demonstrations, vigils, fundraisers, and mutual-aid resources",
      "Public-safe aggregate records support 1,800+ users and 16,000+ posts/events",
      "Roughly 35 city ecosystems reached"
    ],
    knownOpenProtected: {
      known:
        "WOWList was a co-built community-calendar platform organized around followable keyword communities.",
      open:
        "Screenshots and additional archive links need approval; the approximate aggregate adoption wording is approved through the public-safe proof record.",
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
      "196-residency-onboarding-workflow"
    ],
    statementProofs: {
      title: ["sunday-dinner-196-participation-infrastructure"],
      subtitle: ["sunday-dinner-196-participation-infrastructure"],
      role: ["sunday-dinner-196-participation-infrastructure"],
      summary: ["sunday-dinner-196-participation-infrastructure"],
      years: ["sunday-dinner-196-participation-infrastructure"],
      series: ["sunday-dinner-196-participation-infrastructure"],
      status: ["sunday-dinner-196-participation-infrastructure"],
      visibility: ["sunday-dinner-196-participation-infrastructure"],
      group: ["sunday-dinner-196-participation-infrastructure"],
      featured: ["sunday-dinner-196-participation-infrastructure"],
      priority: ["sunday-dinner-196-participation-infrastructure"],
      whatWasUnclear: ["sunday-dinner-196-participation-infrastructure"],
      whatBecameUsable: [
        "sunday-dinner-196-participation-infrastructure",
        "196-residency-onboarding-workflow"
      ],
      roleFit: ["sunday-dinner-196-participation-infrastructure"],
      tags: ["sunday-dinner-196-participation-infrastructure"],
      artifactTypes: ["sunday-dinner-196-participation-infrastructure"],
      artifacts: [
        ["sunday-dinner-196-participation-infrastructure"],
        ["196-residency-onboarding-workflow"]
      ],
      evidence: [
        ["sunday-dinner-196-participation-infrastructure"],
        ["sunday-dinner-196-participation-infrastructure"],
        ["196-residency-onboarding-workflow"],
        ["196-residency-onboarding-workflow"],
        ["sunday-dinner-196-participation-infrastructure"]
      ],
      known: ["sunday-dinner-196-participation-infrastructure"],
      open: ["sunday-dinner-196-participation-infrastructure"],
      protected: ["sunday-dinner-196-participation-infrastructure"],
      careNote: ["sunday-dinner-196-participation-infrastructure"],
      currentStatus: ["sunday-dinner-196-participation-infrastructure"],
      publicSafetyNote: ["sunday-dinner-196-participation-infrastructure"],
      sourceLayer: ["sunday-dinner-196-participation-infrastructure"],
      credits: ["sunday-dinner-196-participation-infrastructure"],
      links: ["sunday-dinner-196-participation-infrastructure"]
    },
    whatWasUnclear:
      "A recurring cultural space needed trust-building routines, invitations, hospitality, artist support, and continuity without turning private community records into public spectacle.",
    whatBecameUsable:
      "Repeatable participation infrastructure for gatherings and resident artists, including a documented acceptance and onboarding workflow plus dedicated collaboration workspaces for project and media handoffs.",
    artifactTypes: ["photo sequence", "workflow", "template"],
    artifacts: [
      {
        title: "Gathering rhythm",
        description:
          "A representative structure for welcoming, hosting, documenting, and continuing recurring cultural work.",
        type: "workflow"
      },
      {
        title: "Residency acceptance and onboarding",
        description:
          "A reusable workflow for proposal review, orientation, space configuration, independent access, and dedicated collaborator handoffs.",
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
    currentStatus: "Public-safe summary only.",
    group: "Community and cultural infrastructure",
    roleFit:
      "Community operations, onboarding, facilitation, documentation, trust-building systems, and continuity planning.",
    evidence: [
      "300+ hosted gatherings",
      "20+ resident artists supported",
      "Documented residency acceptance and onboarding workflow",
      "Dedicated collaboration workspaces for project and media handoffs",
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
    subtitle: "Historic adaptive reuse planning in Kansas City",
    summary:
      "Jamie and Julia Fredenburg co-founded and project-managed Phase One of a Kansas City adaptive-reuse project. A 2019 proposal records a completed cold shell and a neighborhood survey that shaped plans; the Council authorized CCED negotiations, and a 2024 ordinance later recorded withdrawal and reappropriated the unused $490,539 allocation.",
    role: "Co-Founder & Project Manager",
    years: "Beginning in 2017",
    status: "Short proof page",
    featured: false,
    priority: 6,
    visibility: "public-safe",
    proofBankIds: [
      "kc-town-hall-public-benefit-documentation",
      "kc-town-hall-neighborhood-operations",
      "kc-town-hall-held-role-research"
    ],
    statementProofs: {
      title: ["kc-town-hall-public-benefit-documentation"],
      subtitle: ["kc-town-hall-public-benefit-documentation"],
      role: ["kc-town-hall-public-benefit-documentation"],
      summary: [
        "kc-town-hall-public-benefit-documentation",
        "kc-town-hall-neighborhood-operations"
      ],
      years: ["kc-town-hall-public-benefit-documentation"],
      series: ["kc-town-hall-public-benefit-documentation"],
      status: ["kc-town-hall-public-benefit-documentation"],
      visibility: ["kc-town-hall-public-benefit-documentation"],
      group: ["kc-town-hall-public-benefit-documentation"],
      featured: ["kc-town-hall-public-benefit-documentation"],
      priority: ["kc-town-hall-public-benefit-documentation"],
      whatWasUnclear: ["kc-town-hall-public-benefit-documentation"],
      whatBecameUsable: ["kc-town-hall-public-benefit-documentation"],
      roleFit: ["kc-town-hall-public-benefit-documentation"],
      tags: ["kc-town-hall-public-benefit-documentation"],
      artifactTypes: ["kc-town-hall-public-benefit-documentation"],
      artifacts: [["kc-town-hall-public-benefit-documentation"]],
      evidence: [
        ["kc-town-hall-public-benefit-documentation"],
        ["kc-town-hall-public-benefit-documentation"],
        ["kc-town-hall-public-benefit-documentation"],
        ["kc-town-hall-public-benefit-documentation"],
        ["kc-town-hall-public-benefit-documentation"],
        ["kc-town-hall-neighborhood-operations"],
        ["kc-town-hall-neighborhood-operations"],
        ["kc-town-hall-neighborhood-operations"]
      ],
      known: [
        "kc-town-hall-public-benefit-documentation",
        "kc-town-hall-neighborhood-operations"
      ],
      open: [
        "kc-town-hall-public-benefit-documentation",
        "kc-town-hall-held-role-research"
      ],
      protected: ["kc-town-hall-public-benefit-documentation"],
      careNote: ["kc-town-hall-public-benefit-documentation"],
      currentStatus: ["kc-town-hall-public-benefit-documentation"],
      publicSafetyNote: ["kc-town-hall-public-benefit-documentation"],
      sourceLayer: [
        "kc-town-hall-public-benefit-documentation",
        "kc-town-hall-neighborhood-operations"
      ],
      credits: ["kc-town-hall-public-benefit-documentation"],
      links: ["kc-town-hall-neighborhood-operations"]
    },
    whatWasUnclear:
      "A long-vacant historic building required coordinated restoration work, preservation judgment, neighborhood listening, public-benefit framing, funding navigation, and careful separation of public from private records.",
    whatBecameUsable:
      "A completed Phase One cold shell, a neighborhood-informed project proposal, public-benefit documentation, stakeholder context, and municipal-review support for continued adaptive reuse.",
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
    links: [{ label: "KC Town Hall on X", url: "https://x.com/KCTownHall" }],
    careNote:
      "Public-safe short proof page. Private financial, legal, property, and stakeholder details are omitted.",
    sourceLayer:
      "Public-safe appraisal of the private 2019 CCED proposal and support-letter packet, official Kansas City legislative records including Resolution 190649 and Ordinance 240317, archived KC Town Hall program pages, Jamie's public-safe handoff confirmation, and a governed 181-item public account corpus with an explicit two-item recovery gap.",
    credits: [
      "Jamie Burkart",
      "Julia Fredenburg",
      "KC Town Hall professional, trade, neighborhood, and civic collaborators"
    ],
    currentStatus: "Public-safe short proof page.",
    group: "Operating systems for teams",
    roleFit:
      "Long-horizon project management, multi-trade coordination, neighborhood listening, public-benefit documentation, stakeholder coordination, and implementation support.",
    evidence: [
      "2019 proposal naming Jamie and Julia as founders and project managers",
      "Phase One cold-shell completion across roof, structural masonry, and floor framing",
      "Partner-based neighborhood survey that shaped the proposal",
      "Council-adopted $490,539 CCED funding path",
      "2024 ordinance recording project withdrawal and reappropriation of the unused allocation",
      "Archived Tired of Tires page naming Julia and Jamie as authors",
      "99 authored posts documenting or coordinating Tired of Tires work",
      "Visible incoming dialogue from at least three sitting Council-member accounts"
    ],
    knownOpenProtected: {
      known:
        "The 2019 proposal names Jamie and Julia as founders and project managers and records Phase One cold-shell restoration completed across roof, structural-masonry, and floor-framing work. It documents a partner-based neighborhood survey that shaped project plans. An archived Tired of Tires page names Julia and Jamie as authors and KC Town Hall with Oak Park Neighborhood Association as program partners. The Council later accepted the CCED Board's recommendation and authorized funding-agreement negotiations; Ordinance 240317 records the project as withdrawn in 2024 and reappropriates the unused $490,539 allocation.",
      open:
        "Contracts, permits, dated artifacts, or collaborator records have not yet corroborated Jamie's recalled general-contractor title, survey-system authorship, detailed Tired of Tires field role or later service geography, or Cleveland Avenue design role. The municipal records do not identify the reasons for withdrawal, assign that action to Jamie, or establish the property's current status. Phase One completion does not establish Phase Two or full redevelopment completion. Two project-account items, recipient identity, and handoff terms remain unrecovered or unestablished for publication.",
      protected:
        "The source packet, banking appendices, resident responses, contact records, private transition context, and private financial, legal, property, contractor, and stakeholder details are omitted."
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
