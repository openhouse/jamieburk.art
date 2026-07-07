export type ProofStatus = "approved" | "softened" | "needs-approval" | "do-not-publish";

export type Proof = {
  id: string;
  title: string;
  publicSummary: string;
  roleFit: string;
  approvedWording: string[];
  status: ProofStatus;
  projectedPages: string[];
  protectedBoundaries: string[];
};

export const proofBankPrinciples = [
  "Use the strongest public-safe wording the record supports.",
  "Make Jamie visible as an actor without overstating sole ownership or causality.",
  "Keep private source material, raw records, and unapproved artifacts out of the repo and site."
] as const;

export const proofs = [
  {
    id: "technical-operations",
    title: "Technical Operations & Implementation",
    publicSummary:
      "Jamie builds the operating backbone teams need to coordinate delivery, surface risks early, document decisions, onboard contributors, report clearly, and keep public-facing technical work moving.",
    roleFit:
      "Primary professional frame for Technical Project Manager, Product Operations, Implementation, business-analysis, civic-tech, and source-backed memory conversations.",
    approvedWording: [
      "I build operating structure for ambiguous public-facing technical work.",
      "I coordinate delivery, surface risks early, document decisions, onboard contributors, report clearly, and leave behind handbooks, runbooks, source maps, and handoffs people can actually use."
    ],
    status: "approved",
    projectedPages: ["/", "/work/technical-operations", "/resume", "/about"],
    protectedBoundaries: [
      "Do not replace the role frame with vague creative-generalist language.",
      "Keep examples close enough that operating structure reads as a concrete practice."
    ]
  },
  {
    id: "career-14-years",
    title: "Operating Structure Across Contexts",
    publicSummary:
      "14+ years building operating structure across civic, cultural, small-business, and public-facing technical environments.",
    roleFit:
      "Establishes seniority and range without pretending every year was one continuous formal employment role.",
    approvedWording: [
      "14+ years building operating structure",
      "14+ years creating operating structure for complex public-facing work"
    ],
    status: "approved",
    projectedPages: ["/", "/resume", "/work/technical-operations"],
    protectedBoundaries: [
      "Do not imply one uninterrupted job title or single-employer track.",
      "Do not publish private client, community, collaborator, or archive records."
    ]
  },
  {
    id: "hje-operating-layer",
    title: "Harry J. Epstein Company",
    publicSummary:
      "Built and stewarded core e-commerce, catalog, checkout, analytics, marketing, content, and operations systems for an 80+ year-old legacy industrial business.",
    roleFit:
      "Private-sector implementation proof: legacy operations, web systems, catalog/search, checkout, analytics, stakeholder translation, and durable handoffs.",
    approvedWording: [
      "Built e-commerce, catalog, and checkout systems for HJE",
      "Built and stewarded core e-commerce systems for an 80+ year-old legacy industrial business",
      "Contributed to online growth for a legacy e-commerce business"
    ],
    status: "softened",
    projectedPages: ["/", "/work/harry-j-epstein", "/work/technical-operations", "/resume"],
    protectedBoundaries: [
      "Do not say Jamie directly caused revenue growth unless a stronger public source package is approved.",
      "Do not publish dashboards, customer data, vendor terms, detailed revenue, credentials, or private business rules."
    ]
  },
  {
    id: "crs-campaign-memory",
    title: "FairRentNYC / Commercial Rent Stabilization",
    publicSummary:
      "Built and stewarded shared campaign-memory and coordination infrastructure for Commercial Rent Stabilization and storefront-stability advocacy.",
    roleFit:
      "Civic product-operations proof: running minutes, action trackers, source maps, decision records, review lanes, public-data framing, public-safe explanations, and collective-work boundaries.",
    approvedWording: [
      "Built Commercial Rent Stabilization campaign-memory infrastructure",
      "Built and stewarded civic campaign-memory infrastructure",
      "Helped turn complex public-data and policy questions into source-backed materials collaborators could review, correct, and reuse"
    ],
    status: "approved",
    projectedPages: ["/", "/work/fair-rent-nyc", "/work/technical-operations", "/lab/source-backed-team-memory"],
    protectedBoundaries: [
      "Use collective-work language.",
      "Do not publish private coalition notes, protected review materials, collaborator lists, private emails, strategy context, unapproved quotes, or official legal-position claims."
    ]
  },
  {
    id: "nac-public-infrastructure",
    title: "NYC Artist Coalition",
    publicSummary:
      "NYC Artist Coalition work can be described as cultural-space fieldwork, coalition-operations support, public campaign surfaces, consent-aware follow-up, and affordability / anti-displacement documentation.",
    roleFit:
      "Shows long-running civic systems work while preserving the collective nature of cultural-space advocacy.",
    approvedWording: [
      "Supported NYC Artist Coalition cultural-space advocacy with public-safe documentation and campaign infrastructure",
      "Co-founding member of NYC Artist Coalition; public wording remains collective and approval-gated where campaign authorship or outcomes are specific"
    ],
    status: "softened",
    projectedPages: ["/work/fair-rent-nyc", "/work/technical-operations"],
    protectedBoundaries: [
      "Do not imply Jamie alone led NAC or won public policy outcomes.",
      "Do not publish venue, lease, landlord, signup, contact, fieldwork, private strategy, or unapproved collaborator details."
    ]
  },
  {
    id: "callnyc-open-data",
    title: "CallNYC.org",
    publicSummary:
      "Built an archived civic-data prototype translating New York City Council constituent-services open data into resident-facing issue pathways and next-step guidance.",
    roleFit:
      "Civic-tech product translation proof: public data to public interface, information architecture, scope boundaries, and resident-facing guidance.",
    approvedWording: [
      "Built an archived civic-data prototype that translated constituent-services open data into resident-facing guidance",
      "Covered by Politico New York in March 2016"
    ],
    status: "approved",
    projectedPages: ["/work/callnyc", "/work/technical-operations"],
    protectedBoundaries: [
      "Always identify CallNYC as archived and unofficial.",
      "Do not present it as a current City Council service, legal guidance, emergency guidance, or official agency direction."
    ]
  },
  {
    id: "wowlist-community-platform",
    title: "WOWList.org",
    publicSummary:
      "Co-built a Python / Django + Ember.js community-calendar platform organized around followable keyword communities for DIY arts, music, and local-interest scenes.",
    roleFit:
      "Community-platform and product-operations proof: user workflows, community vocabulary, event distribution, email/calendar patterns, and platform stewardship.",
    approvedWording: [
      "Co-built community web systems across multiple city ecosystems",
      "Co-built a community-calendar platform where organizers and users could publish, follow, save, sync, and distribute events through community vocabulary"
    ],
    status: "softened",
    projectedPages: ["/", "/work/wowlist", "/work/technical-operations", "/resume"],
    protectedBoundaries: [
      "Do not call city activity official chapters.",
      "Do not publish user records, organizer contact lists, raw database exports, private media, hashes, calendar identifiers, or unapproved community artifacts."
    ]
  },
  {
    id: "participation-infrastructure",
    title: "196 Artists Residency / Sunday Dinner",
    publicSummary:
      "Created repeatable hosting, onboarding, facilitation, documentation, and continuity systems for long-running gatherings and resident-artist support.",
    roleFit:
      "Human-systems operations proof: participation infrastructure, onboarding, facilitation, hospitality, continuity, and consent boundaries.",
    approvedWording: [
      "Created repeatable hosting and continuity systems",
      "Created repeatable hosting, onboarding, facilitation, documentation, and continuity systems for long-running gatherings and resident-artist support"
    ],
    status: "softened",
    projectedPages: ["/", "/work/196-sunday-dinner", "/resume"],
    protectedBoundaries: [
      "Do not publish guest lists, attendance records, private addresses, private messages, unapproved photos, or named participants without consent.",
      "Keep exact gathering and resident-artist counts approval-gated for V1 public pages."
    ]
  },
  {
    id: "kc-town-hall-documentation",
    title: "KC Town Hall",
    publicSummary:
      "Supported adaptive reuse planning and public-benefit documentation for a long-vacant historic building in Kansas City.",
    roleFit:
      "Long-horizon implementation proof: built-environment planning, public-benefit framing, stakeholder documentation, public/private boundaries, and funding-process context.",
    approvedWording: [
      "Supported adaptive reuse planning and public-benefit documentation",
      "Supported long-horizon civic / public-benefit coordination"
    ],
    status: "softened",
    projectedPages: ["/work/kc-town-hall", "/work/technical-operations"],
    protectedBoundaries: [
      "Do not claim funding was fully disbursed or redevelopment completed without separate verification.",
      "Do not publish private financial, legal, banking, property, or stakeholder details."
    ]
  },
  {
    id: "source-backed-team-memory",
    title: "Source-Backed Team Memory",
    publicSummary:
      "A bounded source-backed team-memory practice for preserving decisions, open questions, onboarding context, and privacy boundaries without turning private archives into a browsing surface.",
    roleFit:
      "AI-adjacent product-operations proof: human-reviewed AI-assisted documentation, source grounding, attribution, eval design, governance, and privacy-boundary judgment.",
    approvedWording: [
      "Source-backed team-memory lab with human review, governance, evals, and privacy boundaries",
      "AI drafts. Humans review. The shared record remains inspectable and correctable."
    ],
    status: "approved",
    projectedPages: ["/lab/source-backed-team-memory", "/work/technical-operations"],
    protectedBoundaries: [
      "Do not describe it as production SaaS, autonomous trust, legal/compliance automation, or a private archive browser.",
      "Do not imply broad connector ingestion or production security review."
    ]
  },
  {
    id: "ai-evals-training",
    title: "AI Evals for Engineers & PMs",
    publicSummary:
      "Jamie completed AI Evals for Engineers & PMs through Maven, taught by Hamel Husain and Shreya Shankar.",
    roleFit:
      "Professional-development proof for source-grounding, attribution, error analysis, and privacy-boundary evals.",
    approvedWording: [
      "AI evals and error analysis; source-grounding, attribution, and privacy-boundary evals"
    ],
    status: "approved",
    projectedPages: ["/work/technical-operations", "/resume"],
    protectedBoundaries: [
      "Do not overstate as a formal degree or production AI deployment claim.",
      "Do not imply credentialing beyond the completion certificate."
    ]
  }
] satisfies Proof[];

export const homepageProofs = [
  "14+ years building operating structure",
  "Built e-commerce, catalog, and checkout systems for HJE",
  "Built civic campaign-memory infrastructure",
  "Co-built community web systems across multiple city ecosystems",
  "Created repeatable hosting and continuity systems"
] as const;

export const resumeHighlights = [
  "14+ years building operating structure across civic, cultural, small-business, and technical environments",
  "Built and stewarded core e-commerce systems for a legacy industrial business",
  "Built and stewarded civic campaign-memory infrastructure",
  "Co-built community web systems across multiple city ecosystems",
  "Created repeatable hosting and continuity systems for gatherings and artist support"
] as const;

export const operationsProofs = proofs.filter((proof) =>
  [
    "technical-operations",
    "hje-operating-layer",
    "crs-campaign-memory",
    "nac-public-infrastructure",
    "callnyc-open-data",
    "wowlist-community-platform",
    "participation-infrastructure",
    "kc-town-hall-documentation",
    "source-backed-team-memory",
    "ai-evals-training"
  ].includes(proof.id)
);
