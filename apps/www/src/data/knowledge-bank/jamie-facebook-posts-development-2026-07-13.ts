import type { KnowledgeBank } from "./schema.ts";

type JamieFacebookPostsDevelopment = Pick<
  KnowledgeBank,
  "intakeItems" | "sourceReadings" | "candidateClaims" | "promotions" | "editorialBriefs"
>;

export const jamieFacebookPostsDevelopmentRecords: JamieFacebookPostsDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-13-JAMIE-FACEBOOK-FULL-POST-POPULATION",
      receivedAt: "2026-07-13",
      submittedBy: "Jamie Burkart",
      kind: "claim",
      visibility: "protected",
      summary:
        "Perform an archival-production pass on 100 percent of Jamie's personal Facebook posts in the authenticated account context and integrate significant professional findings without publishing personal history.",
      projectHints: ["jamie-facebook-archive", "participatory-public-systems"],
      status: "processed",
      disposition:
        "Recovered the complete surviving `Posted by: You` cursor population, created an aggregate-only 1,243-row census, promoted bounded archive claims, and held completeness, visibility, frequency, and impact overclaims.",
      linkedRecordIds: [
        "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
        "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
        "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
        "INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026",
        "CND-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING",
        "CND-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD",
        "CND-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE",
        "CND-JAMIE-FACEBOOK-COMPLETE-LIFETIME-HISTORY",
        "CND-JAMIE-FACEBOOK-FREQUENCY-EQUALS-IMPACT"
      ],
      protectedLocatorId: "RESEARCH-JAMIE-FACEBOOK-POSTS-2026-001"
    }
  ],
  sourceReadings: [
    {
      id: "READ-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
      sourceId: "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
      readAt: "2026-07-13",
      reader: "Codex authenticated Facebook review",
      assertions: [
        {
          id: "ASSERT-JAMIE-FACEBOOK-OWNER-FILTER",
          statement:
            "Facebook's `Posted by: You` filter selected the owner-authored Manage Posts population and excluded the `Others` and tagged-only controls.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-JAMIE-FACEBOOK-TERMINAL-CURSOR",
          statement:
            "The owner-filtered pagination chain eventually returned `has_next_page: false`.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "The authenticated interface is not an official export and cannot disclose records deleted or hidden before review."
      ],
      entityIds: ["JamieBurkart"],
      themeIds: ["population-control", "authorship-boundary"],
      candidateClaimIds: [
        "CND-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING",
        "CND-JAMIE-FACEBOOK-COMPLETE-LIFETIME-HISTORY"
      ]
    },
    {
      id: "READ-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
      sourceId: "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
      readAt: "2026-07-13",
      reader: "Codex terminal-cursor and data-quality review",
      assertions: [
        {
          id: "ASSERT-JAMIE-FACEBOOK-POPULATION-1243",
          statement:
            "The terminal run returned 3,728 nodes across 621 pages and resolved to 1,243 unique stable story records.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-JAMIE-FACEBOOK-REPLAY-PATTERN",
          statement:
            "Facebook replayed 1,242 records three times and one record twice before returning the terminal flag.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-JAMIE-FACEBOOK-TEXT-AVAILABILITY",
          statement:
            "The unique population contains 998 records with readable message text and 245 records whose text was unavailable or media-led.",
          confidence: "high",
          publicSafe: true
        }
      ],
      limitations: [
        "Privacy labels were unavailable for most records, and interaction metrics were not part of the recovered Manage Posts query.",
        "Theme and professional-relevance classifications are research aids rather than effort or impact measures."
      ],
      entityIds: ["JamieBurkart"],
      themeIds: ["population-accounting", "data-quality", "privacy-boundary"],
      candidateClaimIds: [
        "CND-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING",
        "CND-JAMIE-FACEBOOK-COMPLETE-LIFETIME-HISTORY",
        "CND-JAMIE-FACEBOOK-FREQUENCY-EQUALS-IMPACT"
      ]
    },
    {
      id: "READ-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
      sourceId: "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026",
      readAt: "2026-07-13",
      reader: "Codex protected-source close reading",
      assertions: [
        {
          id: "ASSERT-JAMIE-FACEBOOK-PROFESSIONAL-CANDIDATES-222",
          statement:
            "The first-pass classification surfaced 158 project-specific and 64 practice-related records for closer review.",
          confidence: "high",
          publicSafe: true
        },
        {
          id: "ASSERT-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD",
          statement:
            "Close reading identified recurring implementation patterns: participation routes, usable instructions, recurring-program operations, public identity, documentation, and follow-through.",
          confidence: "moderate",
          publicSafe: true
        },
        {
          id: "ASSERT-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION",
          statement:
            "Thirty-three NYC Artist Coalition and campaign-related records document meetings, hearings, action routes, safety training, public-input workflows, milestone communication, and collective credit in Jamie's authored record.",
          confidence: "moderate",
          publicSafe: true
        }
      ],
      limitations: [
        "Jamie's own contemporaneous record supports role understanding but is not independent corroboration of outcomes or causality.",
        "Keyword-assisted group counts are non-exclusive research aids and do not measure work or importance."
      ],
      entityIds: ["JamieBurkart", "WOWList", "NYCArtistCoalition"],
      themeIds: ["project-operations", "participation-systems", "collective-credit"],
      candidateClaimIds: [
        "CND-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD",
        "CND-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE",
        "CND-JAMIE-FACEBOOK-FREQUENCY-EQUALS-IMPACT"
      ]
    }
  ],
  candidateClaims: [
    {
      id: "CND-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING",
      project: "jamie-facebook-archive",
      text:
        "The current Facebook `Posted by: You` surface contains 1,243 unique surviving records across a terminal 621-page cursor chain.",
      status: "promoted",
      sourceIds: [
        "SRC-JAMIE-FACEBOOK-MANAGE-POSTS-CONTROL-2026",
        "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026"
      ],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"],
      supportSummary:
        "The owner-filtered query reached its terminal flag; stable-story deduplication reconciled 3,728 returned nodes into 1,243 unique records and preserved the observed replay pattern.",
      missingEvidence: [],
      boundaries: [
        "Complete describes the current surviving authenticated control, not every post ever made or every privacy state."
      ],
      promotedClaimId: "CLM-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING-2026",
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD",
      project: "participatory-public-systems",
      text:
        "Jamie's authored Facebook record preserves a recurring implementation throughline across civic, cultural, community, and technical work.",
      status: "promoted",
      sourceIds: ["SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026"],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"],
      supportSummary:
        "The protected candidate set contains repeated evidence of participation routes, instructions, recurring-program systems, public identity, documentation, and follow-through.",
      missingEvidence: [],
      boundaries: [
        "Use independent sources for outcomes and preserve collective project credit."
      ],
      promotedClaimId: "CLM-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD-2009-2020",
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE",
      project: "nyc-artist-coalition",
      text:
        "Jamie's contemporaneous authored record documents recurring NYC Artist Coalition implementation work across participation, safety, public-process, communication, and campaign workflows.",
      status: "promoted",
      sourceIds: ["SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026"],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"],
      supportSummary:
        "Thirty-three selected records preserve meetings, hearings, calls to action, training, survey and input workflows, milestone communication, and collective credit.",
      missingEvidence: [],
      boundaries: [
        "Treat this as first-person role evidence; use independent sources for policy outcomes, attendance, causality, or contested credit."
      ],
      promotedClaimId: "CLM-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE-2017-2019",
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-JAMIE-FACEBOOK-COMPLETE-LIFETIME-HISTORY",
      project: "jamie-facebook-archive",
      text:
        "The 1,243-record census is every Facebook post Jamie ever created and proves there were no other posts in absent years.",
      status: "research-needed",
      sourceIds: ["SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026"],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"],
      supportSummary:
        "The current cursor terminated, but a live interface cannot reveal records deleted, hidden, removed, or omitted before capture.",
      missingEvidence: ["An authorized complete Facebook account export with deletion and retention context"],
      boundaries: [
        "Use `complete surviving filtered population exposed in this session`, never `complete lifetime history`."
      ],
      reviewedAt: "2026-07-13"
    },
    {
      id: "CND-JAMIE-FACEBOOK-FREQUENCY-EQUALS-IMPACT",
      project: "jamie-facebook-archive",
      text:
        "Post, theme, and project frequencies measure Jamie's professional effort, priority, reach, or impact.",
      status: "research-needed",
      sourceIds: [
        "SRC-JAMIE-FACEBOOK-FULL-POST-POPULATION-RUN-2026",
        "SRC-JAMIE-FACEBOOK-PROFESSIONAL-CLOSE-READ-2026"
      ],
      researchInquiryIds: ["INQ-JAMIE-FACEBOOK-FULL-POST-POPULATION-2026"],
      supportSummary:
        "Counts describe the surviving records and research selection, not the importance of work or its outcomes.",
      missingEvidence: [
        "Independent project-specific evidence for effort, audience, outcomes, and causal contribution"
      ],
      boundaries: [
        "Use frequency only to navigate the archive and locate patterns for close reading."
      ],
      reviewedAt: "2026-07-13"
    }
  ],
  promotions: [
    {
      id: "PROM-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING-2026",
      candidateClaimId: "CND-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING",
      claimId: "CLM-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING-2026",
      decision: "promoted",
      reason:
        "The owner-filtered cursor reached Facebook's terminal flag and the replay pattern was reconciled through stable-story deduplication.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex data-quality review"]
    },
    {
      id: "PROM-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD-2026",
      candidateClaimId: "CND-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD",
      claimId: "CLM-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD-2009-2020",
      decision: "promoted",
      reason:
        "Repeated first-person records make the implementation pattern visible while archive-only projection and independent-source boundaries prevent overclaiming.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex protected-source review"]
    },
    {
      id: "PROM-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE-2026",
      candidateClaimId: "CND-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE",
      claimId: "CLM-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE-2017-2019",
      decision: "promoted",
      reason:
        "The contemporaneous authored record supports a bounded implementation-role claim without substituting personal posts for independent outcome evidence.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex protected-source review"]
    },
    {
      id: "PROM-JAMIE-FACEBOOK-COMPLETE-LIFETIME-HISTORY-2026",
      candidateClaimId: "CND-JAMIE-FACEBOOK-COMPLETE-LIFETIME-HISTORY",
      decision: "held",
      reason:
        "A terminal current interface cannot reveal deleted, hidden, removed, or otherwise omitted historical records.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "PROM-JAMIE-FACEBOOK-FREQUENCY-EQUALS-IMPACT-2026",
      candidateClaimId: "CND-JAMIE-FACEBOOK-FREQUENCY-EQUALS-IMPACT",
      decision: "held",
      reason:
        "Record frequency is useful for archive navigation but does not measure labor, significance, reach, outcomes, or causality.",
      decidedAt: "2026-07-13",
      decidedBy: ["Jamie Burkart", "Codex data-quality review"]
    }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-JAMIE-FACEBOOK-POSTS-EDITORIAL-2026",
      audience:
        "Hiring managers and product, implementation, technical-operations, civic-technology, or cultural-infrastructure collaborators",
      goal:
        "Use the personal archive to deepen role evidence and research leads without making the portfolio a personal timeline or increasing the reader's burden.",
      argument:
        "Across different domains, Jamie repeatedly translates emerging collective work into participation routes, usable instructions, recurring systems, public identity, documentation, and follow-through.",
      selectedClaimIds: [
        "CLM-JAMIE-FACEBOOK-POST-POPULATION-ACCOUNTING-2026",
        "CLM-JAMIE-FACEBOOK-PROJECT-OPERATIONS-THREAD-2009-2020",
        "CLM-JAMIE-FACEBOOK-NYCAC-IMPLEMENTATION-PRACTICE-2017-2019"
      ],
      heldCandidateClaimIds: [
        "CND-JAMIE-FACEBOOK-COMPLETE-LIFETIME-HISTORY",
        "CND-JAMIE-FACEBOOK-FREQUENCY-EQUALS-IMPACT"
      ],
      rationale: [
        "Make no immediate website change: the existing portfolio already states the relevant role and outcomes through stronger public sources.",
        "Keep the full population and close-reading findings in the knowledge bank as depth for future role-specific compositions and source discovery.",
        "Use personal posts as protected first-person role evidence, not public citations or independent proof of outcomes.",
        "Do not add a public Facebook archive, personal timeline, proofs page, knowledge-bank page, or route exposing the corpus."
      ],
      createdAt: "2026-07-13"
    }
  ]
};
