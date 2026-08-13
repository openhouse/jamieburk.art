import type { KnowledgeBank } from "./schema.ts";

const reviewedAt = "2026-08-11";
const jobSourceId = "SRC-NYC-OTI-SENIOR-PRODUCT-MANAGER-782366";
const claimId = "CLM-WOWLIST-SENIOR-PRODUCT-PRACTICE-2026";
const inquiryId = "INQ-WOWLIST-OTI-SENIOR-PRODUCT-GAPS-2026";

const intakeItems: KnowledgeBank["intakeItems"] = [
  {
    id: "INTAKE-WOWLIST-OTI-SENIOR-PRODUCT-FIT-2026",
    kind: "analysis-note",
    title: "WOW List and NYC OTI Senior Product Manager fit",
    submittedAt: reviewedAt,
    submittedBy: "Jamie Burkart and Codex source-backed application review",
    projectIds: ["wowlist"],
    reason: "Map established WOW List product practice to the official role without converting evidence into employer endorsement, automatic eligibility, accessibility compliance, or sole credit.",
    sourceUrl: "https://cityjobs.nyc.gov/job/senior-product-manager-in-brooklyn-jid-44507",
    visibility: "public-safe",
    disposition: "integrated",
    sourceIds: [
      jobSourceId,
      "SRC-WOWLIST-SUNDAY-DINNER-POST-2014",
      "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016",
      "SRC-WOWLIST-X-POPULATION-MANIFEST",
      "SRC-WOWLIST-PRODUCTION-DATABASE-2017-07-22"
    ],
    observationIds: [
      "OBS-OTI-SENIOR-PRODUCT-MANAGER-REQUIREMENTS-2026",
      "OBS-WOWLIST-SENIOR-PRODUCT-PRACTICE-2026"
    ],
    researchInquiryIds: [inquiryId],
    boundaries: [
      "Separate demonstrated product practice from civil-service eligibility and employer selection.",
      "Preserve Jamie and Richard Caceres's shared builder credit and the constitutive labor of editors, facilitators, organizers, maintainers, and participants.",
      "Do not claim historical WCAG 2.1 AA, Section 508, security-review, or government-compliance evidence that has not been recovered."
    ]
  }
];

const observations: KnowledgeBank["observations"] = [
  {
    id: "OBS-OTI-SENIOR-PRODUCT-MANAGER-REQUIREMENTS-2026",
    intakeId: "INTAKE-WOWLIST-OTI-SENIOR-PRODUCT-FIT-2026",
    sourceId: jobSourceId,
    comparisonSourceIds: [],
    project: "wowlist",
    kind: "source-fact",
    text: "NYC OTI Job ID 782366 asks a Senior Product Manager to carry resident-facing products from problem framing through public launch, coordinate discovery and cross-functional delivery, address production quality and compliance, define measurement, support rollout, and preserve institutional knowledge.",
    locator: "Official posting sections What You'll Do and Preferred Skills.",
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "The posting describes the employer's requirements; it does not assess Jamie or promise selection.",
      "The separate civil-service minimum must be verified against Jamie's full education and employment record."
    ]
  },
  {
    id: "OBS-WOWLIST-SENIOR-PRODUCT-PRACTICE-2026",
    intakeId: "INTAKE-WOWLIST-OTI-SENIOR-PRODUCT-FIT-2026",
    sourceId: "SRC-WOWLIST-X-POPULATION-MANIFEST",
    comparisonSourceIds: [
      "SRC-WOWLIST-SUNDAY-DINNER-POST-2014",
      "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016",
      "SRC-WOWLIST-PRODUCTION-DATABASE-2017-07-22"
    ],
    project: "wowlist",
    kind: "bounded-inference",
    text: "The combined public-safe WOW List record supports unusually broad senior product practice across problem framing, a shipped multi-user service, participatory discovery, organizer adoption, public communication, instrumentation, and long-term stewardship.",
    locator: "Public social provenance and support records; bounded July 2017 production aggregates.",
    status: "corroborated",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "The evidence supports a strong fit interpretation, not an employer endorsement or hiring outcome.",
      "WOW List alone does not establish formal agency, policy, legal, executive, procurement, personnel-management, or accessibility-compliance experience."
    ]
  }
];

