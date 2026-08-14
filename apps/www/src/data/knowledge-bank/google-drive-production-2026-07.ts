const reviewedAt = "2026-07-14";

export const googleDriveProductionJuly2026 = {
  intakeItems: [
    {
      id: "INTAKE-196-RESIDENCY-ACCEPTANCE-WORKFLOW-2023",
      kind: "analysis-note",
      title: "Protected 196 Artists Residency acceptance workflow",
      submittedAt: reviewedAt,
      submittedBy: "Google Drive Shared Drive archival review",
      projectIds: ["196-sunday-dinner"],
      reason: "Preserve public-safe evidence of Jamie's residency onboarding and access-handoff practice without publishing an artist's letter or contact information.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: ["SRC-196-RESIDENCY-ACCEPTANCE-WORKFLOW-2023"],
      observationIds: [
        "OBS-196-RESIDENCY-PROPOSAL-ACCEPTANCE",
        "OBS-196-RESIDENCY-ONBOARDING-CONFIGURATION",
        "OBS-196-RESIDENCY-INDEPENDENT-ACCESS"
      ],
      researchInquiryIds: [],
      boundaries: [
        "Do not publish the underlying letter, artist identity, contact details, dates, or private Drive locator.",
        "The template documents Jamie's planned operating workflow, not the artist's outcome or the scale of the residency program.",
        "Independent access is an operational handoff, not evidence of public access, legal status, or universal practice across every residency."
      ]
    },
    {
      id: "INTAKE-SUNDAY-DINNER-OPERATIONS-SHEET-2025",
      kind: "analysis-note",
      title: "Protected Sunday Dinner invitation and attendance workflow",
      submittedAt: reviewedAt,
      submittedBy: "Google Drive Shared Drive archival review",
      projectIds: ["196-sunday-dinner"],
      reason: "Retain the operating schema while excluding participant rows, names, contact information, and attendance history.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: ["SRC-SUNDAY-DINNER-OPERATIONS-SHEET-2025"],
      observationIds: [
        "OBS-SUNDAY-DINNER-INVITATION-RESPONSE-SCHEMA",
        "OBS-SUNDAY-DINNER-PARTICIPANT-DATA-BOUNDARY"
      ],
      researchInquiryIds: [],
      boundaries: [
        "Do not publish participant names, phone numbers, email addresses, social handles, invitation history, responses, or attendance records.",
        "The sheet's schema supports a recurring coordination workflow but does not establish the total number of gatherings or resident artists.",
        "A private operating record does not establish participant consent to be represented publicly."
      ]
    },
    {
      id: "INTAKE-NYCAC-SAVE-JIMMYS-CORNER-PHOTO-LEAD-2026",
      kind: "photo-lead",
      title: "Protected Save Jimmy's Corner documentation lead",
      submittedAt: reviewedAt,
      submittedBy: "Google Drive Shared Drive archival review",
      projectIds: ["nyc-artist-coalition"],
      reason: "Retain a potentially useful public-event documentation lead while separating visible content from photographer credit, rights, consent, and project-role claims.",
      visibility: "protected",
      disposition: "researching",
      sourceIds: ["SRC-NYCAC-SAVE-JIMMYS-CORNER-PHOTO-LEAD-2026"],
      observationIds: ["OBS-NYCAC-SAVE-JIMMYS-CORNER-VISUAL-LEAD"],
      researchInquiryIds: ["INQ-NYCAC-SAVE-JIMMYS-CORNER-DOCUMENTATION-CREDIT"],
      boundaries: [
        "Do not publish the image or identify represented people before rights, consent, caption, and editorial review.",
        "A Shared Drive folder association does not establish Jamie as photographer, interviewer, producer, or campaign lead.",
        "Visible media equipment does not establish publication, broadcast, audience, or impact."
      ]
    },
    {
      id: "INTAKE-OPEN-DATA-WEEK-DOCUMENTATION-LEAD-2026",
      kind: "photo-lead",
      title: "Protected Open Data Week documentation lead",
      submittedAt: reviewedAt,
      submittedBy: "Google Drive Shared Drive archival review",
      projectIds: ["open-data-week"],
      reason: "Preserve a visual and motion-asset lead for later source and rights research without converting folder custody into authorship.",
      visibility: "protected",
      disposition: "researching",
      sourceIds: ["SRC-OPEN-DATA-WEEK-DOCUMENTATION-LEAD-2026"],
      observationIds: ["OBS-OPEN-DATA-WEEK-BRIDGE-VISUAL-LEAD"],
      researchInquiryIds: ["INQ-OPEN-DATA-WEEK-DOCUMENTATION-CREDIT"],
      boundaries: [
        "Do not publish images or motion assets before rights, represented-people, caption, and editorial review.",
        "The files do not by themselves establish Jamie's commission, authorship, event role, or the identity of represented people.",
        "A visible bridge scene does not establish the event's program, attendance, outcome, or public-data method."
      ]
    },
    {
      id: "INTAKE-ACT-MIT-DOCUMENTATION-LEAD-2024",
      kind: "photo-lead",
      title: "Protected ACT at MIT documentation lead",
      submittedAt: reviewedAt,
      submittedBy: "Google Drive Shared Drive archival review",
      projectIds: ["act-mit"],
      reason: "Preserve a public-event photo lead while holding all authorship, role, rights, and participant-identity claims for corroboration.",
      visibility: "protected",
      disposition: "researching",
      sourceIds: ["SRC-ACT-MIT-DOCUMENTATION-LEAD-2024"],
      observationIds: ["OBS-ACT-MIT-STAGE-VISUAL-LEAD"],
      researchInquiryIds: ["INQ-ACT-MIT-DOCUMENTATION-CREDIT"],
      boundaries: [
        "Do not publish the image or identify represented people before rights, consent, caption, and editorial review.",
        "The image does not establish Jamie as photographer, organizer, speaker, host, or commissioned documentarian.",
        "Visible institutional branding does not establish endorsement, employment, affiliation, or impact."
      ]
    },
    {
      id: "INTAKE-WOWLIST-MEMBERS-MEETING-VIDEO-2015",
      kind: "analysis-note",
      title: "Protected WOW List members-meeting video lead",
      submittedAt: reviewedAt,
      submittedBy: "Google Drive Shared Drive archival review",
      projectIds: ["wowlist"],
      reason: "Retain the existence of a potentially useful operating-history source while requiring a permissioned close reading before extracting claims.",
      visibility: "protected",
      disposition: "researching",
      sourceIds: ["SRC-WOWLIST-MEMBERS-MEETING-VIDEO-2015"],
      observationIds: ["OBS-WOWLIST-MEMBERS-MEETING-VIDEO-EXISTS"],
      researchInquiryIds: ["INQ-WOWLIST-MEMBERS-MEETING-VIDEO-REVIEW"],
      boundaries: [
        "Do not publish or quote the meeting video without participant, rights, privacy, and editorial review.",
        "File custody does not establish the meeting's decisions, attendance, Jamie's role, or subsequent outcomes.",
        "No transcript-derived claim has been created in this pass."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-196-RESIDENCY-PROPOSAL-ACCEPTANCE",
      intakeId: "INTAKE-196-RESIDENCY-ACCEPTANCE-WORKFLOW-2023",
      sourceId: "SRC-196-RESIDENCY-ACCEPTANCE-WORKFLOW-2023",
      project: "196-sunday-dinner",
      kind: "source-fact",
      text: "A 2023 acceptance template signed by Jamie documents proposal review and acceptance into an exhibition-based residency.",
      locator: "Protected artifact, acceptance opening and signature.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-196-RESIDENCY-ONBOARDING-WORKFLOW-2023"],
      researchInquiryIds: [],
      limitations: [
        "The underlying artist identity and correspondence remain private.",
        "The template does not establish completion, exhibition outcome, participant satisfaction, or program scale."
      ]
    },
    {
      id: "OBS-196-RESIDENCY-ONBOARDING-CONFIGURATION",
      intakeId: "INTAKE-196-RESIDENCY-ACCEPTANCE-WORKFLOW-2023",
      sourceId: "SRC-196-RESIDENCY-ACCEPTANCE-WORKFLOW-2023",
      project: "196-sunday-dinner",
      kind: "source-fact",
      text: "The template describes video-call onboarding and configuring the space around the accepted artist's needs.",
      locator: "Protected artifact, onboarding and space-configuration paragraphs.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-196-RESIDENCY-ONBOARDING-WORKFLOW-2023"],
      researchInquiryIds: [],
      limitations: [
        "The record documents the planned workflow, not a measured outcome.",
        "It does not establish that the same configuration process applied to every resident."
      ]
    },
    {
      id: "OBS-196-RESIDENCY-INDEPENDENT-ACCESS",
      intakeId: "INTAKE-196-RESIDENCY-ACCEPTANCE-WORKFLOW-2023",
      sourceId: "SRC-196-RESIDENCY-ACCEPTANCE-WORKFLOW-2023",
      project: "196-sunday-dinner",
      kind: "source-fact",
      text: "The template includes a lockbox and independent-key handoff for the accepted artist and a collaborator.",
      locator: "Protected artifact, access and key-handoff paragraph.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-196-RESIDENCY-ONBOARDING-WORKFLOW-2023"],
      researchInquiryIds: [],
      limitations: [
        "Security details, dates, identities, and location information remain private.",
        "Independent artist access is not public access and does not establish legal or insurance status."
      ]
    },
    {
      id: "OBS-SUNDAY-DINNER-INVITATION-RESPONSE-SCHEMA",
      intakeId: "INTAKE-SUNDAY-DINNER-OPERATIONS-SHEET-2025",
      sourceId: "SRC-SUNDAY-DINNER-OPERATIONS-SHEET-2025",
      project: "196-sunday-dinner",
      kind: "source-fact",
      text: "A protected 2025 operating sheet uses standardized fields for event dates and themes, invitations, response status, attendance, and follow-up across recurring gatherings.",
      locator: "Protected artifact, header and event-tracking structure only.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-SUNDAY-DINNER-INVITATION-OPERATIONS-2025"],
      researchInquiryIds: [],
      limitations: [
        "Only the schema was used; participant rows and contact details are excluded.",
        "The sheet does not independently establish the total number of gatherings, invitations, attendees, or resident artists."
      ]
    },
    {
      id: "OBS-SUNDAY-DINNER-PARTICIPANT-DATA-BOUNDARY",
      intakeId: "INTAKE-SUNDAY-DINNER-OPERATIONS-SHEET-2025",
      sourceId: "SRC-SUNDAY-DINNER-OPERATIONS-SHEET-2025",
      project: "196-sunday-dinner",
      kind: "limitation",
      text: "The operating sheet contains participant and contact fields that remain private and are neither copied into the repository nor treated as publication consent.",
      locator: "Protected artifact, participant-field schema only; no row values retained.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-SUNDAY-DINNER-INVITATION-OPERATIONS-2025"],
      researchInquiryIds: [],
      limitations: [
        "This observation intentionally excludes all participant-level values.",
        "Private recordkeeping cannot be used to imply endorsement, consent, community scale, or individual participation."
      ]
    },
    {
      id: "OBS-NYCAC-SAVE-JIMMYS-CORNER-VISUAL-LEAD",
      intakeId: "INTAKE-NYCAC-SAVE-JIMMYS-CORNER-PHOTO-LEAD-2026",
      sourceId: "SRC-NYCAC-SAVE-JIMMYS-CORNER-PHOTO-LEAD-2026",
      project: "nyc-artist-coalition",
      kind: "visual-observation",
      text: "A protected photograph shows an outdoor interview setting and a visible public-radio microphone.",
      locator: "Protected photo lead, generic scene description only.",
      status: "captured",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: ["INQ-NYCAC-SAVE-JIMMYS-CORNER-DOCUMENTATION-CREDIT"],
      limitations: [
        "No represented person is identified in the repository record.",
        "The image does not establish photographer, interviewer, producer, publication, broadcast, or campaign outcome."
      ]
    },
    {
      id: "OBS-OPEN-DATA-WEEK-BRIDGE-VISUAL-LEAD",
      intakeId: "INTAKE-OPEN-DATA-WEEK-DOCUMENTATION-LEAD-2026",
      sourceId: "SRC-OPEN-DATA-WEEK-DOCUMENTATION-LEAD-2026",
      project: "open-data-week",
      kind: "visual-observation",
      text: "A protected photograph shows cyclists and pedestrians traveling on a bridge; the folder also contains branded motion assets.",
      locator: "Protected photo and motion lead, generic visual inventory only.",
      status: "captured",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: ["INQ-OPEN-DATA-WEEK-DOCUMENTATION-CREDIT"],
      limitations: [
        "The record does not identify represented people or establish their relationship to an event.",
        "Folder custody and visible branding do not establish Jamie's authorship, commission, role, method, or impact."
      ]
    },
    {
      id: "OBS-ACT-MIT-STAGE-VISUAL-LEAD",
      intakeId: "INTAKE-ACT-MIT-DOCUMENTATION-LEAD-2024",
      sourceId: "SRC-ACT-MIT-DOCUMENTATION-LEAD-2024",
      project: "act-mit",
      kind: "visual-observation",
      text: "A protected photograph shows a public stage conversation with institutional branding and a remote participant displayed on screen.",
      locator: "Protected photo lead, generic stage description only.",
      status: "captured",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: ["INQ-ACT-MIT-DOCUMENTATION-CREDIT"],
      limitations: [
        "The repository record does not identify represented people.",
        "The image does not establish Jamie's authorship, event role, institutional affiliation, endorsement, audience, or outcome."
      ]
    },
    {
      id: "OBS-WOWLIST-MEMBERS-MEETING-VIDEO-EXISTS",
      intakeId: "INTAKE-WOWLIST-MEMBERS-MEETING-VIDEO-2015",
      sourceId: "SRC-WOWLIST-MEMBERS-MEETING-VIDEO-2015",
      project: "wowlist",
      kind: "research-lead",
      text: "A protected Shared Drive contains a members-meeting video that may preserve operating-history evidence for WOW List.",
      locator: "Protected video lead; no transcript or participant content retained.",
      status: "captured",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: ["INQ-WOWLIST-MEMBERS-MEETING-VIDEO-REVIEW"],
      limitations: [
        "The video was inventoried but not transcribed or used for proposition-level claims.",
        "Its existence does not establish attendance, decisions, authorship, Jamie's role, or subsequent outcomes."
      ]
    }
  ],
  sources: [
    {
      id: "SRC-196-RESIDENCY-ACCEPTANCE-WORKFLOW-2023",
      title: "Protected 196 Artists Residency acceptance workflow artifact",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publicCitation: "Protected 2023 residency acceptance workflow artifact.",
      publicNote: "Only public-safe workflow metadata is retained; the underlying letter and artist information remain private.",
      protectedLocatorId: "ARCHIVE-196-RESIDENCY-WORKFLOW-2023-001",
      supportsGenerally: [
        "proposal review and acceptance status",
        "video-call onboarding",
        "space configuration around the accepted artist's needs",
        "independent resident and collaborator access",
        "Jamie signed the workflow communication"
      ],
      doesNotEstablish: [
        "artist outcome or satisfaction",
        "the number of residencies or resident artists",
        "public access or publication consent",
        "universal use of the workflow across every residency"
      ]
    },
    {
      id: "SRC-SUNDAY-DINNER-OPERATIONS-SHEET-2025",
      title: "Protected Sunday Dinner operating-sheet schema",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publicCitation: "Protected 2025 Sunday Dinner operating-sheet schema.",
      publicNote: "Only field-level workflow structure is retained; no participant values are copied into the repository.",
      protectedLocatorId: "ARCHIVE-SUNDAY-DINNER-OPERATIONS-2025-001",
      supportsGenerally: [
        "standardized event date and theme fields",
        "invitation and response-status fields",
        "attendance and follow-up fields",
        "private participant and contact-data boundary",
        "Jamie's use of a structured recurring-gathering workflow"
      ],
      doesNotEstablish: [
        "the total number of gatherings, invitations, attendees, or resident artists",
        "participant consent to publication",
        "public endorsement by any participant",
        "community impact or participant outcomes"
      ]
    },
    {
      id: "SRC-NYCAC-SAVE-JIMMYS-CORNER-PHOTO-LEAD-2026",
      title: "Save Jimmy's Corner protected photo lead",
      kind: "photo-metadata",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publicCitation: "Protected public-event documentation lead associated with Save Jimmy's Corner.",
      publicNote: "No image, identity, private locator, or authorship claim is exposed.",
      protectedLocatorId: "PHOTO-NYCAC-SAVE-JIMMYS-CORNER-2026-001",
      supportsGenerally: ["outdoor interview setting", "visible public-radio microphone", "existence of a protected documentation lead"],
      doesNotEstablish: ["photographer or producer credit", "represented-person identity or consent", "publication or broadcast", "campaign role, reach, or impact"],
      media: {
        mediaKind: "photograph",
        rightsStatus: "unknown",
        consentStatus: "review-needed",
        publicDisplayStatus: "hold"
      }
    },
    {
      id: "SRC-OPEN-DATA-WEEK-DOCUMENTATION-LEAD-2026",
      title: "Open Data Week protected photo and motion lead",
      kind: "photo-metadata",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publicCitation: "Protected visual documentation lead associated with Open Data Week.",
      publicNote: "No asset, identity, private locator, or authorship claim is exposed.",
      protectedLocatorId: "MEDIA-OPEN-DATA-WEEK-2026-001",
      supportsGenerally: ["cyclists and pedestrians visible on a bridge", "existence of branded motion assets", "existence of a protected documentation lead"],
      doesNotEstablish: ["Jamie as photographer, animator, or commissioned documentarian", "represented-person identity or consent", "event program or attendance", "project method, reach, or impact"],
      media: {
        mediaKind: "photograph",
        rightsStatus: "unknown",
        consentStatus: "review-needed",
        publicDisplayStatus: "hold"
      }
    },
    {
      id: "SRC-ACT-MIT-DOCUMENTATION-LEAD-2024",
      title: "ACT at MIT protected photo lead",
      kind: "photo-metadata",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publicCitation: "Protected public-event documentation lead associated with ACT at MIT.",
      publicNote: "No image, identity, private locator, or authorship claim is exposed.",
      protectedLocatorId: "PHOTO-ACT-MIT-2024-001",
      supportsGenerally: ["public stage-conversation setting", "visible institutional branding", "remote participant displayed on screen"],
      doesNotEstablish: ["Jamie as photographer, organizer, speaker, host, or commissioned documentarian", "represented-person identity or consent", "institutional endorsement or affiliation", "audience or outcome"],
      media: {
        mediaKind: "photograph",
        rightsStatus: "unknown",
        consentStatus: "review-needed",
        publicDisplayStatus: "hold"
      }
    },
    {
      id: "SRC-WOWLIST-MEMBERS-MEETING-VIDEO-2015",
      title: "Protected WOW List members-meeting video lead",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publicCitation: "Protected WOW List operating-history video lead.",
      publicNote: "The video remains unquoted and untranscribed pending permissioned review.",
      protectedLocatorId: "VIDEO-WOWLIST-MEMBERS-MEETING-2015-001",
      supportsGenerally: ["existence of a members-meeting video", "potential operating-history research lead"],
      doesNotEstablish: ["attendance or participant identity", "meeting decisions", "Jamie's role", "subsequent product or community outcomes"]
    }
  ],
  claims: [
    {
      id: "CLM-196-RESIDENCY-ONBOARDING-WORKFLOW-2023",
      project: "196-sunday-dinner",
      internalClaim: "Jamie documented a repeatable residency handoff spanning proposal acceptance, video-call onboarding, space configuration, and independent access for an accepted artist and collaborator.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "case-study",
        text: "Jamie documented a repeatable residency handoff: proposal review, video-call onboarding, space configuration, and independent access for the resident artist and a collaborator.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/196-sunday-dinner"]
      }],
      evidence: [{
        sourceId: "SRC-196-RESIDENCY-ACCEPTANCE-WORKFLOW-2023",
        relationship: "private-support",
        supports: [
          "proposal review and acceptance status",
          "video-call onboarding",
          "space configuration around the accepted artist's needs",
          "independent resident and collaborator access",
          "Jamie signed the workflow communication"
        ],
        locator: "Protected acceptance workflow artifact.",
        confidence: "high",
        renderCitation: false
      }],
      boundaries: [
        "The projection describes a documented operating workflow, not an artist outcome.",
        "Do not publish the letter, identity, dates, location, access details, or private correspondence.",
        "Do not infer residency scale or universal practice from one acceptance template."
      ],
      antiClaims: [
        "the artist completed or publicly presented the residency",
        "every 196 residency used this exact workflow",
        "the artifact proves the number of resident artists",
        "the artist consented to public representation"
      ],
      researchInquiryIds: [],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Google Drive Shared Drive archival review"]
    },
    {
      id: "CLM-SUNDAY-DINNER-INVITATION-OPERATIONS-2025",
      project: "196-sunday-dinner",
      internalClaim: "Jamie used a structured operating sheet to coordinate recurring Sunday Dinner dates and themes, invitations, response status, attendance, and follow-up while keeping participant records private.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "case-study",
        text: "Jamie used a structured operating sheet to coordinate recurring Sunday Dinner invitations, responses, attendance, and follow-up while keeping participant records private.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/196-sunday-dinner"]
      }],
      evidence: [{
        sourceId: "SRC-SUNDAY-DINNER-OPERATIONS-SHEET-2025",
        relationship: "private-support",
        supports: [
          "standardized event date and theme fields",
          "invitation and response-status fields",
          "attendance and follow-up fields",
          "private participant and contact-data boundary",
          "Jamie's use of a structured recurring-gathering workflow"
        ],
        locator: "Protected operating-sheet schema; no participant rows retained.",
        confidence: "high",
        renderCitation: false
      }],
      boundaries: [
        "Only the workflow schema supports the public projection; participant-level values stay private.",
        "The claim does not establish gathering count, resident-artist count, attendance scale, or community impact.",
        "Private recordkeeping is not participant consent, endorsement, or permission to publish."
      ],
      antiClaims: [
        "the operating sheet is a public attendance database",
        "participants consented to public representation",
        "the sheet independently proves 300 or more gatherings",
        "the sheet independently proves 20 or more resident artists"
      ],
      researchInquiryIds: [],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Google Drive Shared Drive archival review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NYCAC-SAVE-JIMMYS-CORNER-DOCUMENTATION-CREDIT",
      project: "nyc-artist-coalition",
      question: "What rights, caption, represented-person permissions, public context, and creator credit can be established for the Save Jimmy's Corner documentation?",
      methods: ["Retain only generic visible facts.", "Seek a public event record and permissioned photographer or collaborator confirmation before any use."],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: ["A protected photo corpus and generic interview setting were recovered.", "No public credit-bearing source was recovered in the initial search."],
      limitations: ["Folder association is not authorship evidence.", "Rights, represented-person consent, exact caption, publication, and project role remain unresolved."],
      sourceIds: ["SRC-NYCAC-SAVE-JIMMYS-CORNER-PHOTO-LEAD-2026"],
      publicSummary: "A potentially useful documentation lead is preserved; all public-use and attribution questions remain open."
    },
    {
      id: "INQ-OPEN-DATA-WEEK-DOCUMENTATION-CREDIT",
      project: "open-data-week",
      question: "What public event context, creator credits, rights, represented-person permissions, and project role can be established for the Open Data Week visual assets?",
      methods: ["Retain only generic visual inventory metadata.", "Search public event records and seek permissioned creator or collaborator confirmation before any use."],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: ["A protected photo corpus and branded motion assets were recovered.", "No reliable public credit-bearing source was recovered in the initial search."],
      limitations: ["Folder custody is not authorship, commission, or role evidence.", "Rights, represented-person consent, caption, event context, method, reach, and impact remain unresolved."],
      sourceIds: ["SRC-OPEN-DATA-WEEK-DOCUMENTATION-LEAD-2026"],
      publicSummary: "The visual lead is preserved for research; no authorship or public-use claim is mature."
    },
    {
      id: "INQ-ACT-MIT-DOCUMENTATION-CREDIT",
      project: "act-mit",
      question: "What event context, creator credit, rights, represented-person permissions, and Jamie role can be established for the ACT at MIT documentation?",
      methods: ["Retain only generic visible facts.", "Search public institutional records and seek permissioned creator or collaborator confirmation before any use."],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: ["A protected public-stage photo corpus was recovered.", "No reliable public credit-bearing source was recovered in the initial search."],
      limitations: ["Institutional branding does not establish affiliation or endorsement.", "Authorship, Jamie's role, rights, identities, consent, audience, and outcome remain unresolved."],
      sourceIds: ["SRC-ACT-MIT-DOCUMENTATION-LEAD-2024"],
      publicSummary: "The visual lead is preserved for research; no event-role or public-use claim is mature."
    },
    {
      id: "INQ-WOWLIST-MEMBERS-MEETING-VIDEO-REVIEW",
      project: "wowlist",
      question: "Can a permissioned close reading of the WOW List members-meeting video support bounded claims about operating practice without exposing participants or private discussion?",
      methods: ["Obtain an appropriate permission and privacy boundary before transcription.", "Extract proposition-level notes with participant identities removed unless separately approved."],
      runAt: reviewedAt,
      resultStatus: "inconclusive",
      findings: ["A protected meeting-video lead was inventoried.", "No transcript-derived claim was created in this pass."],
      limitations: ["The video may contain private participant discussion.", "Existence alone does not establish attendance, decisions, Jamie's role, or outcomes."],
      sourceIds: ["SRC-WOWLIST-MEMBERS-MEETING-VIDEO-2015"],
      publicSummary: "A protected operating-history lead exists; permissioned review and claim extraction remain open."
    }
  ]
};
