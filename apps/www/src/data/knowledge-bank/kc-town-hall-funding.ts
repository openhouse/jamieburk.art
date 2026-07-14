const reviewedAt = "2026-07-13";

export const kcTownHallFunding = {
  intakeItems: [
    {
      id: "INTAKE-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE",
      kind: "memory-lead",
      title: "KC Town Hall CCED recommendation and Council allocation",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["kc-town-hall"],
      reason: "Verify and preserve the public record that the Kansas City Council acted on the CCED Board recommendation, while distinguishing appropriation from disbursement and retaining the later project status.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-KCTH-CCED-FACT-SHEET-190649",
        "SRC-KCTH-RESOLUTION-190649",
        "SRC-KCTH-ORDINANCE-190642",
        "SRC-KCTH-CCED-PROJECT-UPDATE-2022-05-10",
        "SRC-KCTH-ORDINANCE-240317"
      ],
      observationIds: [
        "OBS-KCTH-CCED-BOARD-RECOMMENDATION",
        "OBS-KCTH-COUNCIL-ACCEPTED-RECOMMENDATION",
        "OBS-KCTH-COUNCIL-AUTHORIZED-NEGOTIATION",
        "OBS-KCTH-COUNCIL-APPROPRIATED-FUNDS",
        "OBS-KCTH-ZERO-DISBURSEMENT-2022",
        "OBS-KCTH-CONTRACT-EXECUTION-PENDING-2022",
        "OBS-KCTH-PROJECT-WITHDREW-2024",
        "OBS-KCTH-COUNCIL-REAPPROPRIATED-FUNDS-2024"
      ],
      researchInquiryIds: ["INQ-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE"],
      boundaries: [
        "Council acceptance and appropriation do not establish execution of a funding agreement, transfer of money to KC Town Hall, or completion of the development.",
        "The public action was a collective project milestone and does not establish that Jamie alone secured it.",
        "Later project status belongs in the same record so a historical approval cannot be mistaken for a completed award."
      ]
    },
    {
      id: "INTAKE-KCTH-STEWARDSHIP-TRANSITION",
      kind: "memory-lead",
      title: "KC Town Hall stewardship transition",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["kc-town-hall"],
      reason: "Preserve Jamie's first-person account that he transitioned the project to a mission-aligned organization without exposing private circumstances or overstating what the City funding records establish.",
      visibility: "public-safe",
      disposition: "captured",
      sourceIds: [],
      observationIds: ["OBS-KCTH-STEWARDSHIP-TRANSITION-LEAD"],
      researchInquiryIds: ["INQ-KCTH-STEWARDSHIP-TRANSITION"],
      boundaries: [
        "Retain the professional continuity action without recording private causal context.",
        "Do not name the recipient organization without a separate accuracy, consent, and public-use decision.",
        "Do not project the transition on the website until its wording and support are reviewed separately from the City funding record."
      ]
    }
  ],

  observations: [
    {
      id: "OBS-KCTH-CCED-BOARD-RECOMMENDATION",
      intakeId: "INTAKE-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE",
      sourceId: "SRC-KCTH-CCED-FACT-SHEET-190649",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "At its July 16, 2019 meeting, the CCED Sales Tax Board voted to recommend $490,539 in funding for the KC Town Hall project.",
      locator: "Resolution 190649 fact sheet, Discussion, page 1",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-COUNCIL-APPROVAL-AND-APPROPRIATION-2019"],
      researchInquiryIds: ["INQ-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE"],
      limitations: [
        "The Board recommendation was not itself the Council action, a funding agreement, a disbursement, or a completed development."
      ]
    },
    {
      id: "OBS-KCTH-COUNCIL-ACCEPTED-RECOMMENDATION",
      intakeId: "INTAKE-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE",
      sourceId: "SRC-KCTH-RESOLUTION-190649",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "On September 26, 2019, the Kansas City Council adopted Resolution 190649 as substituted, accepting the CCED Board recommendation of $490,539 for KC Town Hall.",
      locator: "Legislation title and Council history entry dated September 26, 2019",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-COUNCIL-APPROVAL-AND-APPROPRIATION-2019"],
      researchInquiryIds: ["INQ-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE"],
      limitations: [
        "The public history records adoption but does not expose a member-by-member roll-call tally.",
        "Council acceptance was not itself an appropriation, executed agreement, or payment."
      ]
    },
    {
      id: "OBS-KCTH-COUNCIL-AUTHORIZED-NEGOTIATION",
      intakeId: "INTAKE-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE",
      sourceId: "SRC-KCTH-RESOLUTION-190649",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "Resolution 190649 authorized the City Manager to negotiate a funding agreement for the KC Town Hall project.",
      locator: "Legislation title",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-COUNCIL-APPROVAL-AND-APPROPRIATION-2019"],
      researchInquiryIds: ["INQ-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE"],
      limitations: [
        "Authorization to negotiate a funding agreement does not establish that an agreement was executed."
      ]
    },
    {
      id: "OBS-KCTH-COUNCIL-APPROPRIATED-FUNDS",
      intakeId: "INTAKE-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE",
      sourceId: "SRC-KCTH-ORDINANCE-190642",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "On September 26, 2019, the Council passed Committee Substitute for Ordinance 190642, which appropriated $490,539 for KC Town Hall to a Central City Sales Tax project account.",
      locator: "Authenticated ordinance, section 2 and KC Town Hall award row, pages 1-2",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-COUNCIL-APPROVAL-AND-APPROPRIATION-2019"],
      researchInquiryIds: ["INQ-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE"],
      limitations: [
        "An appropriation places funds in a City account; it does not establish disbursement to the project or completion of the work."
      ]
    },
    {
      id: "OBS-KCTH-ZERO-DISBURSEMENT-2022",
      intakeId: "INTAKE-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE",
      sourceId: "SRC-KCTH-CCED-PROJECT-UPDATE-2022-05-10",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "The May 10, 2022 CCED project update listed $0 disbursed against KC Town Hall's $490,539 budget.",
      locator: "Central City Sales Tax Project Updates, Round 2, KC Town Hall row, page 7 of the PDF",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-NONDISBURSEMENT-AND-REAPPROPRIATION"],
      researchInquiryIds: ["INQ-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE"],
      limitations: [
        "This is a May 2022 status snapshot and does not by itself establish the project's later withdrawal or the final disposition of the appropriation."
      ]
    },
    {
      id: "OBS-KCTH-CONTRACT-EXECUTION-PENDING-2022",
      intakeId: "INTAKE-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE",
      sourceId: "SRC-KCTH-CCED-PROJECT-UPDATE-2022-05-10",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "The May 10, 2022 CCED project update listed contract execution as pending identification of an escrow agent.",
      locator: "Central City Sales Tax Project Updates, Round 2, KC Town Hall row, page 7 of the PDF",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-NONDISBURSEMENT-AND-REAPPROPRIATION"],
      researchInquiryIds: ["INQ-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE"],
      limitations: [
        "This status note does not establish why the escrow arrangement remained unresolved or whether other agreement conditions had been satisfied."
      ]
    },
    {
      id: "OBS-KCTH-PROJECT-WITHDREW-2024",
      intakeId: "INTAKE-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE",
      sourceId: "SRC-KCTH-ORDINANCE-240317",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "Ordinance 240317 records that KC Town Hall withdrew from the CCED funding process.",
      locator: "Ordinance 240317, recitals",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-NONDISBURSEMENT-AND-REAPPROPRIATION"],
      researchInquiryIds: ["INQ-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE"],
      limitations: [
        "The ordinance says the project withdrew for various reasons; it does not establish a complete causal account or assign responsibility for the withdrawal."
      ]
    },
    {
      id: "OBS-KCTH-COUNCIL-REAPPROPRIATED-FUNDS-2024",
      intakeId: "INTAKE-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE",
      sourceId: "SRC-KCTH-ORDINANCE-240317",
      project: "kc-town-hall",
      kind: "source-fact",
      text: "Ordinance 240317 reappropriated the unused $490,539 from the KC Town Hall project account to the Central City Sales Tax housing budget.",
      locator: "Ordinance 240317, sections 1-2",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCTH-NONDISBURSEMENT-AND-REAPPROPRIATION"],
      researchInquiryIds: ["INQ-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE"],
      limitations: [
        "The reappropriation establishes the later disposition of the unused City funds, not a payment to or recovery from KC Town Hall."
      ]
    },
    {
      id: "OBS-KCTH-STEWARDSHIP-TRANSITION-LEAD",
      intakeId: "INTAKE-KCTH-STEWARDSHIP-TRANSITION",
      project: "kc-town-hall",
      kind: "participant-memory",
      text: "Jamie recalls transitioning stewardship of the KC Town Hall project to a mission-aligned organization.",
      locator: "Jamie-provided participant-memory lead, July 13, 2026",
      status: "captured",
      publicSafe: true,
      claimIds: ["CLM-KCTH-STEWARDSHIP-TRANSITION"],
      researchInquiryIds: ["INQ-KCTH-STEWARDSHIP-TRANSITION"],
      limitations: [
        "The recipient is intentionally unnamed pending a separate accuracy and consent review.",
        "The first-person account is not established by the City funding records and requires separate corroboration before broader public projection."
      ]
    }
  ],

  sources: [
    {
      id: "SRC-KCTH-CCED-FACT-SHEET-190649",
      title: "Resolution 190649 fact sheet for KC Town Hall",
      organization: "City of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://kansascity.legistar.com/View.ashx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=A5387C5D-45F3-45D3-AA12-58AC5BAACFDE&ID=10627855&M=F",
      preferredPublicUrl: "canonical",
      publicCitation: "Kansas City Resolution 190649 fact sheet documenting the CCED Board's July 16, 2019 funding recommendation for KC Town Hall.",
      publicNote: "The fact sheet records the Board recommendation and proposed project scope; it is not the later Council action or evidence that funds were disbursed.",
      supportsGenerally: [
        "July 16, 2019 CCED Board vote",
        "$490,539 recommendation",
        "KC Town Hall project at 36th Street and Indiana Avenue"
      ],
      doesNotEstablish: [
        "Council adoption",
        "execution of a funding agreement",
        "disbursement of funds",
        "completed redevelopment",
        "Jamie's individual role"
      ]
    },
    {
      id: "SRC-KCTH-RESOLUTION-190649",
      title: "Kansas City Resolution 190649",
      organization: "City Council of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-09-26",
      accessedAt: reviewedAt,
      canonicalUrl: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=44A50FFC-321A-41C7-9A86-6ADD9083B156&ID=5515936&Options=&Search=",
      preferredPublicUrl: "canonical",
      publicCitation: "Kansas City Resolution 190649, adopted as substituted on September 26, 2019.",
      publicNote: "The Council accepted the CCED Board's $490,539 recommendation and authorized negotiation of a funding agreement for KC Town Hall.",
      supportsGenerally: [
        "Council adoption on September 26, 2019",
        "acceptance of the CCED Board recommendation",
        "$490,539 amount",
        "authorization to negotiate a funding agreement"
      ],
      doesNotEstablish: [
        "a member-by-member roll-call tally",
        "execution of a funding agreement",
        "disbursement of funds",
        "completed redevelopment",
        "Jamie's individual role or sole causation"
      ]
    },
    {
      id: "SRC-KCTH-ORDINANCE-190642",
      title: "Committee Substitute for Kansas City Ordinance 190642",
      organization: "City Council of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-09-26",
      accessedAt: reviewedAt,
      canonicalUrl: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=B387009F-F7F7-454D-950A-E44588056314&ID=5515929&Options=&Search=",
      assetUrl: "https://kansascity.legistar.com/View.ashx?M=F&ID=10628353&GUID=DAED2DE7-AA03-43D8-B1C9-448EA4DAEEB2&G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A",
      preferredPublicUrl: "asset",
      publicCitation: "Authenticated Committee Substitute for Kansas City Ordinance 190642, passed September 26, 2019.",
      publicNote: "The ordinance appropriated $490,539 for KC Town Hall to a Central City Sales Tax project account.",
      supportsGenerally: [
        "Council passage on September 26, 2019",
        "$490,539 appropriation",
        "KC Town Hall project description",
        "Central City Sales Tax project account"
      ],
      doesNotEstablish: [
        "execution of a funding agreement",
        "disbursement of funds",
        "completed redevelopment",
        "Jamie's individual role or sole causation"
      ]
    },
    {
      id: "SRC-KCTH-CCED-PROJECT-UPDATE-2022-05-10",
      title: "Central City Sales Tax Project Updates - May 10, 2022",
      organization: "Central City Economic Development Sales Tax Board",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2022-05-10",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.kcmo.gov/home/showpublisheddocument/9705/638084265872600000",
      preferredPublicUrl: "canonical",
      publicCitation: "Central City Sales Tax Project Updates dated May 10, 2022.",
      publicNote: "The KC Town Hall row reports a $490,539 budget, $0 disbursed, and contract execution pending an escrow agent.",
      supportsGenerally: [
        "May 10, 2022 project status",
        "$490,539 CCED budget",
        "$0 disbursed",
        "pending contract execution"
      ],
      doesNotEstablish: [
        "the project's later withdrawal",
        "the final disposition of the appropriation",
        "a complete explanation for delay",
        "Jamie's individual role"
      ]
    },
    {
      id: "SRC-KCTH-ORDINANCE-240317",
      title: "Kansas City Ordinance 240317",
      organization: "City Council of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2024-03-28",
      accessedAt: reviewedAt,
      canonicalUrl: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-&GUID=E3F31A7F-65F8-464E-ABD4-197DEB6D80C8&ID=6586846&Options=&Search=",
      preferredPublicUrl: "canonical",
      publicCitation: "Kansas City Ordinance 240317, passed March 28, 2024.",
      publicNote: "The ordinance records KC Town Hall's withdrawal and returns the unused $490,539 appropriation to the Central City Sales Tax housing budget.",
      supportsGenerally: [
        "KC Town Hall withdrawal",
        "unused $490,539 project balance",
        "2024 Council reappropriation"
      ],
      doesNotEstablish: [
        "a complete reason for the withdrawal",
        "fault or responsibility for the withdrawal",
        "that the 2019 Council action did not occur",
        "Jamie's individual role"
      ]
    }
  ],

  claims: [
    {
      id: "CLM-KCTH-COUNCIL-APPROVAL-AND-APPROPRIATION-2019",
      project: "kc-town-hall",
      internalClaim: "After the CCED Board recommended $490,539 for KC Town Hall, the Kansas City Council accepted the recommendation and appropriated the amount to a Central City Sales Tax project account on September 26, 2019.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "On September 26, 2019, the Kansas City Council accepted the CCED Board's recommendation for KC Town Hall and appropriated $490,539 in Central City Sales Tax funds to a city project account.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-CCED-FACT-SHEET-190649",
          relationship: "direct-support",
          supports: ["CCED Board recommendation of $490,539"],
          locator: "Discussion, page 1",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCTH-RESOLUTION-190649",
          relationship: "direct-support",
          supports: ["Council acceptance of the recommendation on September 26, 2019"],
          locator: "Title and Council history",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCTH-ORDINANCE-190642",
          relationship: "direct-support",
          supports: ["Council appropriation of $490,539 to a city project account"],
          locator: "Section 2 and KC Town Hall award row",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Describe the Council action as acceptance and appropriation, not as payment to KC Town Hall.",
        "Preserve collective project credit and do not assign sole causation to Jamie."
      ],
      antiClaims: [
        "KC Town Hall received $490,539.",
        "The funding agreement was executed by the 2019 Council action.",
        "Jamie alone secured the Council action.",
        "The appropriation proves the redevelopment was completed."
      ],
      researchInquiryIds: ["INQ-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex official-record review"]
    },
    {
      id: "CLM-KCTH-NONDISBURSEMENT-AND-REAPPROPRIATION",
      project: "kc-town-hall",
      internalClaim: "Official city records show that the KC Town Hall appropriation had not been disbursed by May 2022 and that the project later withdrew, after which the Council reappropriated the unused $490,539 in 2024.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "The appropriation was not a payment: a May 2022 City update reported $0 disbursed, and after the project withdrew the Council returned the unused $490,539 to the fund in 2024.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/kc-town-hall"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-KCTH-CCED-PROJECT-UPDATE-2022-05-10",
          relationship: "direct-support",
          supports: ["$0 disbursed as of May 10, 2022", "contract execution remained pending"],
          locator: "Round 2 KC Town Hall row",
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-KCTH-ORDINANCE-240317",
          relationship: "direct-support",
          supports: ["KC Town Hall withdrawal", "2024 reappropriation of the unused $490,539"],
          locator: "Recitals and sections 1-2",
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "State the documented withdrawal and reappropriation without speculating about causes or assigning fault.",
        "Keep the 2019 public approval visible; the later outcome does not erase the earlier Council action."
      ],
      antiClaims: [
        "KC Town Hall received or spent the $490,539.",
        "The City record establishes why the project withdrew.",
        "The later withdrawal means the 2019 Council action never happened."
      ],
      researchInquiryIds: ["INQ-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex official-record review"]
    },
    {
      id: "CLM-KCTH-STEWARDSHIP-TRANSITION",
      project: "kc-town-hall",
      internalClaim: "Jamie transitioned stewardship of the KC Town Hall project to a mission-aligned organization.",
      status: "use-with-care",
      projections: [
        {
          key: "archive-note",
          text: "Transitioned stewardship of KC Town Hall to a mission-aligned organization.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [],
      boundaries: [
        "Treat this as Jamie's first-person account until separate transfer evidence or collaborator confirmation is reviewed.",
        "Do not name the recipient organization without an accuracy, consent, and public-use decision.",
        "Do not encode or infer private circumstances surrounding the transition."
      ],
      antiClaims: [
        "Jamie abandoned the project.",
        "The City funding records establish the stewardship transition.",
        "The recipient organization assumed every KC Town Hall obligation.",
        "The stewardship transition explains or caused the later City funding withdrawal."
      ],
      researchInquiryIds: ["INQ-KCTH-STEWARDSHIP-TRANSITION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart"]
    }
  ],

  researchInquiries: [
    {
      id: "INQ-KCTH-CCED-COUNCIL-FUNDING-LIFECYCLE",
      project: "kc-town-hall",
      question: "Did the Kansas City Council act on the CCED Board's KC Town Hall recommendation, what did the action authorize or appropriate, and what happened to the funds afterward?",
      methods: [
        "Reviewed the official Resolution 190649 fact sheet for the CCED Board recommendation.",
        "Reviewed the Legistar history for Resolution 190649 and the authenticated Committee Substitute for Ordinance 190642.",
        "Cross-checked the May 10, 2022 CCED project update and 2024 Ordinance 240317 for disbursement and later disposition."
      ],
      runAt: reviewedAt,
      resultStatus: "recovered",
      findings: [
        "The CCED Board voted on July 16, 2019 to recommend $490,539 for KC Town Hall.",
        "On September 26, 2019, the Council adopted Resolution 190649 accepting that recommendation.",
        "Resolution 190649 authorized the City Manager to negotiate a funding agreement.",
        "The same day, the Council passed Ordinance 190642 appropriating $490,539 to a Central City Sales Tax project account for KC Town Hall.",
        "A May 2022 City update reported $0 disbursed.",
        "The May 2022 update listed contract execution as pending identification of an escrow agent.",
        "Ordinance 240317 records that KC Town Hall later withdrew.",
        "Ordinance 240317 reappropriated the unused $490,539 in 2024."
      ],
      limitations: [
        "The recovered public history does not expose a member-by-member roll-call tally.",
        "The records establish appropriation, not disbursement to KC Town Hall.",
        "The 2024 ordinance does not provide a complete explanation for the withdrawal.",
        "These sources establish the public funding lifecycle, not Jamie's complete individual contribution."
      ],
      sourceIds: [
        "SRC-KCTH-CCED-FACT-SHEET-190649",
        "SRC-KCTH-RESOLUTION-190649",
        "SRC-KCTH-ORDINANCE-190642",
        "SRC-KCTH-CCED-PROJECT-UPDATE-2022-05-10",
        "SRC-KCTH-ORDINANCE-240317"
      ],
      publicSummary: "Official Kansas City records establish a July 2019 CCED Board recommendation, September 2019 Council acceptance and appropriation of $490,539, no disbursement as of May 2022, and a 2024 reappropriation after the project withdrew."
    },
    {
      id: "INQ-KCTH-STEWARDSHIP-TRANSITION",
      project: "kc-town-hall",
      question: "What public-safe evidence can establish Jamie's transition of KC Town Hall stewardship while respecting the recipient organization's consent and keeping private context out of the repository?",
      methods: [
        "Recorded Jamie's first-person account as a participant-memory lead.",
        "Separated the stewardship transition from the official City funding lifecycle and placed public projection on hold."
      ],
      runAt: reviewedAt,
      resultStatus: "inconclusive",
      findings: [
        "Jamie's account that he transitioned the project to a mission-aligned organization is retained for future corroboration."
      ],
      limitations: [
        "No public transfer document or collaborator confirmation is attached to this record.",
        "The recipient organization is intentionally unnamed pending review.",
        "The City funding records do not establish the stewardship transition or its relationship to the later withdrawal."
      ],
      sourceIds: [],
      publicSummary: "Jamie's stewardship-transition account is retained as a held research lead and is not currently projected on the public site."
    }
  ],

  corrections: [
    {
      id: "COR-KCTH-FUNDING-LIFECYCLE-2026",
      claimId: "CLM-KCTH-COUNCIL-APPROVAL-AND-APPROPRIATION-2019",
      previousText: "a $490,539 public funding recommendation",
      replacementText: "a CCED Board recommendation followed by Council acceptance and appropriation of $490,539; the funds were not disbursed and were later reappropriated after the project withdrew",
      reason: "Official Council, ordinance, and CCED project-status records now establish the full public funding lifecycle.",
      decidedAt: reviewedAt,
      affectedSurfaces: ["/work", "/work/kc-town-hall", "knowledge-bank"],
      status: "active"
    }
  ],

  page: {
    id: "kc-town-hall",
    surface: "/work/kc-town-hall",
    sourceOrder: [
      "SRC-KCTH-RESOLUTION-190649",
      "SRC-KCTH-ORDINANCE-190642",
      "SRC-KCTH-CCED-PROJECT-UPDATE-2022-05-10",
      "SRC-KCTH-ORDINANCE-240317"
    ],
    occurrences: [
      {
        id: "council-approval-and-appropriation",
        claimId: "CLM-KCTH-COUNCIL-APPROVAL-AND-APPROPRIATION-2019",
        projection: "case-study",
        sourceIds: [
          "SRC-KCTH-RESOLUTION-190649",
          "SRC-KCTH-ORDINANCE-190642"
        ]
      },
      {
        id: "nondisbursement-and-reappropriation",
        claimId: "CLM-KCTH-NONDISBURSEMENT-AND-REAPPROPRIATION",
        projection: "case-study",
        sourceIds: [
          "SRC-KCTH-CCED-PROJECT-UPDATE-2022-05-10",
          "SRC-KCTH-ORDINANCE-240317"
        ]
      }
    ]
  }
} as const;
