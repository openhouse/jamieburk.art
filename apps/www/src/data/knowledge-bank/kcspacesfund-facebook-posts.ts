const reviewedAt = "2026-07-15";
const reportPath = "docs/knowledge-bank/kcspacesfund-facebook-posts-2020.md";
const ledgerPath = "docs/knowledge-bank/data/kcspacesfund-facebook-post-ledger.json";

const sourceIds = [
  "SRC-KCSPACES-FACEBOOK-PAGE-2026",
  "SRC-KCSPACES-FACEBOOK-POST-CENSUS-2026",
  "SRC-KCSPACES-DO816-DAILY-DOGOOD-2020",
  "SRC-KCSPACES-GOFUNDME-2020"
] as const;

const observationIds = [
  "OBS-KCSPACES-FACEBOOK-SURVIVING-POST-POPULATION",
  "OBS-KCSPACES-FACEBOOK-OPERATIONAL-SEQUENCE",
  "OBS-KCSPACES-FACEBOOK-NAMED-RECIPIENT-REPORTING",
  "OBS-KCSPACES-FACEBOOK-DESTINATION-NETWORK",
  "OBS-KCSPACES-FACEBOOK-INSTITUTIONAL-RESPONSES",
  "OBS-KCSPACES-FACEBOOK-VISIBLE-REACTION-SNAPSHOT",
  "OBS-KCSPACES-DO816-PUBLIC-CONTEXT",
  "OBS-KCSPACES-UNIFORM-NAME-MEMORY"
] as const;

export const kcSpacesFundFacebookPostAudit = {
  distinctSurvivingPosts: 35,
  earliestObserved: "2020-04-07",
  latestObserved: "2020-07-09",
  independentPasses: 2,
  terminalNoNewContentConfirmations: 7,
  postsWithStableAttachmentIds: 20,
  recordsWithUnavailableSharedContent: 5,
  postsWithVisibleReactionLabels: 27,
  totalVisibleReactions: 115,
  reactionKinds: { Like: 77, Love: 38 },
  currentFollowers: 108,
  currentFollowing: 1,
  namedInstitutionalResponseSignals: 3,
  uniquePublicDestinations: 6,
  primaryThemeCounts: {
    grantRecipientReporting: 12,
    applicationDonationAndDeadlineRouting: 10,
    fundraisingPartnerAndPrintMobilization: 7,
    publicContextMutualAidAndUnavailable: 6
  },
  ledgerPath,
  reportPath
} as const;

