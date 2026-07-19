import type { KnowledgeBank } from "./schema.ts";

type JamieFacebookPostsBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries"
>;

export const jamieFacebookPostsBatchRecords: JamieFacebookPostsBatch = {
  sources: [
    {
      id: "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
      title: "Jamie Burkart Facebook authored-post population control",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-13",
      accessedAt: "2026-07-13",
      publicCitation:
        "Public-safe metadata for a July 2026 authenticated review of Facebook's Manage Posts surface filtered to records posted by Jamie Burkart.",
      publicNote:
        "The review selected Facebook's `Posted by: You` control, confirmed the corresponding owner filter, and followed the returned cursor chain to its terminal flag. Authenticated requests, tokens, account controls, and raw records remain outside the public repository.",
      protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-POSTS-2026-001",
      supportsGenerally: [
        "the authenticated `Posted by: You` population control",
        "an owner-filtered authored-post surface distinct from posts by others or tagged-in-only records",
        "a terminal server pagination flag"
      ],
      doesNotEstablish: [
        "an official Facebook account export",
        "records deleted, hidden, or removed before capture",
        "that every returned record was publicly visible to logged-out readers",
        "every post Jamie ever created"
      ]
    },
    {
      id: "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
      title: "Jamie Burkart Facebook full authored-post population run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-13",
      accessedAt: "2026-07-13",
      publicCitation:
        "Public-safe metadata for a July 2026 record-level accounting of Jamie Burkart's surviving Facebook authored-post population.",
      publicNote:
        "The owner-filtered cursor returned 3,728 nodes across 621 pages before `has_next_page: false`. Stable-story deduplication produced 1,243 unique records. Facebook replayed 1,242 records three times and one record twice before termination, so returned-node and unique-record counts remain separate.",
      protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-POSTS-2026-002",
      supportsGenerally: [
        "1,243 unique stable story records",
        "3,728 returned nodes across 621 cursor pages",
        "the 2006 through 2022 recovered year range",
        "998 records with readable message text and 245 records whose text was unavailable or media-led",
        "record-level year, form, broad theme, and professional-relevance classifications"
      ],
      doesNotEstablish: [
        "that the absent years contain no deleted, hidden, or otherwise unrecovered posts",
        "public visibility for every record",
        "interaction, reach, impression, attendance, endorsement, adoption, or impact totals",
        "professional importance from posting frequency"
      ]
    },
    {
      id: "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
      title: "Jamie Burkart Facebook professional-candidate close reading",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-13",
      accessedAt: "2026-07-13",
      publicCitation:
        "Public-safe metadata for a July 2026 close reading of professionally relevant records surfaced from Jamie Burkart's surviving Facebook authored-post population.",
      publicNote:
        "A deterministic first pass marked 222 records for professional review: 158 project-specific and 64 practice-related. Close reading identified recurring implementation patterns across WOW List, Sunday Dinner, NYC Artist Coalition campaigns, waterways and place-based work, and technical practice. Raw text, people, locations, exact dates, URLs, and media remain protected.",
      protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-POSTS-2026-003",
      supportsGenerally: [
        "47 recovered WOW List-related authored records",
        "43 recovered Sunday Dinner-related authored records",
        "33 recovered NYC Artist Coalition and campaign-related authored records",
        "recurring public-facing implementation patterns across projects"
      ],
      doesNotEstablish: [
        "that keyword-assisted classifications are complete or exclusive",
        "a measure of effort, importance, reach, or impact",
        "independent corroboration of Jamie's own contemporaneous account",
        "sole credit for collective projects"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING-2026",
      project: "jamie-facebook-archive",
      internalClaim:
        "The July 2026 authenticated Facebook Manage Posts control exposed 1,243 unique records posted by Jamie from 2006 through 2022. The cursor terminated after 621 pages and 3,728 returned nodes, including an observed near-threefold replay that was resolved by stable-story deduplication.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "A terminal-cursor census accounted for 1,243 unique records in Jamie's surviving Facebook `Posted by: You` population, while preserving Facebook's replay behavior and the limits of a current authenticated surface.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/jamie-facebook-posts-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
          relationship: "context",
          supports: ["the owner-filtered population control and terminal pagination method"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
          relationship: "direct-support",
          supports: ["returned-node, page, unique-record, year, form, and text-availability counts"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Complete means the surviving owner-filtered population exposed in this authenticated session reached Facebook's terminal server flag.",
        "The control cannot reveal records deleted, hidden, or removed before capture, and it is not an official Facebook export.",
        "Privacy labels were not recovered for most records, so the raw population remains protected regardless of current platform visibility."
      ],
      antiClaims: [
        "The census contains every Facebook post Jamie ever created",
        "All 1,243 records were public",
        "The 3,728 returned nodes represent 3,728 unique posts",
        "Missing years prove Jamie did not post during those years"
      ],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD-2009-2020",
      project: "participatory-public-systems",
      internalClaim:
        "A protected close reading of 222 professionally relevant candidate records in Jamie's surviving authored-post population documents recurring implementation work: building participation routes, translating goals into usable instructions, maintaining community identity and continuity, organizing recurring programs, and connecting public communication with operational follow-through.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Jamie's personal Facebook record preserves a long implementation throughline: participation routes, usable instructions, recurring-program operations, public identity, documentation, and follow-through across civic, cultural, community, and technical work.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/jamie-facebook-posts-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
          relationship: "direct-support",
          supports: ["recurring implementation patterns across the professionally relevant candidate set"],
          confidence: "moderate",
          renderCitation: false
        }
      ],
      boundaries: [
        "This is a synthesis of Jamie's own authored record, not independent validation of every event, result, role description, or causal claim.",
        "Project work was collective; use the archive to clarify Jamie's contribution without absorbing collaborators' work.",
        "The 222-record candidate set is a research aid, not a count of professional effort or importance."
      ],
      antiClaims: [
        "Every professionally relevant record represents a separate project or outcome",
        "Posting frequency measures Jamie's labor or impact",
        "Jamie's authored record independently proves policy causality or sole leadership"
      ],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex protected-source review"]
    },
    {
      id: "CLM-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE-2017-2019",
      project: "nyc-artist-coalition",
      internalClaim:
        "Thirty-three recovered NYC Artist Coalition and campaign-related records authored by Jamie document his implementation practice: convening meetings and hearings, publishing call scripts and action routes, organizing safety training, soliciting priorities and survey participation, communicating public-process milestones, and crediting coalition partners.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text:
            "Jamie's contemporaneous authored record documents coalition implementation through meetings, hearings, action routes, safety training, public-input workflows, milestone communication, and collective credit.",
          status: "active",
          citationRequired: false,
          surfaces: ["docs/knowledge-bank/jamie-facebook-posts-2026-07-13"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
          relationship: "private-support",
          supports: ["Jamie's contemporaneous descriptions of coalition implementation work"],
          confidence: "moderate",
          renderCitation: false
        }
      ],
      boundaries: [
        "Use independent public sources for campaign outcomes, government action, attendance, and causal claims.",
        "The record supports Jamie's implementation contribution, not sole coalition leadership or sole policy credit.",
        "Do not expose personal-account URLs, private locations, phone numbers, relationship context, or unreviewed media."
      ],
      antiClaims: [
        "Jamie alone created or led every NYC Artist Coalition campaign",
        "Thirty-three personal posts prove campaign impact or policy causality",
        "Every person, place, or event in the raw record is approved for publication"
      ],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"],
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex protected-source review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026",
      project: "jamie-facebook-archive",
      question:
        "Can 100 percent of Jamie Burkart's surviving Facebook-authored post population be accounted for, classified, and integrated without turning personal history into a public dossier or confusing self-documentation with independent proof?",
      methods: [
        "Opened Jamie's authenticated Facebook profile and selected Manage Posts.",
        "Applied Facebook's `Posted by: You` control and confirmed the owner-filtered query state rather than using a mixed timeline of authored, tagged, and other-authored records.",
        "Followed the server cursor until Facebook returned `has_next_page: false`.",
        "Recorded all 3,728 returned nodes across 621 pages and deduplicated them by stable story ID into 1,243 unique records.",
        "Audited recurrence distance and frequency after Facebook replayed almost the entire unique population three times before termination.",
        "Classified every unique record by year, primary form, broad theme, professional relevance, accounting status, and public-detail status.",
        "Performed a second-stage close reading of 222 project-specific or practice-related candidates while retaining all raw text, URLs, people, exact dates, media, privacy context, and authenticated responses outside the public repository."
      ],
      runAt: "2026-07-13",
      resultStatus: "recovered",
      findings: [
        "The owner-filtered cursor terminated after 621 pages and 3,728 returned nodes, producing 1,243 unique stable story records after deduplication.",
        "Facebook replayed 1,242 unique records three times and one record twice before returning the terminal flag.",
        "The recovered population spans 2006 through 2022 and contains 998 records with readable message text plus 245 whose text was unavailable or media-led.",
        "Every unique record is represented in the public-safe aggregate census without text, exact dates, IDs, URLs, names, locations, privacy labels, or interaction data.",
        "A first-pass classification surfaced 158 project-specific and 64 practice-related records for close reading; frequency remains analytically separate from significance.",
        "The close reading preserves recurring project-operation evidence across WOW List, Sunday Dinner, NYC Artist Coalition campaigns, waterways and place-based practice, and technical work."
      ],
      limitations: [
        "A terminal current cursor cannot reveal records deleted, hidden, or removed before capture and is not an official Facebook export.",
        "The recovered year range is not proof that Jamie made no posts in absent years or after the newest recovered record.",
        "Privacy labels were unavailable for most records; raw content therefore remains protected rather than presumed public.",
        "The Manage Posts query did not supply complete interaction metrics, so the absence of counts cannot be interpreted as zero engagement.",
        "Broad themes and professional-relevance labels are deterministic research aids, not neutral categories or measures of effort, importance, reach, or impact.",
        "Jamie's own posts are contemporaneous first-person evidence but require independent corroboration for outcomes, causal claims, and contested role attributions."
      ],
      sourceIds: [
        "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
        "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
        "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026"
      ],
      publicSummary:
        "A terminal-cursor review accounted for all 1,243 unique records exposed by Jamie's surviving Facebook `Posted by: You` surface, classifying every record while keeping the personal corpus protected and separating self-documentation from independent proof.",
      protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-POSTS-2026-001"
    }
  ]
};
