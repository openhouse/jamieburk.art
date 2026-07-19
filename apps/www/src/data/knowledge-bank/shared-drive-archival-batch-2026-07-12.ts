import type { KnowledgeBank } from "./schema.ts";

type SharedDriveArchivalBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

export const sharedDriveArchivalBatchRecords: SharedDriveArchivalBatch = {
  sources: [
    {
      id: "SRC-GDRIVE-SHARED-DRIVE-RESEARCH-2026",
      title: "Shared Google Drive archival-production research run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for a July 2026 review of Jamie Burkart's accessible Shared Google Drives.",
      publicNote:
        "The inventory and file coordinates remain protected; the record preserves method, selection, and limitations only.",
      protectedLocatorId: "RESEARCH-GDRIVE-SHARED-DRIVES-2026-001",
      supportsGenerally: [
        "110 Shared Drives were accessible to the authenticated account during the review window",
        "the archive spans civic, cultural, technical, hospitality, public-data, and collaboration work",
        "a representative work-relevant cohort was mapped before individual artifacts were selected",
        "many drives function as dated snapshots or media containers rather than claim-bearing document collections"
      ],
      doesNotEstablish: [
        "that Jamie created every accessible drive",
        "that Jamie authored every file in a shared workspace",
        "that shared access grants publication permission",
        "an exhaustive reading of all 110 drives"
      ]
    },
    {
      id: "SRC-GDRIVE-CRS-RUNNING-MEMORY-2026",
      title: "Commercial Rent Stabilization shared running-memory system",
      organization: "Fair Rent NYC / NYC Artist Coalition collaborators",
      author: "Jamie Burkart and collaborators",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-04-29 to 2026-05-29",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for a shared Commercial Rent Stabilization running-memory system maintained in 2026.",
      publicNote:
        "The underlying coalition record is private; only its operating structure and revision-level stewardship are summarized.",
      protectedLocatorId: "ARCHIVE-GDRIVE-CRS-RUNNING-MEMORY-2026-001",
      supportsGenerally: [
        "Jamie created the document and maintained most recorded revisions during the reviewed period",
        "the system organizes decisions, action owners, open questions, current language, and meeting memory",
        "the document defines consent levels and handling rules for sensitive stories and contacts",
        "the document separates public materials from private strategy, legal-review, and stakeholder context"
      ],
      doesNotEstablish: [
        "solo ownership of the coalition or campaign",
        "authorship of every contribution in the shared document",
        "public clearance of the underlying notes",
        "legal authority or official legislative authorship"
      ]
    },
    {
      id: "SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026",
      title: "Commercial Rent Stabilization outreach and action tracker",
      organization: "NYC Artist Coalition / Fair Rent NYC",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-02-03 to 2026-02-04",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for a consent-aware Commercial Rent Stabilization outreach and action tracker created by Jamie Burkart in 2026.",
      publicNote:
        "No names, contact details, quotations, relationship data, or private rows are included in the public repository.",
      protectedLocatorId: "ARCHIVE-GDRIVE-CRS-OUTREACH-TRACKER-2026-001",
      supportsGenerally: [
        "recorded revisions attribute creation and subsequent updates to Jamie",
        "the tracker separates consent to contact from permission to quote publicly",
        "the schema tracks relationship ownership, outreach ownership, next action, status, source, and data-quality flags",
        "the workflow connects outreach records to explicit follow-up responsibility"
      ],
      doesNotEstablish: [
        "public consent from any person represented in the tracker",
        "the correctness or completeness of every private row",
        "completion of every proposed follow-up",
        "public clearance of the stakeholder list"
      ]
    },
    {
      id: "SRC-GDRIVE-CRS-ALIGNMENT-MINUTES-2026",
      title: "Commercial Rent Stabilization cross-organization alignment minutes",
      organization: "Fair Rent NYC collaborators",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-02-25 to 2026-03-02",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for cross-organization Commercial Rent Stabilization alignment minutes facilitated and prepared by Jamie Burkart in 2026.",
      publicNote:
        "Attendee details, internal strategy, working links, and unapproved coalition context remain excluded.",
      protectedLocatorId: "ARCHIVE-GDRIVE-CRS-ALIGNMENT-MINUTES-2026-001",
      supportsGenerally: [
        "the record identifies Jamie as facilitator and note preparer",
        "the minutes translate discussion into governance questions, action items, owners, and next meetings",
        "the document records explicit public-share boundaries for referenced materials",
        "the record includes an experimental multilingual-access layer with an English-control disclaimer"
      ],
      doesNotEstablish: [
        "independent review of translation quality",
        "agreement by every participant with every summary sentence",
        "public clearance of the underlying meeting record",
        "solo leadership of the coalition"
      ]
    },
    {
      id: "SRC-GDRIVE-CRS-DATA-OPPORTUNITY-2026",
      title: "Commercial vacancy public-data implementation brief",
      organization: "NYC Artist Coalition / Fair Rent NYC",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-05-19 to 2026-05-20",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for Jamie Burkart's 2026 staff-oriented commercial vacancy public-data implementation brief.",
      publicNote:
        "The protected working document corroborates the already-public pilot brief without exposing contact or distribution context.",
      protectedLocatorId: "ARCHIVE-GDRIVE-CRS-DATA-OPPORTUNITY-2026-001",
      supportsGenerally: [
        "Jamie translated the data opportunity into a bounded staff-level request and follow-up pathway",
        "the brief specifies a minimum geography-aggregated indicator set and methods note",
        "the request explicitly excludes confidential filings, identities, individual leases, and proprietary microdata",
        "recorded revisions attribute creation and updates to Jamie"
      ],
      doesNotEstablish: [
        "agency adoption or endorsement",
        "implementation of the proposed dataset",
        "access to confidential filings",
        "official statistical or legal authority"
      ]
    },
    {
      id: "SRC-GDRIVE-SUNDAY-DINNER-TRACKER-2025",
      title: "Sunday Dinner recurring-event operations tracker",
      organization: "Sunday Dinner",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2025-02-28 to 2026-01-10",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for a recurring-event operations tracker created and maintained by Jamie Burkart.",
      publicNote:
        "Private guest, contact, invitation, response, and attendance data remain outside the repository.",
      protectedLocatorId: "ARCHIVE-GDRIVE-SUNDAY-DINNER-TRACKER-2025-001",
      supportsGenerally: [
        "recorded revisions attribute creation and ongoing updates to Jamie",
        "the tracker connects event dates with invitation, response, and attendance indicators",
        "event-level response measures support repeatable hosting follow-through",
        "the artifact shows a durable operating layer behind recurring hospitality"
      ],
      doesNotEstablish: [
        "the approved 300-plus gathering total by itself",
        "the approved 20-plus resident-artist total by itself",
        "complete attendance history",
        "permission to publish guest or contact records"
      ]
    },
    {
      id: "SRC-GDRIVE-196-ONBOARDING-LETTER-2023",
      title: "196 Artists Residency onboarding letter",
      organization: "196 Artists Residency",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2023-07-19",
      accessedAt: "2026-07-12",
      publicCitation:
        "Public-safe metadata for a 196 Artists Residency acceptance and onboarding letter prepared by Jamie Burkart in 2023.",
      publicNote:
        "The resident's identity, contact details, access instructions, proposal details, and private correspondence remain excluded.",
      protectedLocatorId: "ARCHIVE-GDRIVE-196-ONBOARDING-LETTER-2023-001",
      supportsGenerally: [
        "the letter identifies Jamie as the residency representative",
        "the workflow connects proposal review to dates, a pre-arrival check-in, space configuration, and independent access",
        "recorded revisions attribute creation and updates to Jamie",
        "the artifact documents a concrete resident-onboarding handoff"
      ],
      doesNotEstablish: [
        "the total number of resident artists",
        "completion or outcome of the residency",
        "permission to publish the underlying correspondence",
        "institutional ownership of the resident's work"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-CRS-SHARED-MEMORY-OPERATIONS",
      project: "fair-rent-nyc",
      internalClaim:
        "Jamie built and maintained a shared operating-memory system for sensitive, cross-organizational Commercial Rent Stabilization work.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "Jamie built and maintained a shared campaign-memory operating system that organized decisions, action owners, open questions, public-data work, and consent-aware follow-up while keeping private coalition, legal-review, and stakeholder material protected.",
          status: "active",
          citationRequired: false,
          surfaces: ["/work/fair-rent-nyc"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-GDRIVE-CRS-RUNNING-MEMORY-2026",
          relationship: "private-support",
          supports: [
            "the shared-memory structure",
            "Jamie's sustained revision-level stewardship",
            "decision, action, consent, and boundary fields"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026",
          relationship: "private-support",
          supports: [
            "consent-aware follow-up",
            "relationship and action ownership",
            "data-quality handling"
          ],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-GDRIVE-CRS-ALIGNMENT-MINUTES-2026",
          relationship: "private-support",
          supports: [
            "facilitation and meeting synthesis",
            "action-oriented cross-organization alignment",
            "public-share boundaries"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Use collective-work language and describe Jamie's operating contribution without assigning him ownership of the coalition or campaign.",
        "Do not expose private coalition notes, stakeholder records, legal-review context, unapproved quotations, or working links.",
        "The source records support the operating pattern, not agreement by every collaborator with every note."
      ],
      antiClaims: [
        "Jamie led or owned the Commercial Rent Stabilization movement",
        "Jamie authored the legislation",
        "the private coalition archive is publicly available",
        "every tracked outreach action was completed"
      ],
      researchInquiryIds: ["INQ-GDRIVE-SHARED-DRIVE-ARCHIVAL-PRODUCTION-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-GDRIVE-SHARED-DRIVE-ARCHIVAL-PRODUCTION-2026",
      project: "knowledge-bank",
      question:
        "Which public-safe sources and defensible professional claims can be developed from Jamie's Shared Google Drive practice without exposing collaborators or private operational records?",
      methods: [
        "Used the authenticated Google Drive connection to inventory 110 accessible Shared Drives and classify obvious personal, media-only, sync, and work-relevant categories.",
        "Mapped a representative cohort spanning civic coalition work, public data, civic events, artist residency, recurring hospitality, community platforms, and technical collaboration.",
        "Closely read selected Docs and bounded spreadsheet structures, then checked revision history for authorship and stewardship signals.",
        "Recorded only public-safe metadata, assertions, limits, and protected locator tokens; raw Drive IDs, URLs, private rows, and collaborator records were excluded."
      ],
      runAt: "2026-07-12",
      resultStatus: "partially-recovered",
      findings: [
        "The strongest new evidence shows Jamie turning sensitive coalition work into shared memory, explicit action ownership, consent-aware follow-up, and reusable implementation briefs.",
        "Recurring-event and residency artifacts show a concrete operating layer for invitations, responses, space preparation, access, and resident handoff.",
        "Revision history corroborates Jamie's creation and sustained maintenance of the selected trackers and documents.",
        "The existing site already projected the strongest public-safe campaign-memory and hospitality conclusions; the pass formalized the campaign-memory claim and deepened protected evidence rather than adding archive detail to the page."
      ],
      limitations: [
        "The pass was representative rather than exhaustive across all 110 accessible drives.",
        "Shared access does not establish that Jamie created every drive, authored every file, or has permission to publish its contents.",
        "Some roots are dated snapshots, duplicates, or media containers; direct-folder listings can also be partial.",
        "Private stakeholder, contact, attendance, correspondence, strategy, legal-review, and access-control details were deliberately excluded.",
        "Translation quality in the experimental multilingual meeting record was not independently evaluated."
      ],
      sourceIds: [
        "SRC-GDRIVE-SHARED-DRIVE-RESEARCH-2026",
        "SRC-GDRIVE-CRS-RUNNING-MEMORY-2026",
        "SRC-GDRIVE-CRS-OUTREACH-TRACKER-2026",
        "SRC-GDRIVE-CRS-ALIGNMENT-MINUTES-2026",
        "SRC-GDRIVE-CRS-DATA-OPPORTUNITY-2026",
        "SRC-GDRIVE-SUNDAY-DINNER-TRACKER-2025",
        "SRC-GDRIVE-196-ONBOARDING-LETTER-2023"
      ],
      publicSummary:
        "A representative review of Jamie's Shared Drive practice formalized one protected-evidence-backed campaign-memory claim, developed three future-use operating claims, and preserved explicit authorship, consent, and publication boundaries.",
      protectedLocatorId: "RESEARCH-GDRIVE-SHARED-DRIVES-2026-001"
    }
  ]
};
