import type { KnowledgeBank } from "./schema.ts";

type NterChngDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

export const nterChngDevelopmentRecords: NterChngDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-14-NTER-CHNG-ARCHIVED-SITE",
      receivedAt: "2026-07-14",
      submittedBy: "Jamie Burkart",
      kind: "url",
      visibility: "public",
      summary:
        "Recover and preserve the archived NTER CHNG project, its collaborators, medium, venue, and relationship to Jamie's wider participatory practice.",
      sourceUrl:
        "https://web.archive.org/web/20110128193350/http://nterchng.com/",
      projectHints: ["nter-chng", "participatory-public-systems"],
      status: "processed",
      disposition:
        "Recovered the project identity and creator credit, linked the project to the official America: Now and Here record, promoted three bounded claims, and held exact-date and sole-role assertions.",
      linkedRecordIds: [
        "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011",
        "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
        "INQ-NTER-CHNG-AMERICA-NOW-HERE-2026",
        "CND-NTER-CHNG-COLLABORATIVE-INSTALLATION",
        "CND-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION",
        "CND-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD",
        "CND-NTER-CHNG-SOLE-TECHNICAL-AUTHORSHIP",
        "CND-NTER-CHNG-ORIGINAL-OPENING-DATE"
      ]
    },
    {
      id: "INT-2026-07-14-NERMAN-AMERICA-NOW-HERE",
      receivedAt: "2026-07-14",
      submittedBy: "Jamie Burkart",
      kind: "url",
      visibility: "public",
      summary:
        "Use the Nerman Museum's preserved America: Now and Here exhibition page as institutional context and seek the exhibition's own archived website for direct NTER CHNG evidence.",
      sourceUrl:
        "https://www.nermanmuseum.org/exhibitions/2011-05-11-kruger-barbara-america-now-here.html",
      projectHints: ["nter-chng"],
      status: "processed",
      disposition:
        "Added the museum source as program context and recovered the official exhibition site's direct NTER CHNG article through the Wayback CDX index.",
      linkedRecordIds: [
        "SRC-NERMAN-AMERICA-NOW-HERE-2011",
        "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
        "INQ-NTER-CHNG-AMERICA-NOW-HERE-2026"
      ]
    }
  ],
  sourceReadings: [
    {
      id: "READ-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011",
      sourceId: "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011",
      readAt: "2026-07-14",
      reader: "Codex Wayback source review",
      assertions: [
        {
          id: "ASSERT-NTER-CHNG-CREATOR-CREDIT",
          statement:
            "The project page credits Drew Bolton, Jamie Burkart, and Garrett Fuselier together.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NTER-CHNG-MEDIUM",
          statement:
            "The project page describes NTER CHNG as an interactive texting installation.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NTER-CHNG-COCOON-GALLERY",
          statement:
            "The project page places the installation at Arts Incubator Cocoon Gallery in Kansas City.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The page does not state the division of labor or the exact original opening date and year.",
        "The linked press release was not preserved in the recovered Wayback collection."
      ],
      entityIds: ["JamieBurkart", "DrewBolton", "GarrettFuselier"],
      themeIds: ["interactive-media", "collaborative-authorship", "public-participation"],
      candidateClaimIds: [
        "CND-NTER-CHNG-COLLABORATIVE-INSTALLATION",
        "CND-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD",
        "CND-NTER-CHNG-SOLE-TECHNICAL-AUTHORSHIP",
        "CND-NTER-CHNG-ORIGINAL-OPENING-DATE"
      ]
    },
    {
      id: "READ-AMERICA-NOW-HERE-NTER-CHNG-2011",
      sourceId: "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
      readAt: "2026-07-14",
      reader: "Codex Wayback source review",
      assertions: [
        {
          id: "ASSERT-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION",
          statement:
            "America: Now and Here's own site documents visitor interaction with NTER CHNG in its Kansas City presentation.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NTER-CHNG-SMS-PATHWAY",
          statement:
            "Visitors could text a displayed number and have the submitted message projected onto the installation screen.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NTER-CHNG-PROJECTION-FORM",
          statement:
            "The screen was floor-to-ceiling white gauze and messages appeared as overlapping moving thought clouds.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The article does not name the creators or describe the complete technical architecture.",
        "Its participant observations are anecdotal and do not establish audience scale or consensus."
      ],
      entityIds: ["NTERCHNG", "AmericaNowAndHere"],
      themeIds: ["exhibition-inclusion", "sms-interface", "shared-public-display"],
      candidateClaimIds: [
        "CND-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION",
        "CND-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD"
      ]
    },
    {
      id: "READ-NERMAN-AMERICA-NOW-HERE-2011",
      sourceId: "SRC-NERMAN-AMERICA-NOW-HERE-2011",
      readAt: "2026-07-14",
      reader: "Codex institutional-source review",
      assertions: [
        {
          id: "ASSERT-AMERICA-NOW-HERE-KANSAS-CITY-LAUNCH",
          statement:
            "The preserved article describes America: Now and Here as a multidisciplinary national project launching in Kansas City in May 2011.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-AMERICA-NOW-HERE-PUBLIC-DIALOGUE",
          statement:
            "The project was framed as fostering public dialogue about America through the arts and combining national participants with local counterparts.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The page does not name NTER CHNG and serves only as wider exhibition context for this inquiry."
      ],
      entityIds: ["AmericaNowAndHere", "NermanMuseum"],
      themeIds: ["exhibition-context", "public-dialogue", "national-local-program"],
      candidateClaimIds: ["CND-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION"]
    }
  ],
  candidateClaims: [
    {
      id: "CND-NTER-CHNG-COLLABORATIVE-INSTALLATION",
      project: "nter-chng",
      text:
        "NTER CHNG was an interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier at Arts Incubator Cocoon Gallery in Kansas City.",
      status: "promoted",
      sourceIds: ["SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011"],
      researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-2026"],
      supportSummary:
        "The archived project page directly states the title, medium, creator names, and venue.",
      missingEvidence: [],
      boundaries: [
        "Credit all three collaborators and do not infer a division of labor."
      ],
      promotedClaimId: "CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION",
      reviewedAt: "2026-07-14"
    },
    {
      id: "CND-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION",
      project: "nter-chng",
      text:
        "NTER CHNG was included in America: Now and Here's 2011 Kansas City presentation as an SMS-to-projection installation.",
      status: "promoted",
      sourceIds: [
        "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
        "SRC-NERMAN-AMERICA-NOW-HERE-2011",
        "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-2026"],
      supportSummary:
        "The official exhibition article directly documents NTER CHNG and its interaction mechanism; the project and museum sources establish creator and program context separately.",
      missingEvidence: [],
      boundaries: [
        "Do not convert exhibition inclusion into a solo commission, a national signature-work claim, or audience impact."
      ],
      promotedClaimId: "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011",
      reviewedAt: "2026-07-14"
    },
    {
      id: "CND-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD",
      project: "participatory-public-systems",
      text:
        "NTER CHNG is an early documented example of Jamie's collaborative participatory-systems practice in interactive media.",
      status: "promoted",
      sourceIds: [
        "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011",
        "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-2026"],
      supportSummary:
        "The sources document a familiar individual action, texting, changing a shared public visual display in real time, with Jamie named among three collaborators.",
      missingEvidence: [],
      boundaries: [
        "Treat the participatory-systems framing as editorial synthesis and retain collective credit."
      ],
      promotedClaimId: "CLM-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD",
      reviewedAt: "2026-07-14"
    },
    {
      id: "CND-NTER-CHNG-SOLE-TECHNICAL-AUTHORSHIP",
      project: "nter-chng",
      text:
        "Jamie independently designed and programmed the complete NTER CHNG installation.",
      status: "research-needed",
      sourceIds: ["SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011"],
      researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-2026"],
      supportSummary:
        "The project source names Jamie as one of three creators but supplies no division of artistic, technical, production, or documentation labor.",
      missingEvidence: [
        "Collaborator confirmation or contemporaneous technical records assigning individual responsibilities"
      ],
      boundaries: [
        "Use collaborative creator credit until direct role evidence supports a more specific contribution."
      ],
      reviewedAt: "2026-07-14"
    },
    {
      id: "CND-NTER-CHNG-ORIGINAL-OPENING-DATE",
      project: "nter-chng",
      text:
        "NTER CHNG opened at Cocoon Gallery in January 2011.",
      status: "research-needed",
      sourceIds: ["SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011"],
      researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-2026"],
      supportSummary:
        "The January 28, 2011 capture says the installation was open until January 24, but the page does not print an opening date or year and may preserve stale copy.",
      missingEvidence: [
        "The unrecovered press release, event listing, collaborator record, or contemporaneous venue calendar"
      ],
      boundaries: [
        "State only that the January 2011 archive records the earlier Cocoon Gallery presentation until a dated source is recovered."
      ],
      reviewedAt: "2026-07-14"
    }
  ],
  promotions: [
    {
      id: "PROM-NTER-CHNG-COLLABORATIVE-INSTALLATION-2026",
      candidateClaimId: "CND-NTER-CHNG-COLLABORATIVE-INSTALLATION",
      claimId: "CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION",
      decision: "promoted",
      reason:
        "The archived project site directly identifies the medium, all three creators, and the Kansas City venue.",
      decidedAt: "2026-07-14",
      decidedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "PROM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2026",
      candidateClaimId: "CND-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION",
      claimId: "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011",
      decision: "promoted",
      reason:
        "The official exhibition site directly documents NTER CHNG and its visitor interaction, with separate sources supplying creator and program context.",
      decidedAt: "2026-07-14",
      decidedBy: ["Jamie Burkart", "Codex Wayback review"]
    },
    {
      id: "PROM-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD-2026",
      candidateClaimId: "CND-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD",
      claimId: "CLM-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD",
      decision: "promoted",
      reason:
        "The interaction mechanism provides a concrete, bounded example of collaborative participatory-system design while remaining archive-only.",
      decidedAt: "2026-07-14",
      decidedBy: ["Jamie Burkart", "Codex editorial synthesis"]
    },
    {
      id: "PROM-NTER-CHNG-SOLE-TECHNICAL-AUTHORSHIP-2026",
      candidateClaimId: "CND-NTER-CHNG-SOLE-TECHNICAL-AUTHORSHIP",
      decision: "held",
      reason:
        "The source credits three collaborators and does not assign technical, artistic, production, or documentation responsibilities.",
      decidedAt: "2026-07-14",
      decidedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "PROM-NTER-CHNG-ORIGINAL-OPENING-DATE-2026",
      candidateClaimId: "CND-NTER-CHNG-ORIGINAL-OPENING-DATE",
      decision: "held",
      reason:
        "The recovered project page does not print the original opening date or year, and the linked press release was not captured.",
      decidedAt: "2026-07-14",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-NTER-CHNG-EDITORIAL-2026",
      audience:
        "Hiring managers and collaborators in civic technology, interactive media, implementation, public programming, or cultural infrastructure",
      goal:
        "Preserve NTER CHNG as concrete evidence of Jamie's long participatory-systems practice without adding another case study before the current portfolio is launched.",
      argument:
        "NTER CHNG shows Jamie collaborating at the boundary of interaction design, public participation, and cultural production: a low-friction text message altered a shared visual environment in real time.",
      selectedClaimIds: [
        "CLM-NTER-CHNG-COLLABORATIVE-INSTALLATION",
        "CLM-NTER-CHNG-AMERICA-NOW-HERE-INCLUSION-2011",
        "CLM-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD"
      ],
      heldCandidateClaimIds: [
        "CND-NTER-CHNG-SOLE-TECHNICAL-AUTHORSHIP",
        "CND-NTER-CHNG-ORIGINAL-OPENING-DATE"
      ],
      rationale: [
        "Make no immediate website change; preserve the project as source-backed depth for future opportunity-specific compositions.",
        "Keep all three collaborators visible and avoid inventing a division of labor.",
        "Use the official exhibition article for inclusion and mechanism, the project page for creators and venue, and the museum page only for wider program context.",
        "Do not add a public archive, proofs, knowledge-bank, or project route in this pass."
      ],
      createdAt: "2026-07-14"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-NTER-CHNG-INSTALLATION-IMAGES-2026",
      kind: "photo-editor",
      summary:
        "The official exhibition post captions children watching NTER CHNG, but the recovered article contains no surviving inline image. Search Jamie's photo archive, collaborator records, Cocoon Gallery documentation, and America: Now and Here records for installation views showing the gauze screen and projected thought clouds.",
      projectHints: ["nter-chng", "participatory-public-systems"],
      sourceIds: [
        "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011",
        "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011"
      ],
      candidateClaimIds: ["CND-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD"],
      rightsReviewRequired: true,
      status: "captured",
      createdAt: "2026-07-14"
    }
  ]
};