export const kcSpacesFundFacebookPosts = {
  intakeItems: [
    {
      id: "INTAKE-KCSPACES-FACEBOOK-POST-POPULATION-2026",
      kind: "public-artifact",
      title: "KC Spaces Fund Facebook Page post population",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated archival review",
      projectIds: ["kc-spaces-fund"],
      reason:
        "Account for every post exposed by the surviving Page surface and preserve its application, donation, partner, recipient-reporting, source-routing, response, and traction patterns with collective-credit boundaries.",
      sourceUrl: "https://www.facebook.com/KCSpacesFund/",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [...sourceIds],
      observationIds: observationIds.filter(
        (id) => id !== "OBS-KCSPACES-UNIFORM-NAME-MEMORY"
      ),
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POST-POPULATION-2026"],
      boundaries: [
        "Complete means all 35 distinct posts exposed by the surviving July 2026 Page surface received a public-safe disposition; it is not a native Meta export or deletion history.",
        "The repository excludes raw post text, private analytics, authentication state, personal contact data, applicant or donor records, and participant-level relationship graphs.",
        "The Page does not identify its individual publishers and cannot establish Jamie's authorship, ownership, grant decisions, fiscal-sponsor role, or stakeholder status.",
        "Visible reactions and replies remain mutable interface signals, not unique people, historical reach, stakeholder-group totals, or impact."
      ]
    },
    {
      id: "INTAKE-KCSPACES-UNIFORM-NAME-MEMORY-2026",
      kind: "memory-lead",
      title: "Jamie memory of supporting the KC Spaces Fund name selection",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart",
      projectIds: ["kc-spaces-fund"],
      reason:
        "Preserve Jamie's memory that he supported selection of a project name available uniformly across social platforms and domain names without upgrading it into a public attribution before corroboration.",
      visibility: "public-safe",
      disposition: "researching",
      sourceIds: [],
      observationIds: ["OBS-KCSPACES-UNIFORM-NAME-MEMORY"],
      researchInquiryIds: ["INQ-KCSPACES-NAME-AVAILABILITY-2026"],
      boundaries: [
        "This is Jamie's attributed first-person memory, not an administrator record or collaborator statement.",
        "The matching Page, domain, GoFundMe, and X identities show public coherence but do not establish who proposed, checked, selected, registered, or controlled the name.",
        "Do not infer Page ownership, campaign ownership, stakeholder status, or authorship of posts."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-KCSPACES-FACEBOOK-SURVIVING-POST-POPULATION",
      intakeId: "INTAKE-KCSPACES-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-KCSPACES-FACEBOOK-POST-CENSUS-2026",
      project: "kc-spaces-fund",
      kind: "source-fact",
      text:
        "Two authenticated traversals reconciled 35 distinct surviving Page posts dated April 7 through July 9, 2020, and the terminal control produced seven consecutive no-new-content confirmations.",
      locator: "Protected traversal controls and redacted 35-row disposition ledger",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCSPACES-FACEBOOK-SURVIVING-POST-POPULATION"],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "The public Page surface is not a native Meta export and cannot account for deleted, hidden, or unavailable historical posts.",
        "Five records retain incomplete shared or nested content and are marked accordingly rather than reconstructed."
      ]
    },
    {
      id: "OBS-KCSPACES-FACEBOOK-OPERATIONAL-SEQUENCE",
      intakeId: "INTAKE-KCSPACES-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-KCSPACES-FACEBOOK-POST-CENSUS-2026",
      project: "kc-spaces-fund",
      kind: "context",
      text:
        "The 35-post sequence moves from launch, applications, donations, deadlines, and service-area expansion through partner fundraising and recurring recipient updates.",
      locator: "One-primary-theme disposition across all 35 surviving posts",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCSPACES-FACEBOOK-OPERATIONAL-SEQUENCE"],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "Primary-theme classification is interpretive and assigns one category where concerns overlap.",
        "A publishing sequence does not establish internal workflow ownership, decision authority, readership, conversion, or impact."
      ]
    },
    {
      id: "OBS-KCSPACES-FACEBOOK-NAMED-RECIPIENT-REPORTING",
      intakeId: "INTAKE-KCSPACES-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-KCSPACES-FACEBOOK-PAGE-2026",
      project: "kc-spaces-fund",
      kind: "source-fact",
      text:
        "The surviving Facebook sequence corroborates the existing X archive's finding of at least 11 named recipient or grantee highlights while preserving one additional funding-update record whose recipient is not recoverable from the current display.",
      locator: "Recipient-reporting dispositions in the April-July 2020 Page chronology",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-KCSPACES-FACEBOOK-OPERATIONAL-SEQUENCE"],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "Campaign posts are public self-reporting, not an independent payment or disbursement ledger.",
        "Applicant, donor, payment, and internal decision records remain protected and outside this repository."
      ]
    },
    {
      id: "OBS-KCSPACES-FACEBOOK-DESTINATION-NETWORK",
      intakeId: "INTAKE-KCSPACES-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-KCSPACES-FACEBOOK-POST-CENSUS-2026",
      project: "kc-spaces-fund",
      kind: "source-fact",
      text:
        "The surviving posts route readers to six public-safe destinations: the campaign domain, application page, GoFundMe, an Oddities Prints fundraiser, Trans Women of Color Collective, and Do816's Daily DoGood article.",
      locator: "Normalized public-destination inventory",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCSPACES-FACEBOOK-OPERATIONAL-SEQUENCE"],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "A posted destination establishes routing, not click-through, readership, endorsement, partnership, conversion, or impact.",
        "The inventory excludes internal Facebook attachment routes, profile links, comments, controls, and personal contact details."
      ]
    },
    {
      id: "OBS-KCSPACES-FACEBOOK-INSTITUTIONAL-RESPONSES",
      intakeId: "INTAKE-KCSPACES-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-KCSPACES-FACEBOOK-POST-CENSUS-2026",
      project: "kc-spaces-fund",
      kind: "source-fact",
      text:
        "Visible reply threads preserve bounded public responses from Blackbox on Troost, Vulpes Bastille, and Fishtank Theatre, including thanks and one application-status acknowledgment.",
      locator: "Three organization-attributed public reply threads",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCSPACES-FACEBOOK-INSTITUTIONAL-RESPONSE-SIGNALS"],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "Three visible examples are not a complete stakeholder census and do not establish representative sentiment.",
        "A reply does not prove payment, grant approval, partnership, campaign causality, or durable impact."
      ]
    },
    {
      id: "OBS-KCSPACES-FACEBOOK-VISIBLE-REACTION-SNAPSHOT",
      intakeId: "INTAKE-KCSPACES-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-KCSPACES-FACEBOOK-POST-CENSUS-2026",
      project: "kc-spaces-fund",
      kind: "limitation",
      text:
        "A July 15, 2026 interface snapshot displayed reaction labels on 27 posts, totaling 115 reactions: 77 Like and 38 Love.",
      locator: "Aggregate current interface labels",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCSPACES-FACEBOOK-VISIBLE-TRACTION-SNAPSHOT"],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "The values are mutable labels, not historical analytics or unique people.",
        "They do not establish stakeholder-group engagement, reach, endorsement, conversion, grant outcomes, or impact."
      ]
    },
    {
      id: "OBS-KCSPACES-DO816-PUBLIC-CONTEXT",
      intakeId: "INTAKE-KCSPACES-FACEBOOK-POST-POPULATION-2026",
      sourceId: "SRC-KCSPACES-DO816-DAILY-DOGOOD-2020",
      project: "kc-spaces-fund",
      kind: "source-fact",
      text:
        "Do816's April 21 Daily DoGood entry described concern that community arts spaces might not survive shutdown and reported that KC Spaces Fund collected donations and gave grants to affected local art spaces and music venues.",
      locator: "Tuesday, April 21 section",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-KCSPACES-FACEBOOK-OPERATIONAL-SEQUENCE"],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POST-POPULATION-2026"],
      limitations: [
        "The article does not identify Jamie's role or establish formal nonprofit status, a complete disbursement total, or campaign causality.",
        "Its description is a contemporary external account, not an audited grant ledger."
      ]
    },
    {
      id: "OBS-KCSPACES-UNIFORM-NAME-MEMORY",
      intakeId: "INTAKE-KCSPACES-UNIFORM-NAME-MEMORY-2026",
      project: "kc-spaces-fund",
      kind: "participant-memory",
      text:
        "Jamie remembers supporting the choice of a KC Spaces Fund name that was available uniformly across social platforms and domain names.",
      locator: "Jamie statement to Codex, July 15, 2026",
      status: "captured",
      publicSafe: true,
      claimIds: ["CLM-KCSPACES-UNIFORM-NAME-CONTRIBUTION-MEMORY"],
      researchInquiryIds: ["INQ-KCSPACES-NAME-AVAILABILITY-2026"],
      limitations: [
        "This is Jamie's attributed first-person memory and has not been corroborated by registration records or a collaborator.",
        "Matching public identities do not establish who proposed, selected, registered, or controlled the name."
      ]
    }
  ],
  sources: [
    {
      id: "SRC-KCSPACES-FACEBOOK-PAGE-2026",
      title: "KC Spaces Fund Facebook Page",
      organization: "KC Spaces Fund",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.facebook.com/KCSpacesFund/",
      preferredPublicUrl: "canonical",
      publicCitation: "KC Spaces Fund Facebook Page, accessed July 15, 2026.",
      publicNote: "Public campaign identity and surviving April-July 2020 post surface.",
      supportsGenerally: [
        "the public Page identity",
        "the surviving campaign chronology",
        "application, donation, partner, and recipient-reporting routes"
      ],
      doesNotEstablish: [
        "complete lifetime history or deleted posts",
        "individual publisher identity",
        "Jamie's organizer, owner, stakeholder, or grant-decision role",
        "independent payment verification or impact"
      ]
    },
    {
      id: "SRC-KCSPACES-FACEBOOK-POST-CENSUS-2026",
      title: "Protected KC Spaces Fund Facebook Page post census",
      organization: "Codex authenticated archival review",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      accessedAt: reviewedAt,
      publicCitation: "Protected authenticated KC Spaces Fund Facebook post census, July 15, 2026.",
      publicNote: "The public repository retains aggregate controls, a redacted 35-row ledger, selected destinations, and explicit limitations.",
      supportsGenerally: [
        "the 35-post surviving-surface reconciliation",
        "the April 7-July 9 chronology",
        "theme, route, response, and mutable-reaction aggregates"
      ],
      doesNotEstablish: [
        "a native Meta export or deletion history",
        "individual publisher identity",
        "unique people or historical reach",
        "stakeholder-group totals or impact"
      ],
      protectedLocatorId: "RESEARCH-KCSPACES-FACEBOOK-POSTS-2026-001"
    },
    {
      id: "SRC-KCSPACES-DO816-DAILY-DOGOOD-2020",
      title: "The Daily DoGood: Kansas City",
      organization: "Do816",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://do816.com/p/the-daily-dogood-kansas-city",
      preferredPublicUrl: "canonical",
      publicCitation: "Do816, 'The Daily DoGood: Kansas City,' April 2020.",
      publicNote: "A contemporary external roundup describing KC Spaces Fund's emergency-relief purpose and linking to its GoFundMe.",
      supportsGenerally: [
        "contemporary external awareness of KC Spaces Fund",
        "the campaign's donation-and-grant purpose",
        "concern for local arts spaces and music venues during shutdown"
      ],
      doesNotEstablish: [
        "Jamie's role",
        "formal nonprofit status",
        "complete grant disbursement",
        "campaign causality or impact"
      ]
    }
  ],
  claims: [
    {
      id: "CLM-KCSPACES-FACEBOOK-SURVIVING-POST-POPULATION",
      project: "kc-spaces-fund",
      internalClaim:
        "The surviving July 2026 KC Spaces Fund Facebook Page surface contains 35 distinct posts dated April 7 through July 9, 2020.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "All 35 posts exposed by the surviving Page surface received public-safe dispositions.",
        status: "active",
        citationRequired: false,
        surfaces: [reportPath]
      }],
      evidence: [{
        sourceId: "SRC-KCSPACES-FACEBOOK-POST-CENSUS-2026",
        relationship: "private-support",
        supports: ["the two-pass 35-record reconciliation and terminal control"],
        locator: "Protected traversal controls and redacted ledger",
        confidence: "high",
        renderCitation: false
      }],
      boundaries: [
        "Complete refers only to the currently surviving Page surface.",
        "The result is not a native Meta export and cannot account for deleted or hidden history."
      ],
      antiClaims: [
        "KC Spaces Fund published only 35 Facebook posts in its lifetime",
        "The census proves no posts were deleted or hidden",
        "Every shared attachment remains fully recoverable"
      ],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POST-POPULATION-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-KCSPACES-FACEBOOK-OPERATIONAL-SEQUENCE",
      project: "kc-spaces-fund",
      internalClaim:
        "The complete surviving Page sequence documents a coherent public operating loop: launch, donation and application routing, deadlines and service-area expansion, partner fundraising, and recurring recipient reporting.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "The surviving Facebook record moves from launch and application routing through partner fundraising and recurring recipient updates.",
        status: "active",
        citationRequired: false,
        surfaces: [reportPath]
      }],
      evidence: [
        {
          sourceId: "SRC-KCSPACES-FACEBOOK-POST-CENSUS-2026",
          relationship: "private-support",
          supports: ["the complete primary-theme and destination disposition"],
          locator: "Redacted 35-row ledger",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCSPACES-DO816-DAILY-DOGOOD-2020",
          relationship: "corroborating",
          supports: ["contemporary external description of donation collection and grants to affected local arts spaces and music venues"],
          locator: "Tuesday, April 21 section",
          confidence: "high",
          renderCitation: false
        },
        {
          sourceId: "SRC-KCSPACES-GOFUNDME-2020",
          relationship: "context",
          supports: ["campaign purpose, public fundraising result, named organizers, fiscal-sponsor context, and advertised grant ceiling"],
          locator: "Public fundraiser page",
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "This is a public communications and routing pattern, not attribution of internal workflow ownership.",
        "Campaign self-reporting and external context do not replace an independent payment ledger."
      ],
      antiClaims: [
        "Jamie authored or published the Page",
        "Jamie selected grantees or controlled disbursement",
        "The Page sequence proves readership, conversion, or campaign impact"
      ],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POST-POPULATION-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review", "Codex collective-credit review"]
    },
    {
      id: "CLM-KCSPACES-FACEBOOK-INSTITUTIONAL-RESPONSE-SIGNALS",
      project: "kc-spaces-fund",
      internalClaim:
        "Three visible reply threads preserve bounded public responses from named arts organizations or spaces.",
      status: "use-with-care",
      projections: [{
        key: "archive-note",
        text: "Visible reply threads preserve bounded responses from Blackbox on Troost, Vulpes Bastille, and Fishtank Theatre.",
        status: "active",
        citationRequired: false,
        surfaces: [reportPath]
      }],
      evidence: [{
        sourceId: "SRC-KCSPACES-FACEBOOK-POST-CENSUS-2026",
        relationship: "private-support",
        supports: ["three organization-attributed public reply threads"],
        locator: "Protected reply-thread review",
        confidence: "high",
        renderCitation: false
      }],
      boundaries: [
        "The examples are public response signals, not a complete stakeholder census.",
        "Thanks and application acknowledgment do not prove payment, partnership, representative sentiment, or impact."
      ],
      antiClaims: [
        "Only three organizations engaged with KC Spaces Fund",
        "Three responses represent the views of Kansas City's arts ecosystem",
        "The replies prove grant receipt, campaign causality, or durable impact"
      ],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POST-POPULATION-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-KCSPACES-FACEBOOK-VISIBLE-TRACTION-SNAPSHOT",
      project: "kc-spaces-fund",
      internalClaim:
        "A July 15, 2026 interface snapshot displayed 115 reaction labels across 27 surviving posts.",
      status: "use-with-care",
      projections: [{
        key: "archive-note",
        text: "A mutable July 2026 snapshot displayed 115 reactions across 27 posts; these are current interface labels, not historical analytics.",
        status: "active",
        citationRequired: false,
        surfaces: [reportPath]
      }],
      evidence: [{
        sourceId: "SRC-KCSPACES-FACEBOOK-POST-CENSUS-2026",
        relationship: "private-support",
        supports: ["the current visible-reaction aggregation"],
        locator: "Protected July 15 interface-label control",
        confidence: "high",
        renderCitation: false
      }],
      boundaries: [
        "Reaction totals are mutable platform labels, not unique people or historical reach.",
        "No defensible stakeholder-group engagement total was recovered."
      ],
      antiClaims: [
        "One hundred fifteen people engaged with KC Spaces Fund",
        "The reactions represent key stakeholder engagement",
        "The snapshot measures conversion, grant outcomes, reach, or impact"
      ],
      researchInquiryIds: ["INQ-KCSPACES-FACEBOOK-POST-POPULATION-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated archival review"]
    },
    {
      id: "CLM-KCSPACES-UNIFORM-NAME-CONTRIBUTION-MEMORY",
      project: "kc-spaces-fund",
      internalClaim:
        "Jamie remembers supporting selection of the KC Spaces Fund name for uniform availability across social platforms and domain names.",
      status: "use-with-care",
      projections: [{
        key: "archive-note",
        text: "Jamie's name-availability contribution remains an attributed research lead pending registration records or collaborator corroboration.",
        status: "hold",
        citationRequired: false,
        surfaces: []
      }],
      evidence: [],
      boundaries: [
        "This is Jamie's attributed first-person memory.",
        "Matching public identities demonstrate coherence but do not identify who proposed, selected, registered, or controlled the name.",
        "The memory does not establish account ownership, posting, stakeholder status, or campaign ownership."
      ],
      antiClaims: [
        "Jamie has been independently verified as the sole creator of the KC Spaces Fund name",
        "Jamie owned or controlled every KC Spaces Fund account and domain",
        "Uniform naming proves Jamie authored the campaign or its posts"
      ],
      researchInquiryIds: ["INQ-KCSPACES-NAME-AVAILABILITY-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-KCSPACES-FACEBOOK-POST-POPULATION-2026",
      project: "kc-spaces-fund",
      question:
        "Can every post exposed by the surviving KC Spaces Fund Facebook Page receive a public-safe disposition with mission, source, route, response, traction, and credit boundaries?",
      methods: [
        "Traversed the authenticated public Page repeatedly from newest to oldest until seven consecutive terminal checks produced no new post content.",
        "Ran an independent second pass that decoded displayed dates and reconciled the same 35 top-level records.",
        "Close-read every record and assigned one primary theme, a concise route label, and content-availability status.",
        "Normalized public destinations and separated organization-attributed reply signals from mutable aggregate reactions.",
        "Close-read Do816's linked Daily DoGood article and reconciled the Facebook sequence against the existing X and GoFundMe records.",
        "Kept publisher identity, stakeholder ownership, collective credit, grant decisions, private records, and Jamie's technical role separate."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The surviving Page surface contains 35 distinct posts dated April 7 through July 9, 2020.",
        "Every surviving record has a public-safe disposition; five retain unavailable shared or nested content.",
        "The sequence moves from launch and application routing through partner fundraising and recurring recipient reporting.",
        "Six public-safe destinations include campaign, application, fundraiser, partner, aligned-fund, and external-article routes.",
        "Three organization-attributed reply threads provide bounded response signals.",
        "Current reaction labels are preserved as a mutable aggregate while stakeholder-group engagement remains uncounted."
      ],
      limitations: [
        "The Page surface is not a native Meta export and cannot expose deleted, hidden, or unavailable history.",
        "Five shared-content records are incomplete and were not reconstructed from memory.",
        "The Page does not identify who published each post or held administrative access.",
        "Raw text, comments, personal data, private analytics, applicant records, donor records, and participant relationship context remain outside the public repository.",
        "Links, replies, followers, and reactions do not establish readership, endorsement, unique people, stakeholder-group totals, conversion, or impact.",
        "Campaign self-reporting does not replace an independent payment or grant-decision ledger."
      ],
      sourceIds: [...sourceIds],
      publicSummary:
        "All 35 posts exposed by the surviving Page surface received public-safe dispositions. The record documents a coherent public operating loop while keeping historical completeness, collective credit, publisher identity, mutable engagement, and private grant records bounded.",
      protectedLocatorId: "RESEARCH-KCSPACES-FACEBOOK-POSTS-2026-001"
    },
    {
      id: "INQ-KCSPACES-NAME-AVAILABILITY-2026",
      project: "kc-spaces-fund",
      question:
        "Can Jamie's remembered contribution to choosing a uniformly available project name be corroborated without implying account ownership or campaign authorship?",
      methods: [
        "Captured Jamie's first-person memory as a separate intake.",
        "Confirmed that matching KC Spaces Fund identity strings survive across the Facebook Page, public domain, GoFundMe route, and X profile.",
        "Separated visible identity coherence from the unrecovered decision, availability-check, registration, administrator, and custody histories.",
        "Defined domain-registration history, launch notes, and collaborator corroboration as next evidence."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "Jamie remembers supporting name selection for uniform social and domain availability.",
        "Matching public identities demonstrate a coherent cross-platform project name.",
        "The public surfaces do not identify who proposed, selected, registered, or controlled the name.",
        "The contribution remains held from public portfolio projection pending corroboration."
      ],
      limitations: [
        "No native account-creator or administrator history was reviewed.",
        "No contemporaneous domain-availability worksheet or registration chronology was recovered in this pass.",
        "No collaborator proof note was reviewed for the naming contribution.",
        "Identity coherence does not establish Jamie as campaign owner, stakeholder, poster, organizer, or grant decision-maker."
      ],
      sourceIds: [
        "SRC-KCSPACES-FACEBOOK-PAGE-2026",
        "SRC-KCSPACES-GOFUNDME-2020",
        "SRC-X-PROFILE-KCSPACESFUND"
      ],
      publicSummary:
        "The matching public identity is visible; Jamie's contribution to selecting the uniformly available name remains an attributed research lead.",
      protectedLocatorId: "RESEARCH-KCSPACES-NAME-AVAILABILITY-2026-001"
    }
  ]
};
