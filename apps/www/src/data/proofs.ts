export type ApprovalStatus =
  | "approved"
  | "approval-required"
  | "summary-only"
  | "protected";

export type SupportLevel =
  | "strong-public"
  | "public-safe-summary"
  | "internal-source"
  | "needs-review";

export type ProofClaim = {
  id: string;
  claim: string;
  publicUse: string;
  supportLevel: SupportLevel;
  sourceBasis: string[];
  approvalStatus: ApprovalStatus;
  projection: {
    homepage?: string;
    resume?: string;
    workPages?: string[];
    technicalOperations?: string;
    lab?: string;
  };
  nonPublicBoundary: string[];
};

export const proofClaims = [
  {
    id: "PB-001",
    claim:
      "Jamie has 14+ years creating operating structure across civic, cultural, small-business, and technical environments.",
    publicUse: "Broad profile, homepage, resume, and technical operations framing.",
    supportLevel: "public-safe-summary",
    sourceBasis: [
      "Approved resume text",
      "Selected work chronology",
      "Public-safe case-study summaries"
    ],
    approvalStatus: "summary-only",
    projection: {
      homepage: "14+ years creating operating structure across civic, cultural, small-business, and technical environments.",
      resume: "14+ years creating operating structure across civic, cultural, small-business, and technical environments.",
      technicalOperations:
        "Long-running work across e-commerce, civic documentation, community infrastructure, open-data prototypes, and source-backed team-memory practice shows repeated delivery coordination and implementation judgment."
    },
    nonPublicBoundary: [
      "Do not use as a substitute for concrete project proof.",
      "Tie to selected work examples where space allows."
    ]
  },
  {
    id: "PB-HJE-001",
    claim:
      "Jamie led or supported web, e-commerce, marketing, analytics, content, and operations improvements for Harry J. Epstein Company.",
    publicUse: "Harry J. Epstein case study, resume, selected impact, and technical operations proof.",
    supportLevel: "public-safe-summary",
    sourceBasis: [
      "Approved resume text",
      "Harry J. Epstein public website",
      "Public coverage of online-store transition"
    ],
    approvalStatus: "summary-only",
    projection: {
      homepage: "Modernized e-commerce, analytics, content, marketing, and operations workflows for a legacy industrial business.",
      resume: "Led web, e-commerce, marketing, analytics, and operations improvements for Harry J. Epstein Company.",
      workPages: ["harry-j-epstein"],
      technicalOperations:
        "HJE shows pragmatic implementation across legacy catalog knowledge, dealer-pricing practices, customer language, online sales, analytics, marketing, and operational handoffs."
    },
    nonPublicBoundary: [
      "No private analytics dashboards.",
      "No internal revenue detail.",
      "No credentials, customer data, vendor terms, or client-sensitive workflows."
    ]
  },
  {
    id: "PB-HJE-002",
    claim:
      "Jamie contributed to a period of 2x revenue growth for a legacy e-commerce business.",
    publicUse: "Harry J. Epstein page only unless Jamie explicitly approves homepage use.",
    supportLevel: "internal-source",
    sourceBasis: ["Approved resume text", "Internal business context held offline"],
    approvalStatus: "summary-only",
    projection: {
      resume:
        "Contributed to 2x revenue growth while helping an 80+ year-old legacy industrial business adapt to e-commerce.",
      workPages: ["harry-j-epstein"]
    },
    nonPublicBoundary: [
      "Use 'contributed to a period of 2x revenue growth.'",
      "Do not say caused, owned, or solely produced.",
      "Do not publish revenue breakdowns or dashboards."
    ]
  },
  {
    id: "PB-CRS-001",
    claim:
      "Jamie helped structure shared campaign memory, source maps, decision/action records, policy questions, public-data framing, and follow-up systems for Commercial Rent Stabilization collaboration work.",
    publicUse: "FairRentNYC / CRS page, technical operations proof, and civic documentation positioning.",
    supportLevel: "public-safe-summary",
    sourceBasis: [
      "FairRentNYC public campaign materials",
      "Public-safe running-minutes summary",
      "Commercial Rent Stabilization collaboration materials held offline"
    ],
    approvalStatus: "summary-only",
    projection: {
      homepage: "Structured shared campaign memory, source maps, action records, and public-data framing for Commercial Rent Stabilization collaboration.",
      resume:
        "Built and stewarded 30+ pages of shared campaign-memory and coordination infrastructure for Commercial Rent Stabilization collaboration.",
      workPages: ["fair-rent-nyc"],
      technicalOperations:
        "Commercial Rent Stabilization work shows meeting synthesis, action tracking, source maps, decision records, review lanes, and public/private boundary judgment for active civic collaboration."
    },
    nonPublicBoundary: [
      "No legal advice claim.",
      "No raw coalition notes.",
      "No private stakeholder lists.",
      "No legal-review materials.",
      "No active strategy details."
    ]
  },
  {
    id: "PB-WOW-001",
    claim:
      "WOWList reached roughly 35 city ecosystems through local arts and DIY organizer adoption.",
    publicUse: "WOWList page; homepage only if Jamie approves.",
    supportLevel: "internal-source",
    sourceBasis: ["WOWList local archive aggregate analysis held offline"],
    approvalStatus: "summary-only",
    projection: {
      resume:
        "Co-built WOWList.org, a Python / Django and Ember.js community-calendar platform adopted across roughly 35 city ecosystems.",
      workPages: ["wowlist"],
      technicalOperations:
        "WOWList shows product operations for a real public platform: community vocabulary, event workflows, follows, saves, digest emails, calendar sync, and low-cost deployment."
    },
    nonPublicBoundary: [
      "Use roughly.",
      "Do not say official chapters.",
      "Do not say active today.",
      "Do not say millions of users.",
      "Do not publish raw user or database records."
    ]
  },
  {
    id: "PB-196-001",
    claim:
      "Jamie created repeatable invitation, hosting, onboarding, documentation, and continuity systems across 300+ gatherings and 20+ resident artists.",
    publicUse: "Summary-only 196 / Sunday Dinner page and resume impact.",
    supportLevel: "internal-source",
    sourceBasis: ["Public-safe Sunday Dinner / 196 aggregate records held offline"],
    approvalStatus: "summary-only",
    projection: {
      homepage: "Created repeatable invitation, hosting, onboarding, documentation, and continuity systems across 300+ gatherings and 20+ resident artists.",
      resume:
        "Created repeatable hosting and continuity systems across 300+ gatherings and 20+ resident artists.",
      workPages: ["196-sunday-dinner"],
      technicalOperations:
        "Sunday Dinner / 196 shows operations for high-trust human systems: invitation, onboarding, facilitation, scheduling, documentation, follow-through, and continuity without overexposing the community."
    },
    nonPublicBoundary: [
      "No attendee names.",
      "No resident names.",
      "No addresses.",
      "No guest records.",
      "No contact data.",
      "No private logistics.",
      "No photos without consent."
    ]
  },
  {
    id: "PB-KC-001",
    claim:
      "KC Town Hall was recommended for a $490,539 public-funding recommendation connected to adaptive-reuse planning and public-benefit documentation.",
    publicUse: "KC Town Hall page only with collective-work language.",
    supportLevel: "strong-public",
    sourceBasis: ["Kansas City public legislative record for File 190649"],
    approvalStatus: "summary-only",
    projection: {
      workPages: ["kc-town-hall"],
      technicalOperations:
        "KC Town Hall shows long-horizon implementation work where adaptive reuse, public benefit, funding context, stakeholder communication, and protected deal details had to be kept distinct."
    },
    nonPublicBoundary: [
      "Use 'the project was recommended for.'",
      "Do not say Jamie solely secured funding.",
      "Do not say Jamie led redevelopment without collaborator approval.",
      "Do not publish banking, legal, property, partner-sensitive, or finance-sensitive records."
    ]
  },
  {
    id: "PB-SBTM-001",
    claim:
      "Jamie developed a bounded source-backed team-memory practice for turning selected meetings, documents, and product conversations into human-reviewed decision records, onboarding context, open questions, governance notes, eval checks, and next steps.",
    publicUse: "Lab page, contact page, and technical operations page.",
    supportLevel: "public-safe-summary",
    sourceBasis: [
      "Source-Backed Team Memory proposal",
      "Noting.us product brief / system spec",
      "Public-safe working materials held offline"
    ],
    approvalStatus: "summary-only",
    projection: {
      lab:
        "Source-Backed Team Memory turns selected meetings, documents, and product conversations into human-reviewed decision records, onboarding context, open questions, governance notes, eval checks, and next steps.",
      technicalOperations:
        "The lab connects documentation architecture, human review, AI eval discipline, decision records, onboarding context, and governance for knowledge-heavy teams."
    },
    nonPublicBoundary: [
      "Lab / method only.",
      "Not production SaaS.",
      "Not client-adopted at scale.",
      "Not an autonomous AI system.",
      "Not a private archive browser."
    ]
  },
  {
    id: "PB-AI-EVALS-001",
    claim:
      "Jamie completed AI Evals for Engineers & PMs with Shreya Shankar and Hamel Husain / Maven in 2026.",
    publicUse: "Resume, technical operations page, and lab page.",
    supportLevel: "strong-public",
    sourceBasis: ["Completion certificate dated 2026"],
    approvalStatus: "approved",
    projection: {
      resume:
        "Completed AI Evals for Engineers & PMs with Shreya Shankar and Hamel Husain / Maven in 2026.",
      lab:
        "Training proof for application-centric evals, error analysis, annotation workflows, traces, retrieval quality, and human-in-the-loop evaluation practice.",
      technicalOperations:
        "AI Evals training supports the lab's emphasis on reviewable evidence, error analysis, correction loops, and human judgment."
    },
    nonPublicBoundary: [
      "Training proof only.",
      "Not a substitute for shipped AI production track record."
    ]
  }
] satisfies ProofClaim[];

export const homepageProofClaims = proofClaims
  .filter((claim) => claim.projection.homepage)
  .map((claim) => ({
    id: claim.id,
    label: claim.id.replace("PB-", "").replace("-001", "").replace("-002", ""),
    text: claim.projection.homepage as string
  }));

export const resumeProofHighlights = proofClaims
  .map((claim) => claim.projection.resume)
  .filter((claim): claim is string => Boolean(claim));

export type TechnicalOperationsProof = {
  id: string;
  claim: string;
  proof: string;
  supportLevel: SupportLevel;
  approvalStatus: ApprovalStatus;
};

export const technicalOperationsProofs: TechnicalOperationsProof[] = proofClaims.flatMap(
  (claim) => {
    if (!claim.projection.technicalOperations) return [];
    return [
      {
        id: claim.id,
        claim: claim.claim,
        proof: claim.projection.technicalOperations,
        supportLevel: claim.supportLevel,
        approvalStatus: claim.approvalStatus
      }
    ];
  }
);
