import type { KnowledgeBank } from "./schema.ts";

type SharedDriveArchivalDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

export const sharedDriveArchivalDevelopmentRecords: SharedDriveArchivalDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-12-GDRIVE-SHARED-DRIVE-CORPUS",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Authenticated inventory and representative archival review of Jamie's accessible Shared Google Drive practice.",
      projectHints: ["knowledge-bank", "source-backed-team-memory"],
      status: "processed",
      disposition:
        "Mapped 110 accessible drives, selected a bounded work-relevant cohort, and excluded personal, media-only, sync, and non-probative holdings from close reading.",
      linkedRecordIds: [
        "INQ-GDRIVE-SHARED-DRIVE-ARCHIVAL-PRODUCTION-2026",
        "SRC-GDRIVE-SHARED-DRIVE-RESEARCH-2026"
      ],
      protectedLocatorId: "ARCHIVE-GDRIVE-SHARED-DRIVE-CORPUS-2026-001"
    },
    {
      id: "INT-2026-07-12-GDRIVE-CRS-OPERATING-MEMORY",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Shared running memory, outreach tracker, and alignment minutes for sensitive Commercial Rent Stabilization collaboration.",
      projectHints: ["fair-rent-nyc", "commercial-rent-stabilization"],
      status: "processed",
      disposition:
        "Promoted a bounded campaign-memory operating claim while excluding raw notes, stakeholder records, strategy, legal-review context, working links, and unapproved quotations.",
      linkedRecordIds: [
        "INQ-GDRIVE-SHARED-DRIVE-ARCHIVAL-PRODUCTION-2026",
        "SRC-GDRIVE-CRS-RUNNING-MEMORY-2026",
        "SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026",
        "SRC-GDRIVE-CRS-ALIGNMENT-MINUTES-2026",
        "CND-CRS-SHARED-MEMORY-OPERATING-SYSTEM",
        "CLM-CRS-SHARED-MEMORY-OPERATIONS"
      ],
      protectedLocatorId: "ARCHIVE-GDRIVE-CRS-OPERATING-MEMORY-2026-001"
    },
    {
      id: "INT-2026-07-12-GDRIVE-CRS-DATA-OPPORTUNITY",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Staff-oriented implementation brief translating a public-data opportunity into a bounded request, indicator set, privacy rules, and follow-up pathway.",
      projectHints: ["fair-rent-nyc", "commercial-rent-stabilization"],
      status: "processed",
      disposition:
        "Added as protected corroborating context for the already-public Commercial Rent Stabilization data-pilot claim.",
      linkedRecordIds: [
        "INQ-GDRIVE-SHARED-DRIVE-ARCHIVAL-PRODUCTION-2026",
        "SRC-GDRIVE-CRS-DATA-OPPORTUNITY-2026",
        "CND-CRS-PRIVACY-PRESERVING-DATA-PILOT",
        "CLM-CRS-PRIVACY-PRESERVING-DATA-PILOT"
      ],
      protectedLocatorId: "ARCHIVE-GDRIVE-CRS-DATA-OPPORTUNITY-INTAKE-2026-001"
    },
    {
      id: "INT-2026-07-12-GDRIVE-SUNDAY-DINNER-TRACKER",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Recurring-event operations tracker connecting event dates with invitation, response, and attendance follow-through.",
      projectHints: ["sunday-dinner", "participatory-public-systems"],
      status: "processed",
      disposition:
        "Retained as protected evidence of repeatable hospitality operations; private guest, contact, invitation, response, and attendance records remain excluded.",
      linkedRecordIds: [
        "INQ-GDRIVE-SHARED-DRIVE-ARCHIVAL-PRODUCTION-2026",
        "SRC-GDRIVE-SUNDAY-DINNER-TRACKER-2025",
        "CND-SUNDAY-DINNER-RECURRING-HOSPITALITY-OPERATIONS"
      ],
      protectedLocatorId: "ARCHIVE-GDRIVE-SUNDAY-DINNER-TRACKER-INTAKE-2026-001"
    },
    {
      id: "INT-2026-07-12-GDRIVE-196-ONBOARDING",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "artifact",
      visibility: "protected",
      summary:
        "Residency acceptance and onboarding correspondence connecting proposal review, scheduling, space preparation, check-in, and access handoff.",
      projectHints: ["196-artists-residency", "participatory-public-systems"],
      status: "processed",
      disposition:
        "Retained as protected evidence of a concrete resident-onboarding workflow; identity, contact, proposal, access, and correspondence details remain excluded.",
      linkedRecordIds: [
        "INQ-GDRIVE-SHARED-DRIVE-ARCHIVAL-PRODUCTION-2026",
        "SRC-GDRIVE-196-ONBOARDING-LETTER-2023",
        "CND-196-RESIDENCY-ONBOARDING-WORKFLOW"
      ],
      protectedLocatorId: "ARCHIVE-GDRIVE-196-ONBOARDING-INTAKE-2026-001"
    }
  ],
  sourceReadings: [
    {
      id: "READ-GDRIVE-SHARED-DRIVE-RESEARCH-2026",
      sourceId: "SRC-GDRIVE-SHARED-DRIVE-RESEARCH-2026",
      readAt: "2026-07-12",
      reader: "Codex archival review",
      assertions: [
        {
          id: "ASSERT-GDRIVE-INVENTORY-COUNT",
          statement:
            "The authenticated account could access 110 Shared Drives during the review window.",
          locator: "Drive inventory",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-GDRIVE-ARCHIVE-RANGE",
          statement:
            "The inventory spans civic, cultural, technical, hospitality, public-data, media, and collaboration contexts.",
          locator: "Drive-title classification",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-GDRIVE-CLAIM-DENSITY",
          statement:
            "Only a subset of the accessible drives contained claim-bearing documents suitable for close reading in this pass.",
          locator: "Representative cohort mapping",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "Access does not establish creation, authorship, completeness, or publication permission, and the pass was not exhaustive."
      ],
      entityIds: ["Jamie-Burkart"],
      themeIds: ["archival-production", "shared-workspaces", "source-selection"],
      candidateClaimIds: [
        "CND-CRS-SHARED-MEMORY-OPERATING-SYSTEM",
        "CND-SUNDAY-DINNER-RECURRING-HOSPITALITY-OPERATIONS",
        "CND-196-RESIDENCY-ONBOARDING-WORKFLOW"
      ]
    },
    {
      id: "READ-GDRIVE-CRS-RUNNING-MEMORY-2026",
      sourceId: "SRC-GDRIVE-CRS-RUNNING-MEMORY-2026",
      readAt: "2026-07-12",
      reader: "Codex archival review",
      assertions: [
        {
          id: "ASSERT-GDRIVE-CRS-MEMORY-STRUCTURE",
          statement:
            "The document functions as shared memory through current language, decisions, action owners, open questions, and dated meeting notes.",
          locator: "Start here, live action list, open questions, and meeting notes",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-GDRIVE-CRS-MEMORY-BOUNDARIES",
          statement:
            "The system defines consent levels and separates public materials from private strategy, legal-review, stakeholder, and story context.",
          locator: "How to use this document and story-handling guidance",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-GDRIVE-CRS-MEMORY-STEWARDSHIP",
          statement:
            "Revision history attributes document creation and most recorded revisions in the reviewed period to Jamie while preserving collaborator contributions.",
          locator: "Revision history",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The shared document is private, collaborative, and not evidence that Jamie owned the coalition or authored every contribution."
      ],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition", "Fair-Rent-NYC"],
      themeIds: ["campaign-memory", "decision-records", "privacy", "handoffs"],
      candidateClaimIds: ["CND-CRS-SHARED-MEMORY-OPERATING-SYSTEM"]
    },
    {
      id: "READ-GDRIVE-CRS-OUTREACH-TRACKER-2026",
      sourceId: "SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026",
      readAt: "2026-07-12",
      reader: "Codex archival review",
      assertions: [
        {
          id: "ASSERT-GDRIVE-CRS-TRACKER-CONSENT",
          statement:
            "The tracker separates consent to contact from consent to quote publicly.",
          locator: "Schema header",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-GDRIVE-CRS-TRACKER-OWNERSHIP",
          statement:
            "The schema distinguishes relationship owner, outreach owner, next action, due date, status, source, and data-quality flags.",
          locator: "Schema header",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-GDRIVE-CRS-TRACKER-AUTHORSHIP",
          statement:
            "Recorded revisions attribute creation and subsequent updates to Jamie.",
          locator: "Revision history",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "No private row, contact, quote, relationship, or consent value is cleared for publication, and the tracker does not prove every follow-up was completed."
      ],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition", "Fair-Rent-NYC"],
      themeIds: ["stakeholder-operations", "consent", "data-quality", "follow-up"],
      candidateClaimIds: [
        "CND-CRS-SHARED-MEMORY-OPERATING-SYSTEM",
        "CND-CRS-CONSENT-AWARE-OUTREACH-OPERATIONS"
      ]
    },
    {
      id: "READ-GDRIVE-CRS-ALIGNMENT-MINUTES-2026",
      sourceId: "SRC-GDRIVE-CRS-ALIGNMENT-MINUTES-2026",
      readAt: "2026-07-12",
      reader: "Codex archival review",
      assertions: [
        {
          id: "ASSERT-GDRIVE-CRS-ALIGNMENT-FACILITATION",
          statement:
            "The record identifies Jamie as facilitator and note preparer for a cross-organization alignment session.",
          locator: "Document header",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-GDRIVE-CRS-ALIGNMENT-ACTIONS",
          statement:
            "The minutes translate discussion into governance questions, action items, scheduling, data work, and launch-planning next steps.",
          locator: "What we covered and action items",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-GDRIVE-CRS-ALIGNMENT-ACCESS",
          statement:
            "The document includes an experimental multilingual-access layer with an explicit English-control and non-legal-advice boundary.",
          locator: "Language access section",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The minutes are private, do not establish participant approval of every sentence, and do not establish independently reviewed translation quality."
      ],
      entityIds: ["Jamie-Burkart", "Fair-Rent-NYC"],
      themeIds: ["facilitation", "meeting-synthesis", "language-access", "governance"],
      candidateClaimIds: [
        "CND-CRS-SHARED-MEMORY-OPERATING-SYSTEM",
        "CND-CRS-MULTILINGUAL-MEETING-MEMORY"
      ]
    },
    {
      id: "READ-GDRIVE-CRS-DATA-OPPORTUNITY-2026",
      sourceId: "SRC-GDRIVE-CRS-DATA-OPPORTUNITY-2026",
      readAt: "2026-07-12",
      reader: "Codex archival review",
      assertions: [
        {
          id: "ASSERT-GDRIVE-CRS-DATA-STAFF-ASK",
          statement:
            "Jamie reframed the public-data opportunity as a bounded staff-level scoping request with a concrete follow-up pathway.",
          locator: "One-sentence ask and possible pathways",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-GDRIVE-CRS-DATA-MINIMUM-RELEASE",
          statement:
            "The brief specifies a minimum aggregate indicator set, suppression and privacy rules, and a plain-language methods note.",
          locator: "Smallest serious pilot and privacy guardrails",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-GDRIVE-CRS-DATA-AUTHORSHIP",
          statement:
            "The document identifies Jamie as preparer, and recorded revisions attribute creation and updates to him.",
          locator: "Title block and revision history",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The brief is a proposal and does not establish agency adoption, endorsement, implementation, or access to confidential records."
      ],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition", "Fair-Rent-NYC"],
      themeIds: ["public-data", "implementation-specification", "privacy", "staff-handoff"],
      candidateClaimIds: ["CND-CRS-PRIVACY-PRESERVING-DATA-PILOT"]
    },
    {
      id: "READ-GDRIVE-SUNDAY-DINNER-TRACKER-2025",
      sourceId: "SRC-GDRIVE-SUNDAY-DINNER-TRACKER-2025",
      readAt: "2026-07-12",
      reader: "Codex archival review",
      assertions: [
        {
          id: "ASSERT-GDRIVE-SUNDAY-DINNER-EVENT-STRUCTURE",
          statement:
            "The tracker connects dated gatherings with invitation, response, and attendance indicators.",
          locator: "Event columns and summary rows",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-GDRIVE-SUNDAY-DINNER-FOLLOW-THROUGH",
          statement:
            "Event-level response measures create a repeatable follow-through layer for recurring hospitality.",
          locator: "Invitation and response summary rows",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-GDRIVE-SUNDAY-DINNER-AUTHORSHIP",
          statement:
            "Recorded revisions attribute creation and ongoing updates to Jamie.",
          locator: "Revision history",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The tracker contains private community records and does not independently establish the portfolio's aggregate gathering or resident-artist totals."
      ],
      entityIds: ["Jamie-Burkart", "Sunday-Dinner"],
      themeIds: ["hospitality-operations", "participation", "follow-through", "privacy"],
      candidateClaimIds: ["CND-SUNDAY-DINNER-RECURRING-HOSPITALITY-OPERATIONS"]
    },
    {
      id: "READ-GDRIVE-196-ONBOARDING-LETTER-2023",
      sourceId: "SRC-GDRIVE-196-ONBOARDING-LETTER-2023",
      readAt: "2026-07-12",
      reader: "Codex archival review",
      assertions: [
        {
          id: "ASSERT-GDRIVE-196-ONBOARDING-SEQUENCE",
          statement:
            "The letter connects proposal review to dates, a pre-arrival check-in, space configuration, and independent access handoff.",
          locator: "Acceptance and onboarding sequence",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-GDRIVE-196-ONBOARDING-ROLE",
          statement:
            "The letter identifies Jamie as the residency representative responsible for the handoff.",
          locator: "Signature block",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-GDRIVE-196-ONBOARDING-AUTHORSHIP",
          statement:
            "Recorded revisions attribute creation and updates to Jamie.",
          locator: "Revision history",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The correspondence is private and does not establish residency completion, total residents, or permission to publish identity, proposal, contact, or access details."
      ],
      entityIds: ["Jamie-Burkart", "196-Artists-Residency"],
      themeIds: ["onboarding", "resident-support", "handoff", "space-operations"],
      candidateClaimIds: ["CND-196-RESIDENCY-ONBOARDING-WORKFLOW"]
    }
  ],
  candidateClaims: [
    {
      id: "CND-CRS-SHARED-MEMORY-OPERATING-SYSTEM",
      project: "fair-rent-nyc",
      text:
        "Jamie built and maintained a shared campaign-memory operating system that organized decisions, action owners, open questions, public-data work, and consent-aware follow-up while protecting private coalition context.",
      status: "promoted",
      sourceIds: [
        "SRC-GDRIVE-CRS-RUNNING-MEMORY-2026",
        "SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026",
        "SRC-GDRIVE-CRS-ALIGNMENT-MINUTES-2026"
      ],
      researchInquiryIds: ["INQ-GDRIVE-SHARED-DRIVE-ARCHIVAL-PRODUCTION-2026"],
      supportSummary:
        "Three protected artifacts and their revision histories directly support Jamie's sustained stewardship, operating structure, consent fields, facilitation, and action-oriented synthesis.",
      missingEvidence: [],
      boundaries: [
        "Use collective-work language.",
        "Do not publish raw coalition notes, stakeholder rows, strategy, legal-review context, links, or unapproved quotations.",
        "Do not imply ownership of the campaign or authorship of every collaborator contribution."
      ],
      promotedClaimId: "CLM-CRS-SHARED-MEMORY-OPERATIONS",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-CRS-CONSENT-AWARE-OUTREACH-OPERATIONS",
      project: "fair-rent-nyc",
      text:
        "Jamie designed a consent-aware outreach workflow that separated relationship ownership, action ownership, next steps, quote permission, source lineage, and data-quality flags.",
      status: "ready-for-promotion",
      sourceIds: ["SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026"],
      researchInquiryIds: ["INQ-GDRIVE-SHARED-DRIVE-ARCHIVAL-PRODUCTION-2026"],
      supportSummary:
        "The protected schema and revision history directly establish the workflow structure and Jamie's authorship without requiring any private row to be exposed.",
      missingEvidence: [
        "A separately designed public-safe diagram or methods note if this workflow is projected as a featured artifact"
      ],
      boundaries: [
        "Describe the schema, never the people or values in it.",
        "Do not imply every row was complete, correct, consented, or actioned."
      ],
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-SUNDAY-DINNER-RECURRING-HOSPITALITY-OPERATIONS",
      project: "sunday-dinner",
      text:
        "Jamie built a recurring-event operations layer connecting invitations, responses, attendance indicators, and follow-through across Sunday Dinner gatherings.",
      status: "partially-supported",
      sourceIds: ["SRC-GDRIVE-SUNDAY-DINNER-TRACKER-2025"],
      researchInquiryIds: ["INQ-GDRIVE-SHARED-DRIVE-ARCHIVAL-PRODUCTION-2026"],
      supportSummary:
        "The protected tracker and revision history establish a concrete recurring-event workflow but represent only one surviving period of a longer practice.",
      missingEvidence: [
        "A public-safe project chronology connecting this tracker to the complete Sunday Dinner history",
        "Independent or approved aggregate support for the full gathering count"
      ],
      boundaries: [
        "Do not publish guest, contact, invitation, response, or attendance records.",
        "Do not use the tracker alone to establish the 300-plus gathering total."
      ],
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-196-RESIDENCY-ONBOARDING-WORKFLOW",
      project: "196-artists-residency",
      text:
        "Jamie created a concrete resident-onboarding handoff connecting proposal review, scheduling, pre-arrival check-in, space preparation, and independent access.",
      status: "ready-for-promotion",
      sourceIds: ["SRC-GDRIVE-196-ONBOARDING-LETTER-2023"],
      researchInquiryIds: ["INQ-GDRIVE-SHARED-DRIVE-ARCHIVAL-PRODUCTION-2026"],
      supportSummary:
        "The signed letter and revision history directly establish Jamie's role and the onboarding sequence.",
      missingEvidence: [],
      boundaries: [
        "Do not publish the resident's identity, proposal, contact details, dates, or access instructions.",
        "Do not imply completion or outcome of the residency."
      ],
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-CRS-MULTILINGUAL-MEETING-MEMORY",
      project: "fair-rent-nyc",
      text:
        "Jamie prepared a multilingual-access layer for cross-organization meeting memory alongside action items and public-share boundaries.",
      status: "partially-supported",
      sourceIds: ["SRC-GDRIVE-CRS-ALIGNMENT-MINUTES-2026"],
      researchInquiryIds: ["INQ-GDRIVE-SHARED-DRIVE-ARCHIVAL-PRODUCTION-2026"],
      supportSummary:
        "The protected document contains the access layer and identifies Jamie as facilitator and note preparer, but translation quality was not independently reviewed.",
      missingEvidence: [
        "Independent language review",
        "Confirmation of how collaborators used the translated material"
      ],
      boundaries: [
        "Call it an experimental access layer, not professionally certified translation.",
        "Do not publish participant or strategy context from the minutes."
      ],
      reviewedAt: "2026-07-12"
    }
  ],
  promotions: [
    {
      id: "PROM-CRS-SHARED-MEMORY-OPERATIONS-2026",
      candidateClaimId: "CND-CRS-SHARED-MEMORY-OPERATING-SYSTEM",
      claimId: "CLM-CRS-SHARED-MEMORY-OPERATIONS",
      decision: "promoted",
      reason:
        "The claim was already represented in public-safe site copy; protected artifacts and revision history now make its role, operating value, and boundaries canonical without exposing source contents.",
      decidedAt: "2026-07-12",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-CRS-CONSENT-AWARE-OUTREACH-HOLD-2026",
      candidateClaimId: "CND-CRS-CONSENT-AWARE-OUTREACH-OPERATIONS",
      decision: "held",
      reason:
        "The workflow is strongly supported and useful for future role-specific composition, but the current case study already communicates the larger operating-memory result without inviting attention toward a private stakeholder system.",
      decidedAt: "2026-07-12",
      decidedBy: ["Codex archival review"]
    },
    {
      id: "PROM-SUNDAY-DINNER-HOSPITALITY-HOLD-2026",
      candidateClaimId: "CND-SUNDAY-DINNER-RECURRING-HOSPITALITY-OPERATIONS",
      decision: "held",
      reason:
        "The artifact deepens the bank but covers only one period and cannot independently establish the full public aggregate claim.",
      decidedAt: "2026-07-12",
      decidedBy: ["Codex archival review"]
    },
    {
      id: "PROM-196-ONBOARDING-HOLD-2026",
      candidateClaimId: "CND-196-RESIDENCY-ONBOARDING-WORKFLOW",
      decision: "held",
      reason:
        "The onboarding sequence is defensible, but the current summary-only page is stronger than adding detail derived from private correspondence.",
      decidedAt: "2026-07-12",
      decidedBy: ["Codex archival review"]
    },
    {
      id: "PROM-CRS-MULTILINGUAL-MEMORY-HOLD-2026",
      candidateClaimId: "CND-CRS-MULTILINGUAL-MEETING-MEMORY",
      decision: "held",
      reason:
        "The access effort is worth retaining, but translation quality and downstream use require human language review before stronger public composition.",
      decidedAt: "2026-07-12",
      decidedBy: ["Codex archival review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-GDRIVE-ARCHIVAL-PRODUCTION-2026-07-12",
      audience:
        "Hiring managers, public-interest technology teams, civic implementation leaders, and trusted collaborators",
      goal:
        "Use Shared Drive evidence to make Jamie's operating contribution more defensible without turning private collaboration spaces into public content.",
      argument:
        "Jamie does not merely record activity. He builds shared operating memory that connects decisions, ownership, consent, public-data requirements, and follow-through so complex public-facing work can continue safely.",
      selectedClaimIds: [
        "CLM-CRS-SHARED-MEMORY-OPERATIONS",
        "CLM-CRS-PRIVACY-PRESERVING-DATA-PILOT"
      ],
      heldCandidateClaimIds: [
        "CND-CRS-CONSENT-AWARE-OUTREACH-OPERATIONS",
        "CND-SUNDAY-DINNER-RECURRING-HOSPITALITY-OPERATIONS",
        "CND-196-RESIDENCY-ONBOARDING-WORKFLOW",
        "CND-CRS-MULTILINGUAL-MEETING-MEMORY"
      ],
      rationale: [
        "Formalize the campaign-memory claim because the evidence directly reduces ambiguity about Jamie's role and what became usable.",
        "Keep the consent-aware tracker in reserve for technical-operations or data-stewardship opportunities where the schema itself is relevant.",
        "Retain hospitality and residency workflow evidence without publishing community records or overloading a summary-only case study.",
        "Treat Shared Drives as protected institutional archives, not as public URLs or blanket publication permission."
      ],
      createdAt: "2026-07-12"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-GDRIVE-RECURSIVE-ARCHIVE-PASS-2026",
      kind: "archive-research",
      summary:
        "Future Shared Drive passes should begin with drive-level classification, follow revision-attributed working artifacts, preserve duplicate and snapshot relationships, and develop public-safe diagrams or methods notes when a private workflow is valuable enough to project. Media-heavy drives should feed photo-editor briefs rather than factual claims until rights, identity, and context are reviewed.",
      projectHints: [
        "fair-rent-nyc",
        "sunday-dinner",
        "196-artists-residency",
        "source-backed-team-memory"
      ],
      sourceIds: [
        "SRC-GDRIVE-SHARED-DRIVE-RESEARCH-2026",
        "SRC-GDRIVE-CRS-RUNNING-MEMORY-2026",
        "SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026",
        "SRC-GDRIVE-SUNDAY-DINNER-TRACKER-2025",
        "SRC-GDRIVE-196-ONBOARDING-LETTER-2023"
      ],
      candidateClaimIds: [
        "CND-CRS-SHARED-MEMORY-OPERATING-SYSTEM",
        "CND-CRS-CONSENT-AWARE-OUTREACH-OPERATIONS",
        "CND-SUNDAY-DINNER-RECURRING-HOSPITALITY-OPERATIONS",
        "CND-196-RESIDENCY-ONBOARDING-WORKFLOW"
      ],
      rightsReviewRequired: true,
      status: "processed",
      createdAt: "2026-07-12"
    }
  ]
};
