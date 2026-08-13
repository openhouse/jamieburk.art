const reviewedAt = "2026-08-12";
const reviewedBy = ["Jamie Burkart", "Codex governed source review"];

export const commercialRentAdvocacyAugust2026 = {
  intakeItems: [
    {
      id: "INTAKE-CRS-ADVOCACY-2026-07-13-08-12",
      kind: "analysis-note",
      title: "Commercial Rent Stabilization advocacy source return, July 13-August 12, 2026",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex governed source review",
      projectIds: ["commercial-rent-stabilization"],
      reason: "Reconcile the final report, delivered public remarks, organizer correspondence, elected-office staff coordination, press leads, and the internal member wiki without converting access into publication permission.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: [
        "SRC-CRS-ACTION-LAB-EVENTS-2026-07-29",
        "SRC-CRS-EMPTY-STOREFRONTS-FINAL-REPORT-2026",
        "SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11",
        "SRC-CRS-SBU-PRESS-CONFERENCE-RECORDING-2026-07-29",
        "SRC-CRS-PRESS-COVERAGE-SEARCH-2026-08-12",
        "SRC-CRS-ACTION-LAB-INSTAGRAM-2026-08-11"
      ],
      observationIds: [
        "OBS-CRS-FINAL-REPORT-ACKNOWLEDGMENT-2026",
        "OBS-CRS-REPORT-REVIEW-BOUNDARY-2026",
        "OBS-CRS-JAMIE-DELIVERED-REMARKS-2026-07-29",
        "OBS-CRS-CITY-COUNCIL-STAFF-HANDOFF-2026-07-28",
        "OBS-CRS-STATE-STAFF-CADENCE-2026-08-05",
        "OBS-CRS-NBC-FOOTAGE-REQUEST-2026-07-29",
        "OBS-CRS-PRESS-COVERAGE-NOT-RECOVERED-2026-08-12",
        "OBS-CRS-SOCIAL-COLLABORATION-INVITATION-2026-08-11",
        "OBS-CRS-ACTION-LAB-SOCIAL-POST-2026-08-11"
      ],
      researchInquiryIds: [
        "INQ-CRS-REPORT-VERSION-CHAIN-2026",
        "INQ-CRS-DELIVERED-SPEECH-AUDIO-REVIEW-2026",
        "INQ-CRS-PRESS-COVERAGE-2026",
        "INQ-CRS-STATE-STAFF-CADENCE-2026"
      ],
      boundaries: [
        "The repository retains public-safe metadata and bounded observations, not private emails, full transcript text, private calendars, contact data, unpublished strategy, or the final PDF binary.",
        "A planned run of show does not prove attendance; a staff exchange does not prove an elected official's endorsement; a request for footage does not prove publication; a scheduled meeting does not prove it occurred.",
        "Every website projection in this source return remains held pending Jamie approval, source rights review, and any named collaborator review that the final wording requires."
      ]
    }
  ],

  observations: [
    {
      id: "OBS-CRS-FINAL-REPORT-ACKNOWLEDGMENT-2026",
      intakeId: "INTAKE-CRS-ADVOCACY-2026-07-13-08-12",
      sourceId: "SRC-CRS-EMPTY-STOREFRONTS-FINAL-REPORT-2026",
      project: "commercial-rent-stabilization",
      kind: "source-fact",
      text: "The final report thanks Jamie Burkart, identifies him as an NYC Artist Coalition member participating in Fair Rent NYC, and describes his contribution as a thoughtful and careful review of the draft report.",
      locator: "Final report, acknowledgments page.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-CRS-JAMIE-REPORT-REVIEW-2026"],
      researchInquiryIds: ["INQ-CRS-REPORT-VERSION-CHAIN-2026"],
      limitations: [
        "The acknowledgment does not assign authorship, data analysis, research design, organizational endorsement, or responsibility for every final claim to Jamie."
      ]
    },
    {
      id: "OBS-CRS-REPORT-REVIEW-BOUNDARY-2026",
      intakeId: "INTAKE-CRS-ADVOCACY-2026-07-13-08-12",
      sourceId: "SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11",
      comparisonSourceIds: ["SRC-CRS-EMPTY-STOREFRONTS-FINAL-REPORT-2026"],
      project: "commercial-rent-stabilization",
      kind: "bounded-inference",
      text: "Jamie's dated prepublication review concentrated on factual accuracy, source and method clarity, current legislative language, accessibility, attribution, release hygiene, and the boundary between district-level association and unproved landlord motive or causation; the organizer later wrote that many of his edits had been incorporated.",
      locator: "Organizer correspondence and final report methodology section.",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-CRS-JAMIE-REPORT-REVIEW-2026"],
      researchInquiryIds: ["INQ-CRS-REPORT-VERSION-CHAIN-2026"],
      limitations: [
        "Without a preserved draft-to-final version chain, the record cannot assign each final sentence or methodological qualification to a particular reviewer.",
        "The final report's descriptive limits do not erase broader causal rhetoric elsewhere in the report or convert Jamie's review into validation of the whole publication."
      ]
    },
    {
      id: "OBS-CRS-JAMIE-DELIVERED-REMARKS-2026-07-29",
      intakeId: "INTAKE-CRS-ADVOCACY-2026-07-13-08-12",
      sourceId: "SRC-CRS-SBU-PRESS-CONFERENCE-RECORDING-2026-07-29",
      comparisonSourceIds: ["SRC-CRS-ACTION-LAB-EVENTS-2026-07-29"],
      project: "commercial-rent-stabilization",
      kind: "source-fact",
      text: "A protected event recording and machine transcript document Jamie speaking publicly at the July 29 report release about cultural-space continuity, open data, Commercial Rent Stabilization, the state bill, a city legislative lane, and displacement as a policy choice.",
      locator: "Protected recording, approximately 41:00-45:52.",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-CRS-JAMIE-PUBLIC-ADVOCACY-2026-07-29"],
      researchInquiryIds: ["INQ-CRS-DELIVERED-SPEECH-AUDIO-REVIEW-2026"],
      limitations: [
        "The machine transcript contains recognition errors and must not be treated as a quote-certified transcript.",
        "The delivered remarks differ materially from the prepared two-minute statement and must remain a distinct source object.",
        "A public event does not by itself clear recording, photography, or informal participant remarks for republication."
      ]
    },
    {
      id: "OBS-CRS-CITY-COUNCIL-STAFF-HANDOFF-2026-07-28",
      intakeId: "INTAKE-CRS-ADVOCACY-2026-07-13-08-12",
      sourceId: "SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11",
      project: "commercial-rent-stabilization",
      kind: "source-fact",
      text: "After a phone conversation with a community liaison in Council Member Christopher Marte's office, Jamie sent corrected event details, connected the staff contact with the event organizers, and received confirmation that the information was being relayed to the office team.",
      locator: "July 28 email thread following the phone call.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-CRS-JAMIE-OFFICIAL-STAFF-COORDINATION-2026"],
      researchInquiryIds: [],
      limitations: [
        "This supports a staff logistics handoff, not the Council Member's attendance, endorsement, bill position, or direct conversation with Jamie."
      ]
    },
    {
      id: "OBS-CRS-STATE-STAFF-CADENCE-2026-08-05",
      intakeId: "INTAKE-CRS-ADVOCACY-2026-07-13-08-12",
      sourceId: "SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11",
      project: "commercial-rent-stabilization",
      kind: "source-fact",
      text: "An August 5 call with Assembly Member Emily Gallagher's deputy chief of staff led to a proposed monthly three-person Commercial Rent Stabilization meeting; Jamie then shared a legislative provenance redline, and an August 26 meeting was scheduled and accepted.",
      locator: "August 5-9 email thread and accepted calendar event.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-CRS-JAMIE-OFFICIAL-STAFF-COORDINATION-2026"],
      researchInquiryIds: ["INQ-CRS-STATE-STAFF-CADENCE-2026"],
      limitations: [
        "The future meeting is scheduled, not completed.",
        "Sharing a provenance redline does not establish authorship of bill language, legal advice, adoption of recommendations, or an elected official's endorsement."
      ]
    },
    {
      id: "OBS-CRS-NBC-FOOTAGE-REQUEST-2026-07-29",
      intakeId: "INTAKE-CRS-ADVOCACY-2026-07-13-08-12",
      sourceId: "SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11",
      project: "commercial-rent-stabilization",
      kind: "source-fact",
      text: "An organizer relayed that NBC was requesting event footage on July 29.",
      locator: "July 29 organizer email.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-CRS-NBC-FOOTAGE-REQUEST-2026"],
      researchInquiryIds: ["INQ-CRS-PRESS-COVERAGE-2026"],
      limitations: [
        "The request does not establish that footage was supplied, used, broadcast, published, or attributed to Jamie."
      ]
    },
    {
      id: "OBS-CRS-PRESS-COVERAGE-NOT-RECOVERED-2026-08-12",
      intakeId: "INTAKE-CRS-ADVOCACY-2026-07-13-08-12",
      sourceId: "SRC-CRS-PRESS-COVERAGE-SEARCH-2026-08-12",
      comparisonSourceIds: ["SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11"],
      project: "commercial-rent-stabilization",
      kind: "limitation",
      text: "The bounded email and public-web search recovered a request for footage but no article, segment, quotation, interview, or other published press coverage naming Jamie in connection with the July 29 event.",
      locator: "Bounded search run completed August 12.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-CRS-PUBLISHED-PRESS-COVERAGE-NOT-RECOVERED-2026"],
      researchInquiryIds: ["INQ-CRS-PRESS-COVERAGE-2026"],
      limitations: [
        "Negative search is not proof that no coverage exists or will be published later."
      ]
    },
    {
      id: "OBS-CRS-SOCIAL-COLLABORATION-INVITATION-2026-08-11",
      intakeId: "INTAKE-CRS-ADVOCACY-2026-07-13-08-12",
      sourceId: "SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11",
      project: "commercial-rent-stabilization",
      kind: "source-fact",
      text: "Action Lab invited NYC Artist Coalition to collaborate on a planned social post, and Jamie accepted the invitation from the coalition account.",
      locator: "August 10-11 email thread.",
      status: "verified",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: ["INQ-CRS-PRESS-COVERAGE-2026"],
      limitations: [
        "Invitation and acceptance do not prove publication, completed platform credit, image rights, or Jamie's authorship."
      ]
    },
    {
      id: "OBS-CRS-ACTION-LAB-SOCIAL-POST-2026-08-11",
      intakeId: "INTAKE-CRS-ADVOCACY-2026-07-13-08-12",
      sourceId: "SRC-CRS-ACTION-LAB-INSTAGRAM-2026-08-11",
      comparisonSourceIds: ["SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11"],
      project: "commercial-rent-stabilization",
      kind: "source-fact",
      text: "An authenticated review verified that Action Lab published the Commercial Rent Stabilization campaign carousel and that its visible collaborator list named Action Lab, Assembly Member Emily Gallagher, YANT Art Space, Main Street Alliance Action Fund, and State Senator Julia Salazar; NYC Artist Coalition was not listed at capture time.",
      locator: "Public Action Lab post and visible collaborator dialog, reviewed August 12.",
      status: "verified",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: ["INQ-CRS-PRESS-COVERAGE-2026"],
      limitations: [
        "The observed collaborator state can change and does not establish why the coalition was absent.",
        "The post does not name Jamie, establish his speaking role, assign authorship, or prove its causal policy language.",
        "A public post does not clear its images for repository reuse."
      ]
    }
  ],

  sources: [
    {
      id: "SRC-CRS-ACTION-LAB-EVENTS-2026-07-29",
      title: "Action Lab events listing for the Small Business United report release",
      organization: "The Action Lab",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-07-29",
      accessedAt: reviewedAt,
      canonicalUrl: "https://actionlabny.org/events",
      preferredPublicUrl: "canonical",
      publicCitation: "The Action Lab events listing for the July 29, 2026 release of Empty Storefronts, High Rents.",
      publicNote: "The listing establishes the event and report-release purpose. Its street address conflicts with corrected organizer correspondence and is not used as the canonical location.",
      supportsGenerally: [
        "July 29, 2026 public event",
        "Small Business United report release",
        "public call for passage of the Small Business Rent Stabilization Act"
      ],
      doesNotEstablish: [
        "the final speaker roster",
        "Jamie Burkart's speaking role",
        "attendance by a listed official",
        "the corrected event address",
        "published press coverage"
      ]
    },
    {
      id: "SRC-CRS-EMPTY-STOREFRONTS-FINAL-REPORT-2026",
      title: "Empty Storefronts, High Rents: Why New York City Needs Commercial Rent Stabilization",
      organization: "Small Business United, The Action Lab, Main Street Alliance, and Small Business Majority",
      author: "Mahin Rahman Tawrat",
      kind: "project-archive",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publishedAt: "2026-07-28",
      accessedAt: reviewedAt,
      publicCitation: "Empty Storefronts, High Rents: Why New York City Needs Commercial Rent Stabilization, final report, July 2026.",
      publicNote: "A final PDF was received as an attachment and visually inspected. No stable public PDF route was recovered in this review, so the binary and private locator remain outside the repository.",
      protectedLocatorId: "ARCHIVE-CRS-EMPTY-STOREFRONTS-FINAL-REPORT-2026",
      supportsGenerally: [
        "final report title and publication date",
        "named report authorship and publisher credit",
        "Jamie's acknowledgment for thoughtful and careful draft review",
        "district-level descriptive findings",
        "methodological and causal limitations"
      ],
      doesNotEstablish: [
        "Jamie's authorship of the report",
        "Jamie's validation of every claim",
        "a preserved draft-to-final attribution chain",
        "landlord motive",
        "individual closure causation"
      ],
      media: {
        mediaKind: "document",
        rightsStatus: "permission-needed",
        consentStatus: "not-applicable",
        publicDisplayStatus: "metadata-only"
      }
    },
    {
      id: "SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11",
      title: "Commercial Rent Stabilization advocacy correspondence, July 21-August 11, 2026",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: reviewedAt,
      publicCitation: "Protected advocacy correspondence reviewed for bounded event, report, press, and official-staff coordination facts.",
      publicNote: "Only public-safe observations are retained; message bodies, contact information, private strategy, and authenticated source locators remain outside the repository.",
      protectedLocatorId: "ARCHIVE-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11",
      supportsGenerally: [
        "invitation and speaker preparation sequence",
        "prepublication review and acknowledgment wording",
        "corrected event logistics",
        "City Council staff handoff",
        "state legislative staff call and scheduled cadence",
        "NBC footage request",
        "planned social collaboration"
      ],
      doesNotEstablish: [
        "elected-official endorsement",
        "final official attendance",
        "bill-language authorship",
        "legal advice",
        "broadcast or publication",
        "a live social post"
      ]
    },
    {
      id: "SRC-CRS-SBU-PRESS-CONFERENCE-RECORDING-2026-07-29",
      title: "Small Business United report-release recording and machine transcript",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-29",
      accessedAt: reviewedAt,
      publicCitation: "Protected event recording and machine transcript for the July 29, 2026 Small Business United report release.",
      publicNote: "The source establishes that Jamie delivered public remarks; quotation remains on hold pending audio review and rights clearance.",
      protectedLocatorId: "ARCHIVE-CRS-SBU-PRESS-CONFERENCE-RECORDING-2026-07-29",
      supportsGenerally: [
        "Jamie delivered public remarks",
        "cultural-space continuity framing",
        "open-data and descriptive-association framing",
        "state and city legislative calls to action"
      ],
      doesNotEstablish: [
        "quote-certified wording",
        "press interview participation",
        "published media coverage",
        "rights to republish audio or images",
        "agreement by every participant"
      ],
      media: {
        mediaKind: "other",
        rightsStatus: "permission-needed",
        consentStatus: "review-needed",
        publicDisplayStatus: "hold",
        timestampConfidence: "moderate"
      }
    },
    {
      id: "SRC-CRS-PRESS-COVERAGE-SEARCH-2026-08-12",
      title: "July 29 Commercial Rent Stabilization press-coverage search",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: reviewedAt,
      publicCitation: "Bounded August 12, 2026 search for published coverage of the July 29 report release.",
      publicNote: "The run recovered a public event listing and a private footage request, but no published coverage naming Jamie.",
      protectedLocatorId: "RESEARCH-CRS-PRESS-COVERAGE-2026-08-12",
      supportsGenerally: [
        "bounded negative search result",
        "public event listing recovery",
        "absence of recovered Jamie-attributed coverage in the searched corpus"
      ],
      doesNotEstablish: [
        "that no coverage exists",
        "that no future coverage will appear",
        "that footage was not supplied privately"
      ]
    },
    {
      id: "SRC-CRS-ACTION-LAB-INSTAGRAM-2026-08-11",
      title: "Action Lab Commercial Rent Stabilization campaign carousel",
      organization: "The Action Lab",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-08-11",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.instagram.com/actionlabny/p/Db59xHUDq5v/",
      preferredPublicUrl: "canonical",
      publicCitation: "The Action Lab, Commercial Rent Stabilization campaign carousel, August 11, 2026.",
      publicNote: "The post and visible collaborator list were reviewed in an authenticated public-post view; no image is copied into this repository.",
      supportsGenerally: [
        "campaign carousel publication",
        "visible collaborator state at the August 12 capture"
      ],
      doesNotEstablish: [
        "NYC Artist Coalition as a completed collaborator at capture time",
        "Jamie as author, speaker, or subject of the post",
        "permission to reuse carousel images",
        "causal proof for the post's policy language"
      ],
      media: {
        mediaKind: "graphic",
        rightsStatus: "permission-needed",
        consentStatus: "review-needed",
        publicDisplayStatus: "metadata-only"
      }
    }
  ],

  entities: [
    {
      id: "ENT-CRS-SBU-REPORT-LAUNCH-2026-07-29",
      name: "Small Business United Empty Storefronts, High Rents report launch",
      kind: "event",
      aliases: ["July 29 Commercial Rent Stabilization press conference"],
      publicSafe: true
    },
    {
      id: "ENT-CRS-EMPTY-STOREFRONTS-REPORT-2026",
      name: "Empty Storefronts, High Rents report",
      kind: "project",
      aliases: [],
      publicSafe: true
    }
  ],

  agencyRelations: [
    {
      id: "REL-JAMIE-CRS-SBU-REPORT-LAUNCH-SPEECH-2026",
      project: "commercial-rent-stabilization",
      actorIds: ["ENT-JAMIE-BURKART"],
      action: "spoke-at",
      objectId: "ENT-CRS-SBU-REPORT-LAUNCH-2026-07-29",
      purpose: "Connect cultural-space continuity and neighborhood value to the case for transparent, predictable commercial-rent rules.",
      result: "Jamie delivered public advocacy remarks at the report launch and called for state action and a city legislative lane.",
      creditScope: "individual",
      status: "confirmed-with-boundary",
      claimIds: ["CLM-CRS-JAMIE-PUBLIC-ADVOCACY-2026-07-29"],
      sourceIds: [
        "SRC-CRS-SBU-PRESS-CONFERENCE-RECORDING-2026-07-29",
        "SRC-CRS-ACTION-LAB-EVENTS-2026-07-29"
      ],
      sourceSupportKeys: [
        "Jamie delivered public remarks",
        "July 29, 2026 public event"
      ],
      boundaries: [
        "Speaking at the event is not authorship of the report, sole campaign leadership, institutional endorsement, legislative enactment, or proof of published press coverage.",
        "Exact quotation remains held until the machine transcript is checked against the audio."
      ],
      reviewedAt,
      reviewedBy
    }
  ],

  claims: [
    {
      id: "CLM-CRS-JAMIE-REPORT-REVIEW-2026",
      project: "commercial-rent-stabilization",
      internalClaim: "Jamie performed a careful prepublication review of Empty Storefronts, High Rents focused on factual accuracy, source and method clarity, causal scope, current legislative language, accessibility, attribution, and release hygiene; the final report explicitly acknowledges his thoughtful and careful review.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "Jamie contributed a careful prepublication review of a 2026 commercial-rent research report, checking factual accuracy, source and method clarity, causal scope, legislative language, accessibility, attribution, and release readiness; the final report acknowledges his review.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        },
        {
          key: "resume-html",
          text: "Acknowledged reviewer of a 2026 commercial-rent research report, with review spanning evidence, claims, legislation, accessibility, attribution, and release quality.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-CRS-EMPTY-STOREFRONTS-FINAL-REPORT-2026",
          relationship: "direct-support",
          supports: ["final acknowledgment of Jamie's thoughtful and careful review"],
          locator: "Acknowledgments page.",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11",
          relationship: "private-support",
          supports: ["review scope", "organizer statement that many edits were incorporated"],
          locator: "July 25-27 review thread.",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Use reviewer or contributor, not author, researcher, data analyst, methods validator, legal reviewer, or organizational endorser.",
        "Do not quantify accepted edits or assign particular final language without a preserved version chain.",
        "Do not imply Jamie validated the report's broader rhetoric, every claim, or the underlying dataset."
      ],
      antiClaims: [
        "Jamie authored Empty Storefronts, High Rents",
        "Jamie validated the report's methodology",
        "Jamie's review proves landlord motive or causation",
        "NYC Artist Coalition endorsed every report claim"
      ],
      researchInquiryIds: ["INQ-CRS-REPORT-VERSION-CHAIN-2026"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-CRS-JAMIE-PUBLIC-ADVOCACY-2026-07-29",
      project: "commercial-rent-stabilization",
      internalClaim: "Jamie delivered public Commercial Rent Stabilization advocacy remarks at the July 29, 2026 Small Business United report release, connecting cultural-space continuity, open data, state legislation, a city legislative lane, and displacement policy.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "At a July 2026 report launch, Jamie spoke publicly for Commercial Rent Stabilization, translating cultural-space experience and open-data evidence into clear state and city calls to action.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        },
        {
          key: "resume-html",
          text: "Delivered public advocacy remarks connecting cultural-space continuity, open-data evidence, and city and state Commercial Rent Stabilization strategy.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-CRS-SBU-PRESS-CONFERENCE-RECORDING-2026-07-29",
          relationship: "private-support",
          supports: ["delivered public remarks", "speech themes", "calls to action"],
          locator: "Approximately 41:00-45:52.",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-CRS-ACTION-LAB-EVENTS-2026-07-29",
          relationship: "context",
          supports: ["event date", "report-release purpose", "legislative call to action"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "The public event page does not name Jamie; the protected recording supplies the speaking-role evidence.",
        "The prepared statement and delivered remarks are distinct source objects.",
        "Do not publish exact quotations until the audio has been reviewed and rights are cleared.",
        "Advocacy is not bill authorship, elected-official endorsement, or legislative causation."
      ],
      antiClaims: [
        "Jamie authored the Commercial Rent Stabilization bill",
        "Jamie spoke on behalf of every coalition member",
        "elected officials endorsed Jamie",
        "Jamie's speech caused legislative action",
        "Jamie was covered by NBC"
      ],
      researchInquiryIds: ["INQ-CRS-DELIVERED-SPEECH-AUDIO-REVIEW-2026", "INQ-CRS-PRESS-COVERAGE-2026"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-CRS-JAMIE-OFFICIAL-STAFF-COORDINATION-2026",
      project: "commercial-rent-stabilization",
      internalClaim: "In the reviewed period, Jamie directly coordinated Commercial Rent Stabilization work with staff in the offices of Council Member Christopher Marte and Assembly Member Emily Gallagher, including an event logistics handoff, an August 5 call, a legislative-provenance artifact, and a proposed recurring meeting cadence.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "Jamie coordinated directly with city and state legislative staff on event logistics, campaign information, legislative provenance, and an emerging recurring Commercial Rent Stabilization working cadence.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11",
          relationship: "private-support",
          supports: ["Council office staff handoff", "Assembly office staff call", "provenance artifact sharing", "proposed monthly meeting", "accepted August 26 invitation"],
          locator: "July 28 and August 5-9 threads.",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Name staff coordination as staff coordination; do not rewrite it as direct work with the elected officials unless a separate source establishes that interaction.",
        "The August 26 meeting is scheduled, not completed.",
        "The correspondence does not establish endorsement, adoption of Jamie's analysis, authorship of legislation, or policy outcome."
      ],
      antiClaims: [
        "Council Member Marte attended the July 29 event",
        "Assembly Member Gallagher endorsed Jamie",
        "Jamie advised elected officials as legal counsel",
        "the recurring meetings produced legislation",
        "the August 26 meeting already occurred"
      ],
      researchInquiryIds: ["INQ-CRS-STATE-STAFF-CADENCE-2026"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-CRS-NBC-FOOTAGE-REQUEST-2026",
      project: "commercial-rent-stabilization",
      internalClaim: "An organizer relayed an NBC request for footage of the July 29 event.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text: "An organizer relayed a same-day press footage request; publication and Jamie-specific use remain unverified.",
          status: "hold",
          citationRequired: false,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11",
          relationship: "private-support",
          supports: ["same-day NBC footage request"],
          locator: "July 29 organizer email.",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "A footage request is a press lead, not publication evidence.",
        "Do not infer that footage was delivered, used, broadcast, or included Jamie."
      ],
      antiClaims: [
        "NBC covered Jamie",
        "Jamie was interviewed by NBC",
        "NBC broadcast the event",
        "the footage request produced press coverage"
      ],
      researchInquiryIds: ["INQ-CRS-PRESS-COVERAGE-2026"],
      reviewedAt,
      reviewedBy
    },
    {
      id: "CLM-CRS-PUBLISHED-PRESS-COVERAGE-NOT-RECOVERED-2026",
      project: "commercial-rent-stabilization",
      internalClaim: "No published article, segment, interview, or quotation naming Jamie in connection with the July 29 event was recovered in the bounded August 12 search.",
      status: "not-recovered",
      projections: [
        {
          key: "resume-html",
          text: "Received published press coverage for the July 29 Commercial Rent Stabilization event.",
          status: "disallowed",
          citationRequired: true,
          surfaces: ["resume"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-CRS-PRESS-COVERAGE-SEARCH-2026-08-12",
          relationship: "direct-support",
          supports: ["bounded negative search result"],
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11",
          relationship: "supports-boundary",
          supports: ["press footage request without publication confirmation"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Negative search is not proof of nonexistence.",
        "Reopen this claim if a stable article, segment, transcript, or publisher record is recovered."
      ],
      antiClaims: [
        "Jamie received NBC coverage",
        "Jamie was quoted by the press",
        "no coverage exists anywhere"
      ],
      researchInquiryIds: ["INQ-CRS-PRESS-COVERAGE-2026"],
      reviewedAt,
      reviewedBy
    }
  ],

  researchInquiries: [
    {
      id: "INQ-CRS-REPORT-VERSION-CHAIN-2026",
      project: "commercial-rent-stabilization",
      question: "Which of Jamie's review comments can be traced through an immutable draft-to-final report version chain?",
      methods: [
        "Preserve digests for the reviewed draft, tracked review, and final PDF in a protected custody repository.",
        "Compare only claim, methods, legislative-language, accessibility, attribution, and release-hygiene changes relevant to the review.",
        "Ask the report owner to approve any public attribution beyond the printed acknowledgment."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The final PDF and exact acknowledgment are now recovered.",
        "Organizer correspondence states that many edits were incorporated.",
        "A complete immutable draft-to-final change attribution chain was not recovered in this run."
      ],
      limitations: [
        "Similarity between a review comment and final language does not prove exclusive authorship of the change.",
        "Private draft and tracked-change content must remain outside the public repository."
      ],
      sourceIds: ["SRC-CRS-EMPTY-STOREFRONTS-FINAL-REPORT-2026", "SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11"],
      publicSummary: "The final report and printed acknowledgment are recovered; exact draft-to-final attribution remains open.",
      protectedLocatorId: "RESEARCH-CRS-REPORT-VERSION-CHAIN-2026"
    },
    {
      id: "INQ-CRS-DELIVERED-SPEECH-AUDIO-REVIEW-2026",
      project: "commercial-rent-stabilization",
      question: "What exact delivered wording can be certified against the July 29 event audio and cleared for quotation?",
      methods: [
        "Review the machine transcript against the original audio at the speaker segment.",
        "Resolve names and obvious recognition errors without silently rewriting the speech.",
        "Record quotation, recording, and event-image rights separately from factual speaking-role verification."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The protected recording verifies Jamie's speaking role and the delivered speech's main themes.",
        "The machine transcript is not accurate enough to serve as a quote-certified public transcript."
      ],
      limitations: [
        "Audio review and publication-rights review remain incomplete.",
        "Prepared remarks cannot fill gaps in the delivered transcript."
      ],
      sourceIds: ["SRC-CRS-SBU-PRESS-CONFERENCE-RECORDING-2026-07-29"],
      publicSummary: "The speaking role and themes are verified; exact quotation remains held for audio and rights review.",
      protectedLocatorId: "RESEARCH-CRS-DELIVERED-SPEECH-AUDIO-REVIEW-2026"
    },
    {
      id: "INQ-CRS-PRESS-COVERAGE-2026",
      project: "commercial-rent-stabilization",
      question: "Was any July 29 event footage, interview, statement, or Jamie-attributed material published by a press or social outlet?",
      methods: [
        "Search the authenticated correspondence corpus for outlet, reporter, footage, interview, quote, broadcast, and publication references.",
        "Search public web results for the report title, event, campaign, and Jamie.",
        "Require a stable publisher route, recording, transcript, or direct outlet confirmation before recording coverage."
      ],
      runAt: reviewedAt,
      resultStatus: "not-recovered",
      findings: [
        "An organizer's same-day NBC footage request was recovered.",
        "No published Jamie-attributed press result was recovered in the bounded search.",
        "The Action Lab campaign post was verified as live, but it did not name Jamie and the visible collaborator list did not include NYC Artist Coalition at capture time."
      ],
      limitations: [
        "Search-engine and authenticated-email coverage is incomplete and can change.",
        "The live campaign post is publication evidence for Action Lab's campaign message, not press coverage of Jamie or proof of completed coalition platform credit."
      ],
      sourceIds: ["SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11", "SRC-CRS-PRESS-COVERAGE-SEARCH-2026-08-12", "SRC-CRS-ACTION-LAB-INSTAGRAM-2026-08-11"],
      publicSummary: "A campaign post and a press footage request were recovered, but published Jamie-attributed coverage and completed NYC Artist Coalition collaborator credit were not.",
      protectedLocatorId: "RESEARCH-CRS-PRESS-COVERAGE-2026"
    },
    {
      id: "INQ-CRS-STATE-STAFF-CADENCE-2026",
      project: "commercial-rent-stabilization",
      question: "Did the proposed monthly Commercial Rent Stabilization staff cadence begin, and what bounded actions or decisions followed?",
      methods: [
        "After each meeting, record occurrence separately from invitation status.",
        "Separate Jamie actions, staff actions, elected-official decisions, coalition decisions, and legislative outcomes.",
        "Retain public-safe metadata only unless participants approve a more detailed account."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The August 5 call occurred.",
        "A monthly three-person cadence was proposed.",
        "An August 26 meeting was scheduled and accepted."
      ],
      limitations: [
        "The August 26 meeting was future-dated at review time.",
        "No action, adoption, or policy outcome may be inferred from scheduling."
      ],
      sourceIds: ["SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11"],
      publicSummary: "A state legislative staff call and proposed recurring cadence are documented; the next meeting remains scheduled rather than completed.",
      protectedLocatorId: "RESEARCH-CRS-STATE-STAFF-CADENCE-2026"
    }
  ]
};
