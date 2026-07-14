import type {
  CitationPage,
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedBy = ["Jamie Burkart", "Codex public-source review"];

export const kcTownHallCouncilRecordBatch20260713: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchInquiries: ResearchInquiry[];
  pages: CitationPage[];
} = {
  intake: [
    {
      id: "INT-KCTH-KCMO-RESOLUTION-190649",
      kind: "claim-lead",
      capturedAt: "2026-07-13",
      capturedFrom: "Jamie Burkart portfolio working session",
      publicSafeSummary:
        "Verify and preserve the municipal action that followed the CCED Board's KC Town Hall funding recommendation.",
      projects: ["kc-town-hall"],
      status: "integrated",
      disposition: "source-created",
      sourceIds: [
        "SRC-KCTH-KCMO-LEGISTAR-190649",
        "SRC-KCTH-KCMO-AUTHENTICATED-190649"
      ],
      claimIds: ["CLM-KCTH-COUNCIL-APPROVAL-190649"],
      researchTaskIds: [],
      notes: [
        "The official record supports Council acceptance and authorization to negotiate; it does not by itself establish an executed agreement, disbursement, project completion, or Jamie's sole causation."
      ],
      reviewedAt: "2026-07-13",
      reviewedBy
    },
    {
      id: "INT-KCTH-MISSION-ALIGNED-HANDOFF-2026",
      kind: "recollection",
      capturedAt: "2026-07-14",
      capturedFrom: "Jamie Burkart portfolio working session",
      publicSafeSummary:
        "Jamie transitioned KC Town Hall to a mission-aligned organization when his stewardship concluded.",
      projects: ["kc-town-hall"],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: ["SRC-KCTH-JAMIE-HANDOFF-ATTESTATION-2026"],
      claimIds: ["CLM-KCTH-MISSION-ALIGNED-HANDOFF"],
      researchTaskIds: [],
      notes: [
        "Scope is limited to the professional handoff; recipient identity, timing, terms, and present status remain unverified and unprojected."
      ],
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex public-safe review"]
    }
  ],
  sources: [
    {
      id: "SRC-KCTH-KCMO-LEGISTAR-190649",
      title: "Legislation Details: Resolution 190649",
      organization: "City of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-09-26",
      accessedAt: "2026-07-13",
      canonicalUrl:
        "https://kansascity.legistar.com/LegislationDetail.aspx?ID=5515936&GUID=44A50FFC-321A-41C7-9A86-6ADD9083B156&G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&Options=&Search=",
      preferredPublicUrl: "canonical",
      publicCitation:
        "City of Kansas City, Missouri, Resolution 190649 legislative record, adopted as substituted September 26, 2019.",
      publicNote:
        "The legislative history records Council adoption and links the fiscal note, fact sheet, presentation, speaker cards, and authenticated resolution.",
      supportsGenerally: [
        "Resolution 190649",
        "Council action on September 26, 2019",
        "adopted as substituted status",
        "acceptance of the CCED Board recommendation",
        "$490,539 funding-agreement authorization"
      ],
      doesNotEstablish: [
        "an executed funding agreement",
        "disbursement or receipt of funds",
        "project completion",
        "Jamie's sole responsibility for the Council action"
      ]
    },
    {
      id: "SRC-KCTH-KCMO-AUTHENTICATED-190649",
      title: "Second Committee Substitute for Resolution No. 190649",
      organization: "City of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-09-26",
      accessedAt: "2026-07-13",
      assetUrl:
        "https://kansascity.legistar.com/View.ashx?M=F&ID=10628240&GUID=2CBC09C0-65EC-4F05-A70F-FCD8E4F7FBE3&G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A",
      preferredPublicUrl: "asset",
      publicCitation:
        "City of Kansas City, Missouri, Second Committee Substitute for Resolution No. 190649, authenticated as passed September 26, 2019.",
      publicNote:
        "The authenticated resolution records the CCED Board's July 16, 2019 vote, accepts its recommendation for an amount not to exceed $490,539, and authorizes funding-agreement negotiations subject to stated public-benefit conditions.",
      supportsGenerally: [
        "the CCED Board's July 16, 2019 recommendation vote",
        "Council acceptance of up to $490,539 in CCED sales-tax funding",
        "authorization to negotiate a funding agreement",
        "public-benefit conditions for eligible project costs"
      ],
      doesNotEstablish: [
        "that a funding agreement was executed",
        "that CCED funds were disbursed or received",
        "that every proposed project element was completed",
        "that Jamie alone secured the Council action"
      ]
    },
    {
      id: "SRC-KCTH-JAMIE-HANDOFF-ATTESTATION-2026",
      title: "Jamie Burkart KC Town Hall handoff confirmation",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-14",
      publicCitation:
        "Jamie Burkart, first-person confirmation of the KC Town Hall project handoff, July 14, 2026. Underlying context not published.",
      supportsGenerally: [
        "Jamie transitioned KC Town Hall to a mission-aligned organization when his stewardship concluded"
      ],
      doesNotEstablish: [
        "the recipient organization's identity",
        "the handoff date or terms",
        "the project's present status under the receiving organization"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-KCTH-CCED-BOARD-RECOMMENDATION-190649",
      sourceId: "SRC-KCTH-KCMO-AUTHENTICATED-190649",
      project: "kc-town-hall",
      assertion:
        "The authenticated resolution states that the CCED Board voted on July 16, 2019, to recommend $490,539 in CCED sales-tax funding for costs associated with KC Town Hall.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-COUNCIL-APPROVAL-190649"],
      publicSafe: true,
      reviewedAt: "2026-07-13",
      reviewedBy
    },
    {
      id: "AST-KCTH-COUNCIL-ADOPTION-190649",
      sourceId: "SRC-KCTH-KCMO-LEGISTAR-190649",
      project: "kc-town-hall",
      assertion:
        "Kansas City's legislative history records Resolution 190649 as adopted as substituted by the Council on September 26, 2019.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-COUNCIL-APPROVAL-190649"],
      publicSafe: true,
      reviewedAt: "2026-07-13",
      reviewedBy
    },
    {
      id: "AST-KCTH-COUNCIL-ACCEPTANCE-190649",
      sourceId: "SRC-KCTH-KCMO-AUTHENTICATED-190649",
      project: "kc-town-hall",
      assertion:
        "Section 1 of Resolution 190649 accepts the CCED Board's recommendation that up to $490,539 in CCED sales-tax revenues be used for eligible KC Town Hall project costs.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-COUNCIL-APPROVAL-190649"],
      publicSafe: true,
      reviewedAt: "2026-07-13",
      reviewedBy
    },
    {
      id: "AST-KCTH-FUNDING-AGREEMENT-BOUNDARY-190649",
      sourceId: "SRC-KCTH-KCMO-AUTHENTICATED-190649",
      project: "kc-town-hall",
      assertion:
        "Resolution 190649 authorizes the City Manager to negotiate a funding agreement with conditions; the resolution alone does not establish execution, disbursement, receipt, or completion.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-COUNCIL-APPROVAL-190649"],
      publicSafe: true,
      reviewedAt: "2026-07-13",
      reviewedBy
    },
    {
      id: "AST-KCTH-MISSION-ALIGNED-HANDOFF",
      sourceId: "SRC-KCTH-JAMIE-HANDOFF-ATTESTATION-2026",
      project: "kc-town-hall",
      assertion:
        "Jamie states that he transitioned KC Town Hall to a mission-aligned organization when his stewardship concluded.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-KCTH-MISSION-ALIGNED-HANDOFF"],
      publicSafe: true,
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex public-safe review"]
    }
  ],
  claims: [
    {
      id: "CLM-KCTH-COUNCIL-APPROVAL-190649",
      project: "kc-town-hall",
      internalClaim:
        "After the CCED Board voted on July 16, 2019, to recommend $490,539 for KC Town Hall, the Kansas City Council adopted Resolution 190649 on September 26, accepting up to that amount for eligible costs and authorizing the City Manager to negotiate a funding agreement.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "After the CCED Board recommended $490,539 for KC Town Hall, the Kansas City Council adopted Resolution 190649 on September 26, 2019, accepting the recommendation and authorizing funding-agreement negotiations for an amount not to exceed $490,539.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-KCMO-AUTHENTICATED-190649",
          relationship: "direct-support",
          supports: [
            "CCED Board recommendation vote",
            "Council acceptance",
            "amount not to exceed $490,539",
            "funding-agreement negotiation authority"
          ],
          locator: "Preamble and Sections 1-3",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCTH-KCMO-LEGISTAR-190649",
          relationship: "corroborating",
          supports: [
            "Resolution number",
            "September 26, 2019 Council action",
            "adopted as substituted status"
          ],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Credit the CCED Board for the recommendation and the Kansas City Council for the resolution; describe Jamie's planning and documentation role separately.",
        "Council acceptance and authority to negotiate are not evidence that an agreement was executed, funds were disbursed or received, or the project was completed."
      ],
      antiClaims: [
        "Jamie alone secured the Council action",
        "Resolution 190649 proves that KC Town Hall received $490,539",
        "The funding agreement was executed",
        "The project was completed as proposed"
      ],
      researchInquiryIds: ["INQ-KCTH-COUNCIL-ACTION-190649-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy
    },
    {
      id: "CLM-KCTH-MISSION-ALIGNED-HANDOFF",
      project: "kc-town-hall",
      internalClaim:
        "Jamie reports that, when his KC Town Hall stewardship concluded, he transitioned the project to a mission-aligned organization.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "When Jamie's stewardship of KC Town Hall concluded, he transitioned the project to a mission-aligned organization.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-JAMIE-HANDOFF-ATTESTATION-2026",
          relationship: "direct-support",
          supports: ["Jamie's first-person account of the mission-aligned handoff"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Present this as Jamie's first-person account unless a public organizational record or collaborator corroboration is added.",
        "Do not identify the recipient organization, infer the handoff date or terms, describe private transition context, or claim present-day project status."
      ],
      antiClaims: [
        "The recipient organization is identified by this record",
        "The handoff terms or date are established",
        "The receiving organization's present operations are established",
        "Private transition context belongs in the public portfolio"
      ],
      researchInquiryIds: [],
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex public-safe review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-KCTH-COUNCIL-ACTION-190649-2026",
      project: "kc-town-hall",
      question:
        "What municipal action followed the CCED Board's KC Town Hall funding recommendation?",
      methods: [
        "Recovered the official Kansas City Legistar record and authenticated resolution from Jamie's public-web archive.",
        "Verified that the official legislative page remained live on July 13, 2026.",
        "Visually reviewed all three pages of the authenticated resolution and separated recommendation, Council action, negotiation authority, and disbursement status."
      ],
      runAt: "2026-07-13",
      resultStatus: "recovered",
      findings: [
        "The CCED Board voted on July 16, 2019, to recommend $490,539 for eligible KC Town Hall project costs.",
        "The Kansas City Council adopted Resolution 190649 as substituted on September 26, 2019.",
        "The resolution accepted the recommendation for an amount not to exceed $490,539 and authorized funding-agreement negotiations subject to public-benefit conditions."
      ],
      limitations: [
        "The reviewed resolution does not itself establish an executed funding agreement or disbursement and receipt of funds.",
        "The municipal record establishes institutional action, not Jamie's sole causation or the current status of the property or project."
      ],
      sourceIds: [
        "SRC-KCTH-KCMO-LEGISTAR-190649",
        "SRC-KCTH-KCMO-AUTHENTICATED-190649"
      ],
      publicSummary:
        "Official Kansas City records confirm that the Council adopted Resolution 190649 after the CCED Board's recommendation, accepting up to $490,539 for eligible KC Town Hall costs and authorizing funding-agreement negotiations."
    }
  ],
  pages: [
    {
      id: "kc-town-hall",
      surface: "/work/kc-town-hall",
      sourceOrder: [
        "SRC-KCTH-KCMO-AUTHENTICATED-190649",
        "SRC-KCTH-KCMO-LEGISTAR-190649"
      ],
      occurrences: [
        {
          id: "cced-council-approval",
          claimId: "CLM-KCTH-COUNCIL-APPROVAL-190649",
          projection: "case-study",
          sourceIds: [
            "SRC-KCTH-KCMO-AUTHENTICATED-190649",
            "SRC-KCTH-KCMO-LEGISTAR-190649"
          ]
        }
      ]
    }
  ]
};
