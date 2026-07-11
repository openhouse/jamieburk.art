export type VisualCorroborationStatus = "careful";

export type VisualCorroborationSupport = "moderate" | "contextual";

export type VisualCorroborationRecord = {
  id: string;
  status: VisualCorroborationStatus;
  supportLevel: VisualCorroborationSupport;
  sourceClass: "public-safe-visual-archive-summary";
  publicSafeSummary: string;
  supports: string[];
  doesNotEstablish: string[];
  protectedBoundaries: string[];
  relatedClaimIds: string[];
  relatedProjects: string[];
  projectionGuidance: string;
  lastReviewed: string;
};

export const visualCorroborationRecords: VisualCorroborationRecord[] = [
  {
    id: "visual-cross-project-material-practice",
    status: "careful",
    supportLevel: "moderate",
    sourceClass: "public-safe-visual-archive-summary",
    publicSafeSummary:
      "Across civic, cultural, small-business, and technical contexts, the reviewed archive repeatedly shows documents, maps, cards, screens, tools, worktables, public rooms, storefronts, and physical sites as the material layer of Jamie's work.",
    supports: [
      "A cross-project practice of making complex work visible and reviewable",
      "The operating-structure throughline across otherwise different environments"
    ],
    doesNotEstablish: [
      "Authorship of every visible artifact",
      "Formal authority in every depicted setting",
      "Causation of project outcomes"
    ],
    protectedBoundaries: [
      "Unapproved photographs",
      "Private interiors",
      "Identifiable people without approval",
      "Embedded private records"
    ],
    relatedClaimIds: [
      "career-operating-structure-14-years",
      "technical-operations-operating-backbone",
      "reviewable-artifacts-practice"
    ],
    relatedProjects: [],
    projectionGuidance:
      "Use as cross-project corroboration. Pair any public example with a project-specific claim and an approved image or redrawn artifact.",
    lastReviewed: "2026-07-11"
  },
  {
    id: "visual-hje-physical-operations",
    status: "careful",
    supportLevel: "moderate",
    sourceClass: "public-safe-visual-archive-summary",
    publicSafeSummary:
      "Workshop spaces, gauges, mechanical equipment, packaged products, filing systems, storage, and inventory shelves make the physical operating context behind Harry J. Epstein Company's e-commerce work legible.",
    supports: [
      "The work joined digital systems to physical inventory and product knowledge",
      "Legacy operating knowledge had to be translated rather than discarded"
    ],
    doesNotEstablish: [
      "Revenue growth causation",
      "Ownership of every operating system",
      "Authorship or custody of every depicted object"
    ],
    protectedBoundaries: [
      "Customer or order data",
      "Private operating details",
      "Credentials",
      "Unapproved interior photographs"
    ],
    relatedClaimIds: ["hje-modernization-stewardship"],
    relatedProjects: ["harry-j-epstein"],
    projectionGuidance:
      "Use to give physical context to the modernization claim, with stewardship language and approved images only.",
    lastReviewed: "2026-07-11"
  },
  {
    id: "visual-fairrent-public-material-context",
    status: "careful",
    supportLevel: "moderate",
    sourceClass: "public-safe-visual-archive-summary",
    publicSafeSummary:
      "Storefronts, closure notices, neighborhood streets, campaign signs, cultural venues, rallies, and public rooms connect Commercial Rent Stabilization documentation and advocacy to the businesses and cultural spaces at stake.",
    supports: [
      "The campaign work had a concrete storefront and cultural-space context",
      "Jamie's documented participation in collective public advocacy settings"
    ],
    doesNotEstablish: [
      "Solo campaign leadership",
      "Policy authorship or legal authority",
      "Endorsement by every person pictured",
      "Causation of legislative outcomes"
    ],
    protectedBoundaries: [
      "Private coalition strategy",
      "Legal-review material",
      "Unapproved collaborator identities",
      "Images of people without publication approval"
    ],
    relatedClaimIds: [
      "fair-rent-campaign-memory",
      "fair-rent-source-map",
      "nyc-artist-coalition-public-web-infrastructure",
      "nyc-artist-coalition-civic-systems"
    ],
    relatedProjects: ["fair-rent-nyc"],
    projectionGuidance:
      "Use collective-work language. Favor approved public artifacts, storefront context, and public-event images with clear rights.",
    lastReviewed: "2026-07-11"
  },
  {
    id: "visual-callnyc-prototype-context",
    status: "careful",
    supportLevel: "moderate",
    sourceClass: "public-safe-visual-archive-summary",
    publicSafeSummary:
      "Code on a laptop, public presentations, projected diagrams, physical model-making, and people using public information interfaces corroborate CallNYC's prototyping and civic-communication context.",
    supports: [
      "CallNYC existed as a working civic-data prototype",
      "The work involved translating technical material for public explanation and use"
    ],
    doesNotEstablish: [
      "Authorship of every visible line of code",
      "Official City status",
      "Current service availability",
      "Adoption or impact metrics"
    ],
    protectedBoundaries: [
      "Private user information",
      "Unapproved screenshots",
      "Misleading current-service framing"
    ],
    relatedClaimIds: ["callnyc-civic-data-guidance"],
    relatedProjects: ["callnyc"],
    projectionGuidance:
      "Use only with archived, unofficial prototype language and independently verified authorship context.",
    lastReviewed: "2026-07-11"
  },
  {
    id: "visual-wowlist-cultural-distribution-context",
    status: "careful",
    supportLevel: "contextual",
    sourceClass: "public-safe-visual-archive-summary",
    publicSafeSummary:
      "Public programming, speakers, projected interfaces, event rooms, media equipment, books, and editorial sources situate WOWList within a broader cultural-distribution and knowledge-exchange ecology.",
    supports: [
      "The platform's relationship to cultural convening and event information",
      "The lived context around community calendar work"
    ],
    doesNotEstablish: [
      "That every depicted event used WOWList",
      "Platform adoption counts",
      "Current platform activity",
      "Organizer endorsement"
    ],
    protectedBoundaries: [
      "Private user data",
      "Organizer contact information",
      "Unapproved venue or participant images"
    ],
    relatedClaimIds: ["wowlist-community-platform"],
    relatedProjects: ["wowlist"],
    projectionGuidance:
      "Use as contextual evidence only. Keep adoption and product claims tied to their independent source basis.",
    lastReviewed: "2026-07-11"
  },
  {
    id: "visual-sunday-dinner-hosting-infrastructure",
    status: "careful",
    supportLevel: "moderate",
    sourceClass: "public-safe-visual-archive-summary",
    publicSafeSummary:
      "Kitchens, cookware, work surfaces, plants, studio thresholds, notes, tools, and handmade objects show that recurring hospitality depended on preparation, maintenance, atmosphere, and continuity before guests arrived.",
    supports: [
      "Hosting as repeatable participation infrastructure rather than a single event",
      "The practical care work that made recurring gatherings possible"
    ],
    doesNotEstablish: [
      "Gathering or resident counts",
      "Consent from guests or residents",
      "Public availability of the private archive"
    ],
    protectedBoundaries: [
      "Addresses",
      "Guest and resident identities",
      "Private interiors",
      "Intimate gatherings",
      "Unapproved photographs"
    ],
    relatedClaimIds: ["sunday-dinner-196-participation-infrastructure"],
    relatedProjects: ["196-sunday-dinner"],
    projectionGuidance:
      "Prefer approved preparation, object, table, and threshold images. Keep participant histories and intimate scenes private.",
    lastReviewed: "2026-07-11"
  },
  {
    id: "visual-kc-town-hall-site-operations",
    status: "careful",
    supportLevel: "moderate",
    sourceClass: "public-safe-visual-archive-summary",
    publicSafeSummary:
      "Neighborhood context, brick and roof conditions, people working on the roof, a garage with tools and equipment, and material logistics make the long-horizon physical reality of the KC Town Hall site visible.",
    supports: [
      "Adaptive-reuse planning grounded in a specific building and neighborhood",
      "The material and logistical context surrounding long-term project work"
    ],
    doesNotEstablish: [
      "Final funding received",
      "Current property status",
      "Completion of proposed redevelopment",
      "Responsibility for every depicted task"
    ],
    protectedBoundaries: [
      "Private financial information",
      "Legal or property records",
      "Worker identities without approval",
      "Security-sensitive site details"
    ],
    relatedClaimIds: ["kc-town-hall-public-benefit-documentation"],
    relatedProjects: ["kc-town-hall"],
    projectionGuidance:
      "Captions must distinguish existing condition, work performed, proposed reuse, public recommendation, and completed outcome.",
    lastReviewed: "2026-07-11"
  },
  {
    id: "visual-source-backed-reviewable-traces",
    status: "careful",
    supportLevel: "moderate",
    sourceClass: "public-safe-visual-archive-summary",
    publicSafeSummary:
      "Maps, hand-drawn diagrams, sketchbooks, pinned drawings, word cards, signs, and other inspectable traces suggest a recurring practice of moving context and reasoning outside one person's head so it can be reviewed.",
    supports: [
      "A longer practice lineage for source-backed and reviewable working memory",
      "Human-correctable artifacts as part of Jamie's documentation method"
    ],
    doesNotEstablish: [
      "That every artifact belongs to the current lab method",
      "Client deployment",
      "Production SaaS status",
      "Authorship of every visible artifact"
    ],
    protectedBoundaries: [
      "Private source documents",
      "Private collaborator context",
      "Sensitive notes",
      "Unapproved screenshots or photographs"
    ],
    relatedClaimIds: [
      "source-backed-team-memory-method",
      "reviewable-artifacts-practice"
    ],
    relatedProjects: ["source-backed-team-memory"],
    projectionGuidance:
      "Use as method lineage, not product proof. Publish only redrawn, redacted, or independently approved artifacts.",
    lastReviewed: "2026-07-11"
  }
];

export function getVisualCorroborationById(
  id: string
): VisualCorroborationRecord | undefined {
  return visualCorroborationRecords.find((record) => record.id === id);
}
