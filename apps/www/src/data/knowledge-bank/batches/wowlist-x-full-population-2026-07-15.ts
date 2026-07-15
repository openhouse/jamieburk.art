import type {
  CitationPage,
  ClaimRecord,
  IntakeItem,
  ResearchInquiry,
  ResearchTask,
  SourceAssertion,
  SourceRecord
} from "../schema.ts";

const reviewedBy = [
  "Jamie Burkart",
  "Codex authenticated social-media archival review"
];

const wowListPost = (
  id: string,
  title: string,
  publishedAt: string,
  canonicalUrl: string,
  publicCitation: string,
  supportsGenerally: string[],
  doesNotEstablish: string[] = []
): SourceRecord => ({
  id,
  title,
  author: "WOW List (@wowlist)",
  kind: "institutional-social-post",
  visibility: "public",
  preservationStatus: "live",
  publishedAt,
  accessedAt: "2026-07-15",
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation,
  publicNote:
    "A public project-account post establishes what the account published, not the individual author of every post.",
  supportsGenerally,
  doesNotEstablish
});

export const wowListXFullPopulationBatch20260715: {
  intake: IntakeItem[];
  sources: SourceRecord[];
  sourceAssertions: SourceAssertion[];
  claims: ClaimRecord[];
  researchTasks: ResearchTask[];
  researchInquiries: ResearchInquiry[];
  pages: CitationPage[];
} = {
  intake: [
    {
      id: "INT-WOWLIST-X-FULL-POPULATION-2026",
      kind: "artifact-lead",
      capturedAt: "2026-07-15",
      capturedFrom: "Authenticated replies-inclusive @wowlist timeline",
      publicSafeSummary:
        "A governed inventory of all 38 profile-reported WOW List posts, with authored posts, reposts, public support threads, posted URLs, visible engagement, and interpretive boundaries kept separate.",
      projects: ["wowlist"],
      status: "integrated",
      disposition: "claim-created",
      sourceIds: [
        "SRC-WOWLIST-X-CORPUS-2026-07-15",
        "SRC-WOWLIST-X-SUPPORT-LOCATION-2015",
        "SRC-WOWLIST-X-SUPPORT-LISTS-2015",
        "SRC-WOWLIST-X-SUPPORT-EVENT-ENTRY-2015",
        "SRC-WOWLIST-X-TUTORIAL-2015",
        "SRC-WOWLIST-X-ALLIED-MEDIA-2015",
        "SRC-WOWLIST-GRASSTRONAUT-MANUALFESTO-2015",
        "SRC-WOWLIST-GOOD-TIMES-ZINES-2-2015"
      ],
      claimIds: [
        "CLM-WOWLIST-PUBLIC-PRODUCT-SUPPORT",
        "CLM-WOWLIST-CIVIC-CARE-USE-PATTERN",
        "CLM-WOWLIST-FIELD-LEARNING-PRACTICE",
        "CLM-WOWLIST-SOCIAL-TRACTION-OBSERVATION"
      ],
      researchTaskIds: [
        "TASK-WOWLIST-X-LINK-PRESERVATION",
        "TASK-WOWLIST-GOOD-TIMES-ZINES-2-RECOVERY"
      ],
      notes: [
        "The authenticated replies-inclusive profile reported 38 posts and rendered 38 distinct canonical status IDs: 22 authored posts and 16 reposts.",
        "No private messages, account settings, follower export, account analytics, or session data were inspected or committed.",
        "Visible engagement totals are retained as a dated archive observation and held from public accomplishment messaging."
      ],
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  sources: [
    {
      id: "SRC-WOWLIST-X-CORPUS-2026-07-15",
      title: "Authenticated WOW List full profile-reported timeline corpus",
      author: "Codex authenticated browser review",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "live",
      capturedAt: "2026-07-15",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://x.com/wowlist/with_replies",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Authenticated item-level review of the replies-inclusive @wowlist timeline, July 15, 2026.",
      publicNote:
        "The profile reported 38 posts and the complete rendered timeline yielded 38 distinct canonical status IDs: 22 authored posts and 16 reposts. The repository preserves all 38 items, 35 posted short URLs with resolved destinations, and four inspected conversation contexts.",
      supportsGenerally: [
        "the full profile-reported public post population on the capture date",
        "public product-support, organizer-use, field-learning, civic-use, and mutual-aid patterns",
        "all posted short URLs and dated visible engagement labels"
      ],
      doesNotEstablish: [
        "the individual author of every project-account post",
        "deleted parent-post contents",
        "private or historically hidden engagement",
        "complete platform adoption or community outcomes",
        "causation of civic or mutual-aid outcomes"
      ]
    },
    wowListPost(
      "SRC-WOWLIST-X-SUPPORT-LOCATION-2015",
      "WOW List answers a location-scope question",
      "2015-04-24",
      "https://x.com/wowlist/status/591664757473673216",
      "WOW List publicly answered Julia Fredenburg's question about viewing events beyond her location and said a local/everywhere toggle was coming.",
      [
        "public product support",
        "location-scope behavior",
        "a publicly stated interface direction"
      ],
      [
        "that the proposed toggle shipped",
        "the identity of the person who wrote the reply",
        "a representative usability study"
      ]
    ),
    wowListPost(
      "SRC-WOWLIST-X-SUPPORT-LISTS-2015",
      "WOW List answers a list-discovery question",
      "2015-04-24",
      "https://x.com/wowlist/status/591666366215811073",
      "WOW List publicly answered Julia Fredenburg's question about finding her lists by explaining the profile-page and sidebar path.",
      ["public product support", "profile and list-discovery behavior"],
      [
        "the identity of the person who wrote the reply",
        "that every user found the navigation understandable"
      ]
    ),
    wowListPost(
      "SRC-WOWLIST-X-SUPPORT-EVENT-ENTRY-2015",
      "WOW List answers an event-entry workflow complaint",
      "2015-04-24",
      "https://x.com/wowlist/status/591668857670148096",
      "WOW List publicly answered Julia Fredenburg after she said adding an event from the home screen required too many clicks, documenting both workflow friction and the account's support response.",
      [
        "public workflow feedback",
        "event-entry support",
        "the add-to-list interaction pattern"
      ],
      [
        "that the click count was subsequently reduced",
        "the identity of the person who wrote the reply",
        "a representative usability study"
      ]
    ),
    wowListPost(
      "SRC-WOWLIST-X-TUTORIAL-2015",
      "WOW List amplifies a member-made tutorial",
      "2015-08-14",
      "https://x.com/wowlist/status/632168285291835392",
      "WOW List thanked Shelby for a public tutorial and paired the video with the product's join destination.",
      ["user-created onboarding material", "public join-flow communication"],
      ["broad adoption", "measured onboarding conversion", "Jamie's authorship of the tutorial"]
    ),
    wowListPost(
      "SRC-WOWLIST-X-ALLIED-MEDIA-2015",
      "WOW List announces planned Allied Media Conference participation",
      "2015-04-22",
      "https://x.com/wowlist/status/590942060829663232",
      "WOW List announced that the project would be at Allied Media Conference, June 18-21, 2015, in Detroit.",
      ["a public participation announcement", "Allied Media Conference timing"],
      ["confirmed attendance", "a session title", "presenter identity", "attendance totals"]
    ),
    {
      id: "SRC-WOWLIST-GRASSTRONAUT-MANUALFESTO-2015",
      title: "HOMEWORK: In Every Town - An All-Ages Music Manualfesto",
      organization: "Grasstronaut",
      author: "Elise Granata",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2015-01-29",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://grasstronaut.com/2015/01/29/homework-in-every-town/",
      archiveUrl:
        "https://web.archive.org/web/20150406041311/http://grasstronaut.com/2015/01/29/homework-in-every-town/",
      preferredPublicUrl: "archive",
      publicCitation:
        "Elise Granata, 'HOMEWORK: In Every Town - An All-Ages Music Manualfesto,' Grasstronaut, January 29, 2015, archived April 6, 2015.",
      publicNote:
        "WOW List linked this field-context article. It discusses practical infrastructure for all-ages venues, including organization, promotion, production, space, fundraising, community building, and conflict resolution.",
      supportsGenerally: [
        "the grassroots cultural-infrastructure context curated by WOW List",
        "the project's public field-learning practice"
      ],
      doesNotEstablish: [
        "Jamie's authorship of the article or manual",
        "formal collaboration with the article's subjects",
        "WOW List adoption or outcomes"
      ]
    },
    {
      id: "SRC-WOWLIST-GOOD-TIMES-ZINES-2-2015",
      title: "Zines 2.0",
      organization: "Good Times",
      author: "Elise Granata",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "dead",
      accessedAt: "2026-07-15",
      canonicalUrl:
        "https://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
      preferredPublicUrl: "canonical",
      publicCitation:
        "Elise Granata, 'Zines 2.0,' Good Times, linked by @wowlist on May 8, 2015; page not recovered in the July 15, 2026 pass.",
      publicNote:
        "The WOW List post described the article as concerning the documentation and connection of DIY communities. The article body was not recovered, so that description remains attributed to the account rather than the article.",
      supportsGenerally: ["a posted source lead for further archival recovery"],
      doesNotEstablish: [
        "the article's full argument",
        "that the article discussed WOW List",
        "any accomplishment by Jamie"
      ]
    }
  ],
  sourceAssertions: [
    {
      id: "AST-WOWLIST-X-COMPLETE-POPULATION-2026",
      sourceId: "SRC-WOWLIST-X-CORPUS-2026-07-15",
      project: "wowlist",
      assertion:
        "The profile reported 38 posts and the replies-inclusive timeline rendered 38 distinct items: 22 authored posts and 16 reposts.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: [
        "CLM-WOWLIST-PUBLIC-PRODUCT-SUPPORT",
        "CLM-WOWLIST-CIVIC-CARE-USE-PATTERN"
      ],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-WOWLIST-X-PRODUCT-SUPPORT-THREADS-2026",
      sourceId: "SRC-WOWLIST-X-CORPUS-2026-07-15",
      project: "wowlist",
      assertion:
        "Three recovered conversation parents contain public questions or friction reports about location scope, finding personal lists, and the add-event click path; each has a project-account reply.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-WOWLIST-PUBLIC-PRODUCT-SUPPORT"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    ...[
      [
        "LOCATION",
        "SRC-WOWLIST-X-SUPPORT-LOCATION-2015",
        "The project account answered a question about viewing events beyond the user's current location and publicly described a planned local/everywhere toggle."
      ],
      [
        "LISTS",
        "SRC-WOWLIST-X-SUPPORT-LISTS-2015",
        "The project account answered a question about finding personal lists through the profile and sidebar."
      ],
      [
        "EVENT-ENTRY",
        "SRC-WOWLIST-X-SUPPORT-EVENT-ENTRY-2015",
        "The project account answered a report that adding an event required too many clicks and documented the add-to-list workflow."
      ]
    ].map(([suffix, sourceId, assertion]) => ({
      id: `AST-WOWLIST-X-SUPPORT-${suffix}`,
      sourceId,
      project: "wowlist",
      assertion,
      relationship: "supports" as const,
      confidence: "high" as const,
      candidateClaimIds: ["CLM-WOWLIST-PUBLIC-PRODUCT-SUPPORT"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    })),
    {
      id: "AST-WOWLIST-X-CIVIC-CARE-PATTERN-2026",
      sourceId: "SRC-WOWLIST-X-CORPUS-2026-07-15",
      project: "wowlist",
      assertion:
        "Nine corpus items linked or amplified demonstrations, vigils, fundraisers, and mutual-aid resources, including Black Lives Matter, post-election mobilization, Standing Rock, Akai Gurley family support, and Ghost Ship relief and mourning.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-WOWLIST-CIVIC-CARE-USE-PATTERN"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-WOWLIST-X-FIELD-LEARNING-2026",
      sourceId: "SRC-WOWLIST-X-CORPUS-2026-07-15",
      project: "wowlist",
      assertion:
        "The corpus links a member-made tutorial, a grassroots venue manual review, Allied Media Conference, peer DIY funding infrastructure, and an unrecovered article the account described as concerning DIY documentation.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-WOWLIST-FIELD-LEARNING-PRACTICE"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-WOWLIST-X-TRACTION-2026",
      sourceId: "SRC-WOWLIST-X-CORPUS-2026-07-15",
      project: "wowlist",
      assertion:
        "Twelve of twenty-two authored posts displayed at least one visible interaction on July 15, 2026; totals were two replies, twenty reposts, and twenty-one likes.",
      relationship: "supports",
      confidence: "high",
      candidateClaimIds: ["CLM-WOWLIST-SOCIAL-TRACTION-OBSERVATION"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-WOWLIST-X-POSTED-URLS-2026",
      sourceId: "SRC-WOWLIST-X-CORPUS-2026-07-15",
      project: "wowlist",
      assertion:
        "The 38-item population contains 35 posted short URLs; the 22 authored posts account for 23 occurrences, including twelve WOW List destinations, two NYCdiy destinations, and nine external destinations.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: [
        "CLM-WOWLIST-CIVIC-CARE-USE-PATTERN",
        "CLM-WOWLIST-FIELD-LEARNING-PRACTICE"
      ],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-WOWLIST-X-MEMBER-TUTORIAL-2015",
      sourceId: "SRC-WOWLIST-X-TUTORIAL-2015",
      project: "wowlist",
      assertion:
        "The project account thanked Shelby for a public WOW List tutorial and paired it with the product's join destination.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-WOWLIST-FIELD-LEARNING-PRACTICE"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-WOWLIST-X-ALLIED-MEDIA-2015",
      sourceId: "SRC-WOWLIST-X-ALLIED-MEDIA-2015",
      project: "wowlist",
      assertion:
        "The project account announced that WOW List would be at Allied Media Conference in Detroit, June 18-21, 2015, without naming a session or presenter.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-WOWLIST-FIELD-LEARNING-PRACTICE"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-WOWLIST-GRASSTRONAUT-FIELD-CONTEXT-2015",
      sourceId: "SRC-WOWLIST-GRASSTRONAUT-MANUALFESTO-2015",
      project: "wowlist",
      assertion:
        "The linked Grasstronaut article treats grassroots venue work as practical infrastructure spanning organization, promotion, production, space, fundraising, community building, and conflict resolution.",
      relationship: "contextualizes",
      confidence: "high",
      candidateClaimIds: ["CLM-WOWLIST-FIELD-LEARNING-PRACTICE"],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "AST-WOWLIST-GOOD-TIMES-RECOVERY-BOUNDARY-2015",
      sourceId: "SRC-WOWLIST-GOOD-TIMES-ZINES-2-2015",
      project: "wowlist",
      assertion:
        "The posted URL, title, and author form a source lead, but the unrecovered article body cannot independently support the project account's description of its subject.",
      relationship: "bounds",
      confidence: "high",
      candidateClaimIds: [],
      publicSafe: true,
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  claims: [
    {
      id: "CLM-WOWLIST-PUBLIC-PRODUCT-SUPPORT",
      project: "wowlist",
      internalClaim:
        "Public conversation threads document the WOW List team answering concrete product questions about location scope, list discovery, and event-entry workflow friction.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "Public support threads preserve real product questions about location scope, finding personal lists, and excessive clicks in the add-event workflow, along with the project account's responses.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/wowlist"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-X-SUPPORT-LOCATION-2015",
          relationship: "direct-support",
          supports: ["location-scope question", "project-account response"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-WOWLIST-X-SUPPORT-LISTS-2015",
          relationship: "direct-support",
          supports: ["list-discovery question", "project-account response"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-WOWLIST-X-SUPPORT-EVENT-ENTRY-2015",
          relationship: "direct-support",
          supports: ["click-friction report", "event-entry support response"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "The threads document public questions and support responses, not a representative usability study.",
        "The event-entry reply documents the reported friction and existing workflow, not a verified product change.",
        "Credit belongs to the WOW List team; the account does not identify the person who wrote each reply."
      ],
      antiClaims: [
        "Jamie personally wrote every support reply",
        "WOW List completed a representative usability study",
        "Every proposed or implied product change shipped"
      ],
      researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-WOWLIST-CIVIC-CARE-USE-PATTERN",
      project: "wowlist",
      internalClaim:
        "The complete account population documents WOW List infrastructure being used or curated for civic mobilization, mourning, fundraising, and mutual-aid circulation as well as cultural events.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "case-study",
          text:
            "The project account's public trace combines direct calendar links with curation of demonstrations, vigils, fundraisers, and mutual-aid resources.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/wowlist"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-X-CORPUS-2026-07-15",
          relationship: "direct-support",
          supports: [
            "complete account population",
            "nine-item civic and mutual-aid pattern",
            "linked demonstrations, vigils, fundraisers, and relief resources"
          ],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Some pattern items are reposts and are attributed to their original authors.",
        "The corpus establishes public communication and curation, not attendance, funds raised, policy outcomes, or Jamie's authorship of each post."
      ],
      antiClaims: [
        "WOW List caused the documented civic or relief outcomes",
        "Jamie authored every account post or external resource",
        "Every platform community used WOW List for civic organizing"
      ],
      researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-WOWLIST-FIELD-LEARNING-PRACTICE",
      project: "wowlist",
      internalClaim:
        "The account connected product operation to peer learning through a member-made tutorial, grassroots venue guidance, Allied Media Conference, peer funding infrastructure, and an unrecovered article the account described as concerning DIY documentation.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "eligible",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "The project account paired product support with field learning: a member-made tutorial, grassroots venue guidance, Allied Media Conference, peer funding infrastructure, and a posted but unrecovered DIY-documentation article lead.",
          status: "active",
          citationRequired: true,
          surfaces: ["docs/knowledge-bank/projects/wowlist"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-X-CORPUS-2026-07-15",
          relationship: "direct-support",
          supports: ["complete posted-link and mission-pattern inventory"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-WOWLIST-X-TUTORIAL-2015",
          relationship: "direct-support",
          supports: ["member-made onboarding tutorial"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-WOWLIST-X-ALLIED-MEDIA-2015",
          relationship: "direct-support",
          supports: ["public conference participation announcement"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-WOWLIST-GRASSTRONAUT-MANUALFESTO-2015",
          relationship: "context",
          supports: ["grassroots venue-infrastructure field context"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Linked peer sources remain the work of their authors and organizations.",
        "The conference post does not recover a session title, presenter identity, or attendance total.",
        "The Good Times article remains a source lead because its page body was not recovered."
      ],
      antiClaims: [
        "Jamie authored the linked tutorial, articles, manual, or peer fund",
        "Every field relationship was a formal partnership"
      ],
      researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    },
    {
      id: "CLM-WOWLIST-SOCIAL-TRACTION-OBSERVATION",
      project: "wowlist",
      internalClaim:
        "On July 15, 2026, twelve of twenty-two authored posts displayed at least one visible interaction; totals were two replies, twenty reposts, and twenty-one likes.",
      status: "confirmed-with-boundary",
      maturity: "confirmed-with-boundary",
      projectionEligibility: "hold",
      collectiveWork: true,
      projections: [
        {
          key: "archive-note",
          text:
            "A dated observation found visible interaction on 12 of 22 authored posts; the totals remain archival because platform metrics are unstable and incomplete.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-X-CORPUS-2026-07-15",
          relationship: "direct-support",
          supports: [
            "authored-post denominator",
            "dated visible engagement labels",
            "aggregate replies, reposts, and likes"
          ],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "The metrics are a July 15, 2026 observation, not complete historical engagement.",
        "Engagement attached to sixteen reposted original posts is excluded.",
        "The result does not identify stakeholder types or measure product, community, or policy outcomes."
      ],
      antiClaims: [
        "These are complete lifetime engagement totals",
        "Every interaction came from an organizer or participant",
        "Visible engagement proves adoption or impact"
      ],
      researchInquiryIds: ["INQ-WOWLIST-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy
    }
  ],
  researchTasks: [
    {
      id: "TASK-WOWLIST-X-LINK-PRESERVATION",
      project: "wowlist",
      question:
        "Which of the 35 posted destinations require archived replacements, deeper close reading, or an explicit not-recovered note?",
      priority: "medium",
      status: "queued",
      methodsPlanned: [
        "Run bounded Wayback availability checks for all internal and external resolved destinations",
        "Close-read mission-relevant public sources before promoting their contents into claims",
        "Keep posted-source context separate from evidence of Jamie's work"
      ],
      successCriteria: [
        "Classify all 35 destinations as live, archived, redirected, dead, or not recovered",
        "Attach authoritative archived URLs where available",
        "Do not transform peer projects or reporting into Jamie accomplishments"
      ],
      sourceIds: ["SRC-WOWLIST-X-CORPUS-2026-07-15"],
      claimIds: ["CLM-WOWLIST-FIELD-LEARNING-PRACTICE"],
      publicSummary:
        "Continue preserving and close-reading the account's complete posted-link ecosystem.",
      reviewedAt: "2026-07-15"
    },
    {
      id: "TASK-WOWLIST-GOOD-TIMES-ZINES-2-RECOVERY",
      project: "wowlist",
      question:
        "Can the Good Times article 'Zines 2.0' be recovered and does its body discuss WOW List or the wider DIY documentation ecosystem?",
      priority: "low",
      status: "queued",
      methodsPlanned: [
        "Search alternate Good Times slugs, print pages, feeds, author archives, and bounded Wayback captures",
        "Search Elise Granata's public archive for a syndicated or draft version",
        "Record not recovered separately from did not exist"
      ],
      successCriteria: [
        "Recover and close-read the article or preserve a bounded not-recovered result",
        "Attribute any description to the article only after recovering its text"
      ],
      sourceIds: ["SRC-WOWLIST-GOOD-TIMES-ZINES-2-2015"],
      claimIds: [],
      publicSummary:
        "Recover the article body before using it as independent evidence about DIY documentation or WOW List.",
      reviewedAt: "2026-07-15"
    }
  ],
  researchInquiries: [
    {
      id: "INQ-WOWLIST-X-FULL-POPULATION-2026",
      project: "wowlist",
      question:
        "What does the full profile-reported @wowlist post population establish about product operation, organizer use, posted sources, stakeholder engagement, mission patterns, and visible traction?",
      methods: [
        "Verified the signed-in @urbanhermit browser identity and opened the replies-inclusive @wowlist profile.",
        "Scrolled the full rendered timeline in overlapping increments, deduplicated canonical status IDs, and continued through repeated bottom passes with no new items.",
        "Recovered all 38 profile-reported items and classified 22 authored posts separately from 16 reposts.",
        "Resolved all 35 posted t.co destinations, preserving historical HTTP short links through HTTPS resolution when needed.",
        "Opened each public support conversation, recovered three parent questions and one deleted-parent boundary, and kept parent posts outside the account denominator.",
        "Separated authored-post engagement from original-post engagement on reposts, close-read the archived Grasstronaut article, and retained unrecovered source bodies as research leads.",
        "Encoded item-level evidence, source assertions, bounded claims, anti-claims, research tasks, and selective public projection."
      ],
      runAt: "2026-07-15",
      resultStatus: "recovered",
      findings: [
        "The profile-reported and rendered populations reconcile exactly at 38 items: 22 authored posts and 16 reposts spanning February 12, 2014-January 12, 2017.",
        "Nineteen authored posts contain 23 outgoing-link occurrences: twelve WOW List destinations, two NYCdiy destinations, and nine external destinations; the full population contains 35 short URLs.",
        "Three public support threads preserve user questions about location scope, finding personal lists, and excessive clicks in the add-event workflow, together with project-account responses.",
        "Organizer and collaborator posts include Punks & Criminals reporting that shows were being added, Richard tagging @wowlist with a San Francisco event, and COTFG linking a WOW List event page.",
        "Nine items document a civic and care pattern spanning demonstrations, vigils, fundraisers, and mutual-aid circulation.",
        "The source ecosystem includes a member-made tutorial, a grassroots venue manual review, Allied Media Conference, peer DIY funding infrastructure, and an unrecovered article the account described as concerning DIY documentation.",
        "Twelve authored posts retained visible interaction on July 15, 2026; the dated totals are held from public accomplishment messaging."
      ],
      limitations: [
        "One inspected NYCdiy parent post was deleted, so its initiating text and author cannot be recovered from the live conversation.",
        "Visible metrics may omit deleted, hidden, private, or platform-suppressed interactions and do not identify all stakeholder groups.",
        "The account corpus cannot identify the person who authored every post or reply.",
        "Reposts document project curation, not endorsement by or direct engagement from the original author.",
        "The Good Times 'Zines 2.0' article body was not recovered; only its posted URL, title, author mention, and the account's description are preserved.",
        "A complete account population is not a complete project history, adoption ledger, or impact study."
      ],
      sourceIds: [
        "SRC-WOWLIST-X-CORPUS-2026-07-15",
        "SRC-WOWLIST-ORIGIN-2014",
        "SRC-WOWLIST-NYCDIY-LINEAGE-2016",
        "SRC-WOWLIST-ORGANIZER-USE-2015",
        "SRC-WOWLIST-X-SUPPORT-LOCATION-2015",
        "SRC-WOWLIST-X-SUPPORT-LISTS-2015",
        "SRC-WOWLIST-X-SUPPORT-EVENT-ENTRY-2015",
        "SRC-WOWLIST-X-TUTORIAL-2015",
        "SRC-WOWLIST-X-ALLIED-MEDIA-2015",
        "SRC-WOWLIST-GRASSTRONAUT-MANUALFESTO-2015",
        "SRC-WOWLIST-GOOD-TIMES-ZINES-2-2015"
      ],
      publicSummary:
        "A full authenticated archival-production pass accounts for all 38 profile-reported @wowlist posts, preserves every posted URL, recovers three public product-support threads, and derives bounded product, organizer, civic-care, field-learning, and traction findings."
    }
  ],
  pages: []
};
