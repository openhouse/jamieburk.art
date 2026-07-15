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
    },
    {
      id: "INT-2026-07-15-NTER-CHNG-INSTALLER-RUNBOOK",
      receivedAt: "2026-07-15",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Ingest a newly surfaced NTER CHNG installation runbook while keeping its Google Drive locator and working details outside the public registry.",
      projectHints: ["nter-chng", "participatory-public-systems"],
      status: "processed",
      disposition:
        "Close-read the full runbook, promoted a bounded integrated-installation-system claim, and retained individual task attribution as unresolved.",
      linkedRecordIds: [
        "SRC-NTER-CHNG-INSTALLER-RUNBOOK-2011",
        "READ-NTER-CHNG-INSTALLER-RUNBOOK-2011",
        "INQ-NTER-CHNG-PROJECT-ARTIFACTS-2026",
        "CND-NTER-CHNG-INTEGRATED-INSTALLATION-SYSTEM-2011",
        "CLM-NTER-CHNG-INTEGRATED-INSTALLATION-SYSTEM-2011"
      ],
      protectedLocatorId: "ARCHIVE-NTER-CHNG-INSTALLER-RUNBOOK-INTAKE-2026-001"
    },
    {
      id: "INT-2026-07-15-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT",
      receivedAt: "2026-07-15",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Ingest a newly surfaced NTER CHNG working document containing 2010 exhibit information and 2011 prompts without publishing participant records.",
      projectHints: ["nter-chng", "participatory-public-systems"],
      status: "processed",
      disposition:
        "Recovered the original-presentation chronology and creators' conceptual framing, contradicted the prior January 2011 opening hypothesis, and excluded all phone numbers and message text.",
      linkedRecordIds: [
        "SRC-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011",
        "READ-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011",
        "INQ-NTER-CHNG-PROJECT-ARTIFACTS-2026",
        "CND-NTER-CHNG-ORIGINAL-EXHIBITION-CHRONOLOGY",
        "CLM-NTER-CHNG-ORIGINAL-EXHIBITION-2010",
        "CND-NTER-CHNG-EXACT-CLOSING-DATE"
      ],
      protectedLocatorId: "ARCHIVE-NTER-CHNG-EXHIBIT-WORKING-DOC-INTAKE-2026-001"
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
    },
    {
      id: "READ-NTER-CHNG-INSTALLER-RUNBOOK-2011",
      sourceId: "SRC-NTER-CHNG-INSTALLER-RUNBOOK-2011",
      readAt: "2026-07-15",
      reader: "Codex authenticated Google Docs archival review",
      assertions: [
        {
          id: "ASSERT-NTER-CHNG-MAY-2011-RESTAGING",
          statement:
            "The runbook identifies its purpose as staging NTER CHNG for America: Now and Here in May 2011.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NTER-CHNG-SOFTWARE-REFINEMENT",
          statement:
            "The plan includes server-side and wall-side software concerns and a refinement intended to prevent rapid incoming messages from back-queuing.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NTER-CHNG-INTEGRATED-INSTALLATION-SCOPE",
          statement:
            "The runbook coordinates hosting, display computers, projectors, networking, wiring, wall fabrication, floor anchoring, testing, installation, gallery fine-tuning, documentation planning, and teardown.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The connector exposed no revision history or usable author metadata.",
        "The task plan does not assign individual responsibilities among the three credited creators.",
        "A runbook establishes intended implementation scope but does not independently prove every listed task was completed as written."
      ],
      entityIds: ["JamieBurkart", "DrewBolton", "GarrettFuselier", "AmericaNowAndHere"],
      themeIds: [
        "interactive-media",
        "technical-production",
        "installation-delivery",
        "collaborative-authorship"
      ],
      candidateClaimIds: [
        "CND-NTER-CHNG-INTEGRATED-INSTALLATION-SYSTEM-2011",
        "CND-NTER-CHNG-SOLE-TECHNICAL-AUTHORSHIP"
      ]
    },
    {
      id: "READ-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011",
      sourceId: "SRC-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011",
      readAt: "2026-07-15",
      reader: "Codex authenticated Google Docs archival review",
      assertions: [
        {
          id: "ASSERT-NTER-CHNG-JANUARY-2010-PRESENTATION",
          statement:
            "A project-authored exhibit-information section dates the original NTER CHNG presentation to January 2010 and lists January 8 as its opening date.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NTER-CHNG-SOFTWARE-ARCHITECTURAL-FORM",
          statement:
            "The exhibit description characterizes NTER CHNG as equal parts software application and architectural installation.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-NTER-CHNG-MANY-TO-MANY-FRAMING",
          statement:
            "The exhibit description frames the installation as turning private one-to-one text exchange into a shared many-to-many spatial experience.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The document contains participant phone numbers and message text that are excluded from the public repository.",
        "The exhibit-information section is project-authored and is not an independent venue record.",
        "The listed January 29 closing date conflicts with the archived project site's January 24 language.",
        "The document does not assign individual technical, artistic, production, or documentation responsibilities."
      ],
      entityIds: ["JamieBurkart", "DrewBolton", "GarrettFuselier"],
      themeIds: [
        "interactive-media",
        "collaborative-authorship",
        "public-participation",
        "exhibition-chronology"
      ],
      candidateClaimIds: [
        "CND-NTER-CHNG-ORIGINAL-OPENING-DATE",
        "CND-NTER-CHNG-ORIGINAL-EXHIBITION-CHRONOLOGY",
        "CND-NTER-CHNG-EXACT-CLOSING-DATE",
        "CND-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD",
        "CND-NTER-CHNG-INTEGRATED-INSTALLATION-SYSTEM-2011",
        "CND-NTER-CHNG-SOLE-TECHNICAL-AUTHORSHIP"
      ]
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
        "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011",
        "SRC-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-2026"],
      supportSummary:
        "The public sources document a familiar individual action changing a shared display in real time; the protected project document explicitly frames the shift from private one-to-one texting to a shared many-to-many exchange, with Jamie named among three collaborators.",
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
      sourceIds: [
        "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011",
        "SRC-NTER-CHNG-INSTALLER-RUNBOOK-2011",
        "SRC-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-2026"],
      supportSummary:
        "The new working documents establish a substantial integrated technical and production system, but they still name or imply collective work and do not assign individual responsibilities among the three creators.",
      missingEvidence: [
        "Collaborator confirmation or contemporaneous technical records assigning individual responsibilities"
      ],
      boundaries: [
        "Use collaborative creator credit until direct role evidence supports a more specific contribution."
      ],
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-NTER-CHNG-ORIGINAL-OPENING-DATE",
      project: "nter-chng",
      text:
        "NTER CHNG opened at Cocoon Gallery in January 2011.",
      status: "contradicted",
      sourceIds: [
        "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011",
        "SRC-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-AMERICA-NOW-HERE-2026"],
      supportSummary:
        "The earlier inference conflated the January 2011 Wayback capture date with the exhibition date. A surviving project-authored exhibit-information section explicitly dates the original presentation to January 2010.",
      missingEvidence: [
        "An independent venue or press record confirming the exact January 2010 run"
      ],
      boundaries: [
        "Do not describe the original Cocoon Gallery presentation as opening in January 2011."
      ],
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-NTER-CHNG-ORIGINAL-EXHIBITION-CHRONOLOGY",
      project: "nter-chng",
      text:
        "A project-authored exhibit-information document dates NTER CHNG's original Cocoon Gallery presentation to January 2010, before its May 2011 America: Now and Here restaging.",
      status: "promoted",
      sourceIds: [
        "SRC-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011",
        "SRC-NTER-CHNG-INSTALLER-RUNBOOK-2011",
        "SRC-AMERICA-NOW-HERE-NTER-CHNG-2011"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-PROJECT-ARTIFACTS-2026"],
      supportSummary:
        "The protected exhibit-information section dates the original presentation to January 2010, while the installer runbook and official exhibition article establish the May 2011 restaging context.",
      missingEvidence: [],
      boundaries: [
        "Attribute the 2010 chronology to a project-authored working document, not independent reporting.",
        "Keep the exact closing date unresolved because two surviving project sources conflict."
      ],
      promotedClaimId: "CLM-NTER-CHNG-ORIGINAL-EXHIBITION-2010",
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-NTER-CHNG-INTEGRATED-INSTALLATION-SYSTEM-2011",
      project: "nter-chng",
      text:
        "The May 2011 restaging required an integrated implementation across software, hosting, display hardware, networking, wiring, fabrication, installation testing, gallery fine-tuning, and teardown.",
      status: "promoted",
      sourceIds: [
        "SRC-NTER-CHNG-INSTALLER-RUNBOOK-2011",
        "SRC-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-PROJECT-ARTIFACTS-2026"],
      supportSummary:
        "The installer runbook enumerates the technical and physical workflow, while the exhibit document describes the work as equal parts software application and architectural installation.",
      missingEvidence: [],
      boundaries: [
        "Describe project scope rather than assigning individual tasks.",
        "Do not treat the runbook as independent proof that every task was completed exactly as planned."
      ],
      promotedClaimId: "CLM-NTER-CHNG-INTEGRATED-INSTALLATION-SYSTEM-2011",
      reviewedAt: "2026-07-15"
    },
    {
      id: "CND-NTER-CHNG-EXACT-CLOSING-DATE",
      project: "nter-chng",
      text:
        "NTER CHNG's original Cocoon Gallery presentation closed on January 29, 2010.",
      status: "research-needed",
      sourceIds: [
        "SRC-NTER-CHNG-EXHIBIT-WORKING-DOCUMENT-2010-2011",
        "SRC-NTER-CHNG-ARCHIVED-PROJECT-SITE-2011"
      ],
      researchInquiryIds: ["INQ-NTER-CHNG-PROJECT-ARTIFACTS-2026"],
      supportSummary:
        "The protected exhibit document lists January 29, while the archived project page says the installation was open until January 24.",
      missingEvidence: [
        "A contemporaneous venue calendar, preserved press release, event listing, or collaborator confirmation resolving the conflict"
      ],
      boundaries: [
        "State January 2010 without an exact closing date until the conflict is resolved."
      ],
      reviewedAt: "2026-07-15"
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
        "The newly recovered runbook demonstrates a complex technical and production system but still does not assign individual responsibilities among the three collaborators.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex Google Docs archival review"]
    },
    {
      id: "PROM-NTER-CHNG-ORIGINAL-OPENING-DATE-2026",
      candidateClaimId: "CND-NTER-CHNG-ORIGINAL-OPENING-DATE",
      decision: "held",
      reason:
        "The January 2011 opening hypothesis is contradicted by a project-authored exhibit-information section dating the original presentation to January 2010.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex Google Docs archival review"]
    },
    {
      id: "PROM-NTER-CHNG-ORIGINAL-EXHIBITION-CHRONOLOGY-2026",
      candidateClaimId: "CND-NTER-CHNG-ORIGINAL-EXHIBITION-CHRONOLOGY",
      claimId: "CLM-NTER-CHNG-ORIGINAL-EXHIBITION-2010",
      decision: "promoted",
      reason:
        "The protected project document directly supplies January 2010 chronology, while separate 2011 sources establish the later restaging.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex Google Docs archival review"]
    },
    {
      id: "PROM-NTER-CHNG-INTEGRATED-INSTALLATION-SYSTEM-2026",
      candidateClaimId: "CND-NTER-CHNG-INTEGRATED-INSTALLATION-SYSTEM-2011",
      claimId: "CLM-NTER-CHNG-INTEGRATED-INSTALLATION-SYSTEM-2011",
      decision: "promoted",
      reason:
        "The installer runbook directly enumerates an integrated software, hardware, fabrication, and gallery-production workflow without assigning individual tasks.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex Google Docs archival review"]
    },
    {
      id: "PROM-NTER-CHNG-EXACT-CLOSING-DATE-2026",
      candidateClaimId: "CND-NTER-CHNG-EXACT-CLOSING-DATE",
      decision: "held",
      reason:
        "The protected working document and archived project page preserve conflicting January closing dates.",
      decidedAt: "2026-07-15",
      decidedBy: ["Jamie Burkart", "Codex source comparison"]
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
        "CLM-NTER-CHNG-PARTICIPATORY-SYSTEM-THREAD",
        "CLM-NTER-CHNG-ORIGINAL-EXHIBITION-2010",
        "CLM-NTER-CHNG-INTEGRATED-INSTALLATION-SYSTEM-2011"
      ],
      heldCandidateClaimIds: [
        "CND-NTER-CHNG-SOLE-TECHNICAL-AUTHORSHIP",
        "CND-NTER-CHNG-EXACT-CLOSING-DATE"
      ],
      rationale: [
        "Make no immediate website change; preserve the project as source-backed depth for future opportunity-specific compositions.",
        "Keep all three collaborators visible and avoid inventing a division of labor.",
        "Use the protected artifacts to preserve chronology and implementation depth without exposing their Drive locators or participant records.",
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
