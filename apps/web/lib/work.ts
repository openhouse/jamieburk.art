import { workFrontmatterSchema } from "@jamie-burkart/content-schema";

import type { WorkGroup, WorkItem } from "./types";

const rawWorkItems = [
  {
    title: "Harry J. Epstein Company",
    slug: "harry-j-epstein",
    summary:
      "Helped an 80+ year-old legacy industrial business adapt to e-commerce through web, analytics, marketing, content, and operational workflow improvements.",
    role: "Technical Project Manager, Web Systems Lead, Operations / E-commerce",
    dates: "2012-Present",
    format:
      "Client systems, public-facing website, e-commerce workflows, analytics, content operations",
    status: "Full case study",
    featured: true,
    priority: 1,
    privacyLevel: "public-safe",
    underlyingSystem:
      "Helping a legacy business preserve institutional voice while adapting to digital workflows.",
    group: "Business / operations",
    tags: [
      "Product Operations",
      "Implementation",
      "E-commerce",
      "Documentation",
      "Analytics"
    ],
    skills: [
      "Requirements",
      "Workflow Mapping",
      "Stakeholder Coordination",
      "Handoff Documentation",
      "Launch Support"
    ],
    proof: [
      "Long-running client trust and maintenance",
      "Public-facing web and e-commerce systems",
      "Contributing to 2x revenue growth"
    ],
    unclear:
      "A legacy business needed modern digital workflows without losing the voice, practical knowledge, and customer trust that made it durable.",
    usable:
      "Public-facing web systems, analytics-informed content operations, marketing workflows, implementation support, and maintainable handoffs.",
    body: {
      context:
        "Harry J. Epstein Company is a long-running industrial tool business with a strong customer base and a distinctive institutional voice.",
      did: [
        "Supported e-commerce, web, marketing, analytics, and content operations across a long-running client relationship.",
        "Translated operational needs into usable workflows, public-facing updates, product content, and maintenance patterns.",
        "Protected private analytics and internal strategy while making the public-facing system easier to understand and maintain."
      ],
      artifacts: [
        "Public site and e-commerce surfaces",
        "Workflow descriptions",
        "Public-safe screenshots or recreated diagrams",
        "Handoff and maintenance notes"
      ],
      tools: [
        "Web operations",
        "E-commerce workflows",
        "Analytics review",
        "Content operations",
        "Git / GitHub"
      ],
      outcomes: [
        "Supported a durable transition into digital commerce.",
        "Contributed to 2x revenue growth without claiming single-cause credit.",
        "Left practical operating structure for ongoing maintenance."
      ],
      proves:
        "Jamie can work inside a real business over time, translate needs into systems, protect sensitive details, and keep public-facing operations usable."
    },
    knownOpenProtected: {
      known: [
        "Public site and business context are visible.",
        "The work spans e-commerce, operations, analytics, and content."
      ],
      open: [
        "Final V1 should add permissioned public screenshots or recreated system diagrams."
      ],
      protected: [
        "Private analytics, revenue dashboards, internal strategy, and client-sensitive workflows are not published."
      ]
    },
    caveat:
      "Public-safe summary. Private analytics, internal revenue data, and client-sensitive operational materials are not published."
  },
  {
    title: "FairRentNYC / Commercial Rent Stabilization",
    slug: "fairrentnyc-commercial-rent-stabilization",
    summary:
      "Built shared campaign-memory and coordination infrastructure for Commercial Rent Stabilization and storefront-stability advocacy.",
    role: "Civic Systems, Coalition Operations & Policy Communications Lead",
    dates: "2017-Present; 2026 collaboration focus",
    format:
      "Shared documentation system, campaign-memory infrastructure, source maps, public guidance, meeting synthesis",
    status: "Full case study",
    featured: true,
    priority: 2,
    privacyLevel: "redacted",
    underlyingSystem:
      "Turning fragile civic context into shared campaign memory and actionable workstreams.",
    group: "Civic / public-facing systems",
    tags: [
      "Civic Technology",
      "Documentation",
      "Coalition Operations",
      "Open Data",
      "Policy Communications"
    ],
    skills: [
      "Documentation Architecture",
      "Stakeholder Coordination",
      "Source Maps",
      "Decision Records",
      "Public Guidance"
    ],
    proof: [
      "30+ pages of shared campaign-memory infrastructure",
      "Running minutes, decision records, action trackers, and source maps",
      "Privacy-preserving public-data framing"
    ],
    unclear:
      "Policy questions, stakeholder needs, public data, meeting history, and next steps were distributed across people, documents, and changing civic conditions.",
    usable:
      "Shared campaign-memory infrastructure, public-safe framing, action pathways, source maps, decision records, and materials a coalition could keep using.",
    body: {
      context:
        "The Commercial Rent Stabilization effort needed careful coordination across public-facing advocacy, policy research, source material, and coalition memory.",
      did: [
        "Built and stewarded shared documentation for campaign memory, meetings, source trails, legal and policy questions, and action lanes.",
        "Translated complex vacancy, occupancy, lease-cost, and storefront-stability questions into usable public-data framing.",
        "Kept the public story careful, collective, and public-safe."
      ],
      artifacts: [
        "Redacted documentation architecture",
        "Public handout pathways",
        "Source-map excerpts",
        "Public-safe workflow maps"
      ],
      tools: [
        "Markdown and shared documents",
        "Open-data workflows",
        "Meeting synthesis",
        "Decision logs",
        "Stakeholder updates"
      ],
      outcomes: [
        "Helped preserve continuity across a complex civic effort.",
        "Made shared context easier to inspect, correct, and act on.",
        "Supported coalition coordination without publishing sensitive materials."
      ],
      proves:
        "Jamie can create operating memory for civic work while respecting collective authorship, privacy, uncertainty, and public-interest constraints."
    },
    knownOpenProtected: {
      known: [
        "The public issue concerns commercial rent stabilization and storefront stability.",
        "The work included documentation, source maps, action trackers, and public-data framing."
      ],
      open: [
        "Some details require partner review before public release.",
        "Future versions can add redacted diagrams and approved public artifacts."
      ],
      protected: [
        "Private coalition notes, legal-review materials, raw strategy docs, contact lists, stakeholder lists, and transcripts are not published."
      ]
    },
    caveat:
      "Public-safe summary of collective civic and coalition work. Private notes, legal-review materials, and stakeholder lists are not published."
  },
  {
    title: "CallNYC.org",
    slug: "callnyc",
    summary:
      "Built a civic-data prototype translating constituent-services open data into resident-facing find help / next steps guidance.",
    role: "Builder / Civic Technology Lead",
    dates: "2010s",
    format: "Public-facing civic-data prototype / web tool",
    status: "Full case study",
    featured: true,
    priority: 3,
    privacyLevel: "archived",
    underlyingSystem:
      "Translating public data into resident-facing next steps.",
    group: "Civic / public-facing systems",
    tags: ["Civic Technology", "Open Data", "Service Design", "Web Systems"],
    skills: [
      "Information Architecture",
      "Public Guidance",
      "Open Data Translation",
      "Prototype Delivery"
    ],
    proof: [
      "Built after New York City Council's first civic-data hackathon",
      "Translated CouncilStat / constituent-services open data",
      "Covered by Politico New York"
    ],
    unclear:
      "Open civic data existed, but residents still needed plain-language issue pages and next steps.",
    usable:
      "A public-facing archived prototype that translated civic-service data into issue categories, guidance, and resident next steps.",
    body: {
      context:
        "CallNYC.org explored how constituent-services data could become understandable public guidance rather than a raw dataset.",
      did: [
        "Designed and built resident-facing issue pages from public civic data.",
        "Translated data categories into plain-language guidance and next steps.",
        "Kept the prototype framed as unofficial and historical."
      ],
      artifacts: [
        "Archived prototype",
        "Issue-page structure",
        "Data-to-guidance diagram",
        "Public coverage references"
      ],
      tools: [
        "Open-data review",
        "Information architecture",
        "Web prototype development",
        "Plain-language civic guidance"
      ],
      outcomes: [
        "Demonstrated a bridge from open data to resident-facing action.",
        "Created a prototype that can be discussed without implying current official service status."
      ],
      proves:
        "Jamie can turn public data into practical guidance, build lightweight civic prototypes, and mark public-safety boundaries clearly."
    },
    knownOpenProtected: {
      known: [
        "The project was a civic-data prototype.",
        "It was not an official or current City Council service."
      ],
      open: [
        "V1 should add archived screenshots or public links if available."
      ],
      protected: [
        "The page must not imply active government service, official authority, or current service accuracy."
      ]
    },
    caveat:
      "Archived civic-data prototype. Not an official or current City Council service."
  },
  {
    title: "WOWList.org",
    slug: "wowlist",
    summary:
      "Co-built a Python / Django + Ember.js community-calendar platform adopted by DIY arts and music organizers across roughly 35 city ecosystems.",
    role: "Co-Founder, Product & Community Systems",
    dates: "2015-2020",
    format: "Community-calendar platform and organizer tools",
    status: "Short proof page",
    featured: true,
    priority: 4,
    privacyLevel: "archived",
    underlyingSystem:
      "Making decentralized cultural events easier to publish, follow, and syndicate.",
    group: "Civic / public-facing systems",
    tags: ["Web Systems", "Community Systems", "Product", "Dokku"],
    skills: [
      "Product Operations",
      "Community Adoption",
      "Platform Workflows",
      "Low-Cost Deployment"
    ],
    proof: [
      "Roughly 35 city ecosystems reached",
      "Weekly digest emails and embeddable calendars",
      "Low-cost Dokku / DigitalOcean deployment"
    ],
    unclear:
      "DIY event organizers needed lightweight publishing and discovery tools across decentralized scenes.",
    usable:
      "Organizer-friendly event entry, digest emails, embeddable calendars, and adoption patterns across city ecosystems.",
    body: {
      context:
        "WOWList.org supported decentralized cultural calendars for organizers and audiences across multiple city ecosystems.",
      did: [
        "Co-built product and community systems for event entry, discovery, syndication, and adoption.",
        "Supported organizer workflows and low-cost hosting choices."
      ],
      artifacts: [
        "Archived platform summary",
        "Workflow descriptions",
        "City ecosystem list"
      ],
      tools: [
        "Python",
        "Django",
        "Ember.js",
        "Dokku",
        "DigitalOcean"
      ],
      outcomes: [
        "Supported adoption across cities including Chicago, Seattle, Santa Barbara, New York, and the Bay Area."
      ],
      proves:
        "Jamie can connect product infrastructure with real community adoption and lightweight operations."
    },
    knownOpenProtected: {
      known: [
        "The platform supported community calendars and organizer publishing."
      ],
      open: ["Future V1.1 can add screenshots and city-level examples."],
      protected: [
        "Private organizer data and any unapproved community details remain omitted."
      ]
    },
    caveat:
      "Archived / historical public-facing platform summary."
  },
  {
    title: "196 Artists Residency / Sunday Dinner",
    slug: "196-sunday-dinner",
    summary:
      "Created repeatable hosting, onboarding, facilitation, documentation, and continuity systems across 300+ gatherings and 20+ resident artists.",
    role: "Founder & Systems Steward",
    dates: "Sunday Dinner 2012-Present; Residency 2020-Present",
    format:
      "Residency, gatherings, onboarding, facilitation, care-forward community systems",
    status: "Public-safe summary only",
    featured: true,
    priority: 5,
    privacyLevel: "public-safe",
    underlyingSystem:
      "Turning hospitality and cultural care into repeatable participation infrastructure.",
    group: "Community / cultural infrastructure",
    tags: ["Community Systems", "Onboarding", "Facilitation", "Continuity"],
    skills: [
      "Onboarding",
      "Participation Design",
      "Documentation",
      "Facilitation",
      "Continuity Planning"
    ],
    proof: [
      "300+ gatherings supported",
      "20+ resident artists supported",
      "Repeatable hosting and continuity systems"
    ],
    unclear:
      "A living cultural project needed continuity, care, and onboarding without turning private community life into public content.",
    usable:
      "Repeatable participation infrastructure: onboarding, facilitation, documentation, hosting rhythms, and continuity practices.",
    body: {
      context:
        "196 and Sunday Dinner are cultural and community practices where the operating system is partly hospitality, rhythm, trust, and continuity.",
      did: [
        "Built repeatable structures for onboarding, gathering, hosting, and ongoing participation.",
        "Separated public-safe system description from private resident, guest, and attendance details."
      ],
      artifacts: [
        "Public-safe summary",
        "Onboarding pattern descriptions",
        "Participation and continuity notes"
      ],
      tools: [
        "Facilitation",
        "Documentation",
        "Onboarding",
        "Hosting workflows"
      ],
      outcomes: [
        "Supported ongoing gatherings and resident artist participation over time."
      ],
      proves:
        "Jamie can build humane operating structure around cultural infrastructure without overexposing the people inside it."
    },
    knownOpenProtected: {
      known: [
        "Sunday Dinner and 196 are long-running cultural/community systems."
      ],
      open: ["Permissioned public photos can be added later."],
      protected: [
        "Guest data, attendance records, private resident details, sensitive photos, and personal stories are not published without permission."
      ]
    },
    caveat:
      "Public-safe summary. Guest, resident, and attendance details are private unless explicitly permissioned."
  },
  {
    title: "KC Town Hall LLC",
    slug: "kc-town-hall",
    summary:
      "Historic adaptive-reuse planning and public-benefit documentation, including a $490,539 public funding recommendation.",
    role: "Co-Founder & Project Manager",
    dates: "2015-2024",
    format:
      "Historic adaptive-reuse planning, public-benefit documentation, grant/funding materials",
    status: "Public-safe summary only",
    featured: false,
    priority: 6,
    privacyLevel: "public-safe",
    underlyingSystem:
      "Translating a vacant civic-cultural building into a public-benefit redevelopment plan.",
    group: "Business / operations",
    tags: ["Project Management", "Public Benefit", "Documentation", "Planning"],
    skills: [
      "Project Documentation",
      "Funding Materials",
      "Stakeholder Communication",
      "Public-Benefit Framing"
    ],
    proof: [
      "$490,539 public funding recommendation",
      "Historic adaptive-reuse planning",
      "Public-benefit documentation"
    ],
    unclear:
      "A vacant civic-cultural building needed a public-benefit story, planning structure, and careful documentation.",
    usable:
      "Planning materials, public-benefit framing, and funding documentation that could be reviewed and discussed.",
    body: {
      context:
        "KC Town Hall focused on historic adaptive reuse and public-benefit redevelopment planning.",
      did: [
        "Helped translate building context into documentation, project framing, and funding materials.",
        "Kept public claims careful around ownership, funding, legal status, and current state."
      ],
      artifacts: [
        "Public-benefit summaries",
        "Planning documents",
        "Funding recommendation references"
      ],
      tools: [
        "Project management",
        "Documentation",
        "Public-benefit framing",
        "Grant and funding materials"
      ],
      outcomes: [
        "Supported a public funding recommendation and a clearer redevelopment story."
      ],
      proves:
        "Jamie can organize complex civic-cultural planning work into materials others can evaluate."
    },
    knownOpenProtected: {
      known: ["The work included a $490,539 public funding recommendation."],
      open: ["Future pages should cite public documents when available."],
      protected: [
        "Unverified legal, ownership, funding, and current-state details are omitted."
      ]
    },
    caveat:
      "Historical / public-safe summary. Use carefully verified public language around funding, ownership, legal status, and current project state."
  },
  {
    title: "Source-Backed Team Memory",
    slug: "source-backed-team-memory",
    summary:
      "A source-backed team-memory practice for turning meetings, documents, transcripts, and decisions into human-reviewed organizational memory.",
    role: "Founder / Product Prototype / Consulting Method",
    dates: "2026-Present",
    format:
      "Source-backed documentation practice, early prototype, AI-assisted human-reviewed workflow",
    status: "Lab / research",
    featured: true,
    priority: 7,
    privacyLevel: "lab",
    underlyingSystem:
      "Reducing context loss while keeping humans responsible for review, trust, privacy, and correction.",
    group: "Knowledge systems / AI lab",
    tags: ["Knowledge Systems", "AI Readiness", "Documentation", "Review"],
    skills: [
      "Source Mapping",
      "Human Review",
      "Decision Lineage",
      "Onboarding",
      "Knowledge Friction Mapping"
    ],
    proof: [
      "AI drafts. Humans review.",
      "Shared records remain inspectable and correctable.",
      "Bounded source-to-memory loop"
    ],
    unclear:
      "Teams lose decisions, context, open questions, and source trails across meetings, documents, and handoffs.",
    usable:
      "A human-reviewed source-to-memory workflow for onboarding, decision lineage, open questions, and correctable organizational memory.",
    body: {
      context:
        "Source-backed team memory is a careful research and consulting method, not a production SaaS promise.",
      did: [
        "Defined a bounded source-to-memory loop for meetings, documents, transcripts, decisions, and review.",
        "Centered human responsibility, inspection, correction, privacy, access, retention, and consent boundaries."
      ],
      artifacts: [
        "Method card",
        "Source-to-memory loop",
        "Review checklist",
        "Privacy and retention boundary notes"
      ],
      tools: [
        "AI-assisted drafting",
        "Human review",
        "Source maps",
        "Decision records",
        "Markdown / MDX"
      ],
      outcomes: [
        "Gives product and operations teams a practical frame for reducing context loss without treating AI output as authority."
      ],
      proves:
        "Jamie can shape AI-adjacent operations around trust, evidence, review, and maintainable shared memory."
    },
    knownOpenProtected: {
      known: [
        "This is a research / consulting method and early prototype practice.",
        "AI drafts. Humans review. The shared record remains inspectable and correctable."
      ],
      open: [
        "Future versions can show a public-safe source-to-memory example."
      ],
      protected: [
        "Private collaborator or company details are not exposed without permission."
      ]
    },
    caveat:
      "Research / consulting method and early prototype practice, not a production SaaS product."
  }
] satisfies WorkItem[];

export const workItems = rawWorkItems
  .map((item) => {
    workFrontmatterSchema.parse(item);
    return item;
  })
  .sort((a, b) => a.priority - b.priority);

export const featuredWorkItems = workItems.filter((item) => item.featured);

export const workGroups: WorkGroup[] = [
  "Business / operations",
  "Civic / public-facing systems",
  "Community / cultural infrastructure",
  "Knowledge systems / AI lab"
];

export function getWorkItem(slug: string) {
  return workItems.find((item) => item.slug === slug);
}