const sources: KnowledgeBank["sources"] = [
  {
    id: jobSourceId,
    title: "NYC OTI Senior Product Manager, Job ID 782366",
    organization: "New York City Office of Technology and Innovation",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2026-06-15",
    accessedAt: reviewedAt,
    canonicalUrl: "https://cityjobs.nyc.gov/job/senior-product-manager-in-brooklyn-jid-44507",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Office of Technology and Innovation, Senior Product Manager, Job ID 782366, accessed August 11, 2026.",
    publicNote: "Official requirements and civil-service minimum as displayed during the application window.",
    supportsGenerally: [
      "official role identity and duties",
      "preferred product-management experience",
      "civil-service minimum qualification language",
      "accessibility and public-launch expectations"
    ],
    doesNotEstablish: [
      "Jamie's eligibility",
      "Jamie's selection",
      "an employer endorsement",
      "historical WOW List accessibility compliance"
    ]
  }
];

const claims: KnowledgeBank["claims"] = [
  {
    id: claimId,
    project: "wowlist",
    internalClaim: "WOW List provides unusually strong evidence of Jamie Burkart's senior product practice because the surviving record joins end-to-end technical delivery with participatory discovery, adoption, communication, instrumentation, and long-term stewardship.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "case-study",
        text: "WOW List provides unusually broad evidence of Jamie's product practice: Jamie and Richard Caceres co-built a working community-calendar service, and Jamie's documented work connects product definition and implementation with participatory discovery, organizer adoption, public communication, historical production instrumentation, and long-term stewardship.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/wowlist"]
      },
      {
        key: "archive-note",
        text: "WOW List provides unusually broad evidence of Jamie's senior product practice: he and Richard Caceres co-built a working community-calendar service, and Jamie's documented work spans product definition, implementation, participatory discovery, adoption, communications, instrumentation, and stewardship.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/applications/wowlist-senior-product-manager-oti-782366"]
      }
    ],
    evidence: [
      { sourceId: jobSourceId, relationship: "context", supports: ["role requirements and screens"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-X-POPULATION-MANIFEST", relationship: "direct-support", supports: ["bounded public operating record and organizer workflows"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-SUNDAY-DINNER-POST-2014", relationship: "direct-support", supports: ["shared Richard and Jamie credit", "Sunday Dinner provenance"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016", relationship: "direct-support", supports: ["join, publishing, profile, and followed-calendar workflows"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-PARTICIPATION-CONTINUITY-CONTROLS-2026", relationship: "corroborating", supports: ["public-safe historical production aggregates"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-WOWLIST-PRODUCTION-DATABASE-2017-07-22", relationship: "corroborating", supports: ["historical production scale and instrumentation"], confidence: "high", renderCitation: false }
    ],
    boundaries: [
      "A strong product-practice match does not guarantee an award or substitute for employer evaluation.",
      "Civil-service eligibility requires a separate human review of Jamie's complete education and employment chronology.",
      "Accessibility, security, and government-compliance experience must not be inferred from production operation alone.",
      "Preserve Richard Caceres's co-builder credit and wider collective labor."
    ],
    antiClaims: [
      "Jamie is guaranteed the job award.",
      "Jamie automatically meets the civil-service minimum qualifications.",
      "WOW List proves WCAG 2.1 AA, Section 508, or other accessibility compliance.",
      "Jamie was the sole builder or sole cause of WOW List's community outcomes."
    ],
    researchInquiryIds: [inquiryId],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex source-backed application review"]
  }
];

const researchInquiries: KnowledgeBank["researchInquiries"] = [
  {
    id: inquiryId,
    project: "wowlist",
    question: "Which evidence outside WOW List establishes Jamie's civil-service eligibility, formal accessibility practice, government stakeholder work, personnel leadership, and measurable resident outcomes for Job ID 782366?",
    methods: [
      "Mapped each official role responsibility to public-safe WOW List claims.",
      "Separated demonstrated practice, partial adjacency, and unresolved requirements.",
      "Registered unsupported qualifications as gaps rather than converting them into inferred experience."
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "WOW List strongly supports end-to-end product, discovery, implementation, adoption, communication, instrumentation, and documentation practice.",
      "The civil-service screen and several government-specific preferred qualifications require evidence from Jamie's complete record and other projects."
    ],
    limitations: [
      "This inquiry does not decide eligibility, hiring, reference outcomes, or portfolio approval.",
      "The job posting may close or change after the recorded access date."
    ],
    sourceIds: [jobSourceId, "SRC-WOWLIST-X-POPULATION-MANIFEST", "SRC-WOWLIST-PRODUCTION-DATABASE-2017-07-22"],
    publicSummary: "WOW List establishes a strong senior-product match while civil-service eligibility, formal accessibility evidence, and government-specific responsibilities remain explicit human-review gaps."
  }
];

export const wowListProductFitAugust2026 = {
  intakeItems,
  observations,
  sources,
  claims,
  researchInquiries
};
