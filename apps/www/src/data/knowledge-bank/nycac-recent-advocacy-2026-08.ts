const reviewedAt = "2026-08-13";

export const nycacRecentAdvocacyAugust2026 = {
  intakeItems: [
    {
      id: "INTAKE-NYCAC-RECENT-ADVOCACY-PUBLIC-SOURCES-2026-08",
      kind: "public-artifact",
      title: "July 2026 report and public release sources",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex governed source review",
      projectIds: ["fair-rent-nyc"],
      reason: "Connect the released report and public event record to a bounded account of Jamie's review and campaign participation.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-REPORT-2026",
        "SRC-ACTION-LAB-SBU-RELEASE-EVENT-2026-07-29",
        "SRC-SBU-REPORT-CAMPAIGN-POST-2026-08-11"
      ],
      observationIds: [
        "OBS-SBU-REPORT-ACKNOWLEDGEMENT-2026",
        "OBS-SBU-REPORT-METHOD-LIMITATIONS-2026",
        "OBS-SBU-PUBLIC-RELEASE-EVENT-2026",
        "OBS-SBU-CAMPAIGN-POST-2026"
      ],
      researchInquiryIds: [
        "INQ-NYCAC-SBU-PUBLIC-SPEAKING-CORROBORATION-2026",
        "INQ-NYCAC-SBU-PRESS-QUOTE-PUBLICATION-2026"
      ],
      boundaries: [
        "The report establishes review credit, not authorship, independent replication, legal approval, or ownership of its methods.",
        "The event page establishes the rally and report release, not a complete speaker roster or transcript."
      ]
    },
    {
      id: "INTAKE-NYCAC-RECENT-ADVOCACY-PROTECTED-BUNDLE-2026-08",
      kind: "analysis-note",
      title: "Thirty-day NYC Artist Coalition advocacy source return",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex governed archival review",
      projectIds: ["fair-rent-nyc"],
      reason: "Retain public-safe observations from authorized correspondence, Drive documents, report provenance, and authenticated public surfaces without publishing protected payloads.",
      visibility: "protected",
      disposition: "integrated",
      sourceIds: ["SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08"],
      observationIds: [
        "OBS-SBU-REPORT-EDITS-INCORPORATED-2026",
        "OBS-NYCAC-PRESS-REMARKS-SUPPLIED-2026",
        "OBS-NYCAC-SBU-RALLY-PARTICIPATION-2026",
        "OBS-NYCAC-MARTE-OFFICE-COORDINATION-2026",
        "OBS-NYCAC-GALLAGHER-OFFICE-COORDINATION-2026"
      ],
      researchInquiryIds: [
        "INQ-NYCAC-SBU-PUBLIC-SPEAKING-CORROBORATION-2026",
        "INQ-NYCAC-SBU-PRESS-QUOTE-PUBLICATION-2026"
      ],
      boundaries: [
        "No raw email, private contact detail, authenticated locator, report redline, tracked change, or meeting link enters the repository.",
        "A scheduled future meeting is not represented as having occurred.",
        "Direct staff coordination is not elected-official endorsement, institutional adoption, decision rights, or bill authorship."
      ]
    }
  ],

  observations: [
    {
      id: "OBS-SBU-REPORT-ACKNOWLEDGEMENT-2026",
      intakeId: "INTAKE-NYCAC-RECENT-ADVOCACY-PUBLIC-SOURCES-2026-08",
      sourceId: "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-REPORT-2026",
      project: "fair-rent-nyc",
      kind: "source-fact",
      text: "The released report names Mahin Rahman Tawrat as lead author and data analyst and credits Jamie Burkart, identified as an NYC Artist Coalition member participating in Fair Rent NYC, for a thoughtful and careful review of the draft report.",
      locator: "Public report acknowledgements",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SBU-REPORT-REVIEW-2026"],
      researchInquiryIds: [],
      limitations: [
        "Acknowledgement language establishes review credit but not the full edit history, authorship, methods ownership, or independent validation."
      ]
    },
    {
      id: "OBS-SBU-REPORT-METHOD-LIMITATIONS-2026",
      intakeId: "INTAKE-NYCAC-RECENT-ADVOCACY-PUBLIC-SOURCES-2026-08",
      sourceId: "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-REPORT-2026",
      project: "fair-rent-nyc",
      kind: "source-fact",
      text: "The final methodology names owner-reporting, coverage, missing-value, aggregation, and nominal-rent limitations and says the analysis cannot establish individual closure causes, landlord motive, financing behavior, or causation.",
      locator: "Public report methodology and limitations",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SBU-REPORT-REVIEW-2026"],
      researchInquiryIds: [],
      limitations: [
        "Alignment between final wording and a protected review concern is not, by itself, proof that a specific edit was adopted from Jamie."
      ]
    },
    {
      id: "OBS-SBU-PUBLIC-RELEASE-EVENT-2026",
      intakeId: "INTAKE-NYCAC-RECENT-ADVOCACY-PUBLIC-SOURCES-2026-08",
      sourceId: "SRC-ACTION-LAB-SBU-RELEASE-EVENT-2026-07-29",
      project: "fair-rent-nyc",
      kind: "source-fact",
      text: "The Action Lab public event record identifies a July 29, 2026 rally and press conference marking the release of Empty Storefronts, High Rents and advocacy for the Small Business Rent Stabilization Act.",
      locator: "Public event page",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SBU-RALLY-SPEAKING-2026"],
      researchInquiryIds: ["INQ-NYCAC-SBU-PUBLIC-SPEAKING-CORROBORATION-2026"],
      limitations: [
        "The page does not publish a complete speaker roster, named Jamie transcript, or report of his delivered remarks.",
        "The live page retains an address discrepancy and city-leader wording even though the named legislation is a state bill."
      ]
    },
    {
      id: "OBS-SBU-CAMPAIGN-POST-2026",
      intakeId: "INTAKE-NYCAC-RECENT-ADVOCACY-PUBLIC-SOURCES-2026-08",
      sourceId: "SRC-SBU-REPORT-CAMPAIGN-POST-2026-08-11",
      project: "fair-rent-nyc",
      kind: "source-fact",
      text: "An August campaign carousel publicly promoted the report and state legislation with rally photographs, but did not provide a named Jamie speaking record or transcript.",
      locator: "Public institutional social post",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SBU-RALLY-SPEAKING-2026"],
      researchInquiryIds: [
        "INQ-NYCAC-SBU-PUBLIC-SPEAKING-CORROBORATION-2026",
        "INQ-NYCAC-SBU-PRESS-QUOTE-PUBLICATION-2026"
      ],
      limitations: [
        "Photographs do not identify every depicted person or establish rights to republish the images.",
        "The post does not establish whether Jamie's supplied press quote was published."
      ]
    },
    {
      id: "OBS-SBU-REPORT-EDITS-INCORPORATED-2026",
      intakeId: "INTAKE-NYCAC-RECENT-ADVOCACY-PROTECTED-BUNDLE-2026-08",
      sourceId: "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08",
      comparisonSourceIds: ["SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-REPORT-2026"],
      project: "fair-rent-nyc",
      kind: "bounded-inference",
      text: "Contemporaneous protected correspondence says many of Jamie's detailed review edits were incorporated; the public report later credits his review and contains explicit causal-scope and methods limitations.",
      locator: "Public-safe synthesis; protected correspondence withheld",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SBU-REPORT-REVIEW-2026"],
      researchInquiryIds: [],
      limitations: [
        "The source does not enumerate every accepted edit or support a defensible contribution percentage.",
        "Jamie explicitly did not rerun the underlying analysis."
      ]
    },
    {
      id: "OBS-NYCAC-PRESS-REMARKS-SUPPLIED-2026",
      intakeId: "INTAKE-NYCAC-RECENT-ADVOCACY-PROTECTED-BUNDLE-2026-08",
      sourceId: "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08",
      project: "fair-rent-nyc",
      kind: "source-fact",
      text: "Jamie supplied organizers with a press-release quote and a two-minute cultural-space statement that kept the report's descriptive finding separate from motive or causal claims.",
      locator: "Metadata-minimized correspondence review",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-PRESS-REMARKS-PREPARATION-2026"],
      researchInquiryIds: ["INQ-NYCAC-SBU-PRESS-QUOTE-PUBLICATION-2026"],
      limitations: [
        "Supplying remarks does not establish verbatim delivery, publication, pickup by a press outlet, or quoted coverage."
      ]
    },
    {
      id: "OBS-NYCAC-SBU-RALLY-PARTICIPATION-2026",
      intakeId: "INTAKE-NYCAC-RECENT-ADVOCACY-PROTECTED-BUNDLE-2026-08",
      sourceId: "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08",
      comparisonSourceIds: ["SRC-ACTION-LAB-SBU-RELEASE-EVENT-2026-07-29"],
      project: "fair-rent-nyc",
      kind: "participant-memory",
      text: "A contemporaneous first-person post-event record says Jamie attended the July 29 event in person after receiving a two-minute speaking slot and supplying final remarks.",
      locator: "Participant-attested synthesis; protected correspondence withheld",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SBU-RALLY-SPEAKING-2026"],
      researchInquiryIds: ["INQ-NYCAC-SBU-PUBLIC-SPEAKING-CORROBORATION-2026"],
      limitations: [
        "The bounded public search did not recover a named transcript, caption, press article, or organizer record independently confirming what Jamie delivered."
      ]
    },
    {
      id: "OBS-NYCAC-MARTE-OFFICE-COORDINATION-2026",
      intakeId: "INTAKE-NYCAC-RECENT-ADVOCACY-PROTECTED-BUNDLE-2026-08",
      sourceId: "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08",
      project: "fair-rent-nyc",
      kind: "source-fact",
      text: "Jamie directly coordinated event logistics with Council Member Christopher Marte's staff, identified himself as a speaker rather than organizer, and routed organizers and office staff together for confirmation and briefing follow-up.",
      locator: "Metadata-minimized correspondence review",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-ELECTED-OFFICE-COORDINATION-2026"],
      researchInquiryIds: [],
      limitations: [
        "The exchange establishes staff coordination, not the Council Member's attendance, endorsement, office adoption, or Jamie's authority over the event."
      ]
    },
    {
      id: "OBS-NYCAC-GALLAGHER-OFFICE-COORDINATION-2026",
      intakeId: "INTAKE-NYCAC-RECENT-ADVOCACY-PROTECTED-BUNDLE-2026-08",
      sourceId: "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08",
      project: "fair-rent-nyc",
      kind: "source-fact",
      text: "After a direct call, Assemblymember Emily Gallagher's deputy chief of staff thanked Jamie for his work and context, proposed a recurring coordination meeting with Jamie and an organizing partner, and scheduled a first future date.",
      locator: "Metadata-minimized correspondence review",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-ELECTED-OFFICE-COORDINATION-2026"],
      researchInquiryIds: [],
      limitations: [
        "The scheduled future meeting had not occurred inside the review window.",
        "Thanks and a proposed coordination cadence are not endorsement, delegation, decision rights, bill authorship, or institutional adoption."
      ]
    }
  ],

  sources: [
    {
      id: "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-REPORT-2026",
      title: "Empty Storefronts, High Rents",
      organization: "Small Business United, The Action Lab, Main Street Alliance, and Small Business Majority",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-07-29",
      accessedAt: reviewedAt,
      canonicalUrl: "https://smallbizunited.com/reports/260728_SBU_FinalReport.pdf",
      preferredPublicUrl: "canonical",
      publicCitation: "Small Business United et al., Empty Storefronts, High Rents: Why New York City Needs Commercial Rent Stabilization, July 2026.",
      publicNote: "The report's acknowledgements identify the lead author/data analyst, other contributors, and Jamie's bounded draft-review credit.",
      supportsGenerally: [
        "report publication",
        "lead authorship and data-analysis credit",
        "Jamie's draft-review acknowledgement",
        "methods and limitations wording",
        "state bill recommendations"
      ],
      doesNotEstablish: [
        "Jamie as author or co-author",
        "Jamie as methods owner",
        "independent replication",
        "legal approval",
        "a complete edit-by-edit provenance"
      ]
    },
    {
      id: "SRC-ACTION-LAB-SBU-RELEASE-EVENT-2026-07-29",
      title: "Join Small Business United for the release of Empty Storefronts, High Rents",
      organization: "The Action Lab",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-07-29",
      accessedAt: reviewedAt,
      canonicalUrl: "https://actionlabny.org/events/small-business-united-rally",
      preferredPublicUrl: "canonical",
      publicCitation: "The Action Lab, July 29, 2026 rally and press-conference event page for the release of Empty Storefronts, High Rents.",
      publicNote: "The page establishes the event and purpose but not a complete named speaker population.",
      supportsGenerally: [
        "event date",
        "rally and press-conference format",
        "report release",
        "Small Business Rent Stabilization Act advocacy"
      ],
      doesNotEstablish: [
        "complete speaker roster",
        "Jamie's delivered words",
        "named press pickup",
        "attendance by every scheduled official"
      ]
    },
    {
      id: "SRC-SBU-REPORT-CAMPAIGN-POST-2026-08-11",
      title: "Small Business United report campaign carousel",
      organization: "The Action Lab",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2026-08-11",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.instagram.com/actionlabny/p/Db59xHUDq5v/",
      preferredPublicUrl: "canonical",
      publicCitation: "The Action Lab, Small Business United report and Small Business Rent Stabilization Act campaign carousel, August 11, 2026.",
      publicNote: "The post supplies public campaign context and rally imagery without a named Jamie statement.",
      supportsGenerally: [
        "public report campaign",
        "state-legislation call to action",
        "public rally visual context"
      ],
      doesNotEstablish: [
        "Jamie as a depicted or quoted speaker",
        "publication of Jamie's supplied press quote",
        "rights to republish the carousel",
        "a complete event record"
      ],
      media: {
        mediaKind: "graphic",
        rightsStatus: "permission-needed",
        consentStatus: "review-needed",
        publicDisplayStatus: "metadata-only"
      }
    },
    {
      id: "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08",
      title: "Governed NYC Artist Coalition advocacy source return, July 15-August 13, 2026",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: reviewedAt,
      publicCitation: "Governed review of authorized advocacy correspondence, documents, attachments, public pages, and authenticated social surfaces, July 15-August 13, 2026.",
      publicNote: "Only source-class descriptions, bounded findings, public URLs, and protected locator identifiers enter this repository.",
      protectedLocatorId: "RESEARCH-NYCAC-RECENT-ADVOCACY-2026-08",
      supportsGenerally: [
        "review incorporation acknowledgement",
        "prepared press quote and remarks",
        "participant-attested event participation",
        "direct elected-office staff coordination",
        "future meeting status",
        "source-gap findings"
      ],
      doesNotEstablish: [
        "publication permission for correspondence",
        "elected-official endorsement",
        "institutional adoption",
        "bill authorship",
        "a public transcript",
        "press pickup",
        "that a scheduled future meeting occurred"
      ]
    }
  ],

  claims: [
    {
      id: "CLM-NYCAC-SBU-REPORT-REVIEW-2026",
      project: "fair-rent-nyc",
      internalClaim: "Jamie performed a bounded pre-publication review of Empty Storefronts, High Rents focused on factual accuracy, source and methods clarity, causal scope, legislative accuracy, accessibility, attribution, and release hygiene; organizers said many edits were incorporated, and the public report credits his thoughtful and careful review.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text: "The published Empty Storefronts, High Rents report credits Jamie Burkart for a thoughtful and careful review of the draft; protected provenance records that many review edits were incorporated.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-REPORT-2026",
          relationship: "direct-support",
          supports: ["public report credit", "lead-author boundary", "final methods limitations"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08",
          relationship: "private-support",
          supports: ["review scope", "many edits incorporated", "no independent replication"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Describe the contribution as bounded pre-publication review, not authorship, co-authorship, methods ownership, independent validation, or legal review.",
        "Do not assign a contribution percentage or claim every proposed edit was adopted.",
        "Keep the publishers, lead author/data analyst, other contributors, and coalition field visible."
      ],
      antiClaims: [
        "Jamie authored or co-authored the report",
        "Jamie independently validated or reran the methods",
        "Jamie provided legal approval",
        "Every review edit was adopted",
        "Jamie alone caused the report's final quality or publication"
      ],
      researchInquiryIds: [],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex governed archival review"]
    },
    {
      id: "CLM-NYCAC-PRESS-REMARKS-PREPARATION-2026",
      project: "fair-rent-nyc",
      internalClaim: "Jamie prepared and supplied a press-release quote and two-minute cultural-space remarks for the July 29 report-release event, calibrating the report claim and explaining commercial rent stabilization for cultural and neighborhood continuity.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text: "Jamie prepared a cultural-space statement and press quote for the July 29 report-release event.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08",
          relationship: "private-support",
          supports: ["prepared quote", "prepared remarks", "calibrated report framing"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Preparation and organizer delivery do not establish press publication, pickup, quotation, or verbatim public delivery."
      ],
      antiClaims: [
        "A press outlet published Jamie's quote",
        "The supplied remarks were delivered verbatim",
        "Jamie spoke on behalf of every campaign partner"
      ],
      researchInquiryIds: ["INQ-NYCAC-SBU-PRESS-QUOTE-PUBLICATION-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex governed archival review"]
    },
    {
      id: "CLM-NYCAC-SBU-RALLY-SPEAKING-2026",
      project: "fair-rent-nyc",
      internalClaim: "A public event record, scheduled speaking slot, supplied final remarks, and contemporaneous participant-attested post-event correspondence support that Jamie participated in person at the July 29 report-release rally; a named public transcript or press record of his delivered words has not been recovered.",
      status: "use-with-care",
      projections: [
        {
          key: "archive-note",
          text: "Participant-attested records support Jamie's in-person participation in the July 29 report-release rally; named public delivery evidence remains unrecovered.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-ACTION-LAB-SBU-RELEASE-EVENT-2026-07-29",
          relationship: "context",
          supports: ["public event identity", "date", "purpose"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08",
          relationship: "private-support",
          supports: ["speaking slot", "supplied remarks", "participant-attested attendance"],
          confidence: "moderate",
          renderCitation: false
        }
      ],
      boundaries: [
        "Keep scheduled role, attendance, participant attestation, delivered speech, public transcript, and press pickup distinct.",
        "Do not identify people in rally photographs without a separate reliable source."
      ],
      antiClaims: [
        "A named public transcript of Jamie's July 29 remarks has been recovered",
        "A press outlet quoted Jamie",
        "Every prepared line was delivered verbatim",
        "Every scheduled elected official attended"
      ],
      researchInquiryIds: ["INQ-NYCAC-SBU-PUBLIC-SPEAKING-CORROBORATION-2026"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex governed archival review"]
    },
    {
      id: "CLM-NYCAC-ELECTED-OFFICE-COORDINATION-2026",
      project: "fair-rent-nyc",
      internalClaim: "Within the review window Jamie directly coordinated with staff in Council Member Christopher Marte's office on event logistics and with Assemblymember Emily Gallagher's deputy chief of staff on bill context and a proposed recurring coordination cadence.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text: "Jamie directly coordinated with City Council and State Assembly office staff on report-event logistics, bill context, and a proposed recurring coordination lane.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: [
        {
          sourceId: "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08",
          relationship: "private-support",
          supports: ["direct staff interaction", "city-office logistics", "state-office bill context", "future meeting status"],
          confidence: "high",
          renderCitation: false
        }
      ],
      boundaries: [
        "Name the offices and staff roles only as needed; do not publish contact details or raw correspondence.",
        "A scheduled future meeting is not an occurred meeting.",
        "Coordination and appreciation do not establish elected-official endorsement, institutional adoption, delegated authority, or decision rights."
      ],
      antiClaims: [
        "Council Member Marte or Assemblymember Gallagher endorsed Jamie",
        "The offices adopted Jamie's recommendations",
        "Jamie authored the state legislation",
        "The scheduled August coordination meeting already occurred",
        "Jamie holds campaign or government decision rights"
      ],
      researchInquiryIds: [],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex governed archival review"]
    }
  ],

  entities: [
    {
      id: "ENT-SBU-EMPTY-STOREFRONTS-REPORT-2026",
      name: "Empty Storefronts, High Rents",
      kind: "project",
      aliases: [],
      publicSafe: true
    },
    {
      id: "ENT-SBU-REPORT-RELEASE-RALLY-2026",
      name: "Small Business United report-release rally and press conference",
      kind: "event",
      aliases: [],
      publicSafe: true
    },
    {
      id: "ENT-SBRSA-2026",
      name: "Small Business Rent Stabilization Act",
      kind: "policy",
      aliases: ["A5568A", "S8319", "Commercial Rent Stabilization"],
      publicSafe: true
    },
    {
      id: "ENT-OFFICE-CHRISTOPHER-MARTE",
      name: "Office of Council Member Christopher Marte",
      kind: "public-institution",
      aliases: [],
      publicSafe: true
    },
    {
      id: "ENT-OFFICE-EMILY-GALLAGHER",
      name: "Office of Assemblymember Emily Gallagher",
      kind: "public-institution",
      aliases: [],
      publicSafe: true
    }
  ],

  agencyRelations: [
    {
      id: "REL-JAMIE-SBU-REPORT-REVIEW-2026",
      project: "fair-rent-nyc",
      actorIds: ["ENT-JAMIE-BURKART"],
      action: "reviewed",
      objectId: "ENT-SBU-EMPTY-STOREFRONTS-REPORT-2026",
      purpose: "Reduce factual, methodological, legislative, attribution, accessibility, and release risk before publication.",
      result: "The published report credits Jamie's thoughtful and careful review, and protected provenance records that many edits were incorporated.",
      creditScope: "shared",
      status: "confirmed-with-boundary",
      claimIds: ["CLM-NYCAC-SBU-REPORT-REVIEW-2026"],
      sourceIds: [
        "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-REPORT-2026",
        "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08"
      ],
      sourceSupportKeys: [
        "public review acknowledgement",
        "many review edits incorporated",
        "independent replication explicitly excluded"
      ],
      boundaries: [
        "Review credit does not establish authorship, methods ownership, legal approval, independent replication, or sole causation."
      ],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex governed archival review"]
    },
    {
      id: "REL-JAMIE-SBU-RALLY-SPEAKING-2026",
      project: "fair-rent-nyc",
      actorIds: ["ENT-JAMIE-BURKART"],
      action: "spoke-at",
      objectId: "ENT-SBU-REPORT-RELEASE-RALLY-2026",
      purpose: "Connect cultural-space continuity to commercial-rent protections at the report release.",
      result: "A public event record plus participant-attested evidence supports in-person participation after a scheduled speaking slot and supplied remarks; named public delivery evidence remains unrecovered.",
      creditScope: "individual",
      status: "use-with-care",
      claimIds: ["CLM-NYCAC-SBU-RALLY-SPEAKING-2026"],
      sourceIds: [
        "SRC-ACTION-LAB-SBU-RELEASE-EVENT-2026-07-29",
        "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08"
      ],
      sourceSupportKeys: [
        "public event identity",
        "scheduled two-minute role",
        "participant-attested in-person participation"
      ],
      boundaries: [
        "No named public transcript, caption, press quotation, or organizer publication of Jamie's delivered words was recovered."
      ],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex governed archival review"]
    },
    {
      id: "REL-JAMIE-MARTE-OFFICE-COORDINATION-2026",
      project: "fair-rent-nyc",
      actorIds: ["ENT-JAMIE-BURKART"],
      action: "coordinated-with",
      objectId: "ENT-OFFICE-CHRISTOPHER-MARTE",
      purpose: "Route accurate report-release logistics between organizers and an elected office.",
      result: "Office staff relayed Jamie's event details internally and added a senior staff route while Jamie preserved his bounded speaker-not-organizer role.",
      creditScope: "shared",
      status: "confirmed-with-boundary",
      claimIds: ["CLM-NYCAC-ELECTED-OFFICE-COORDINATION-2026"],
      sourceIds: ["SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08"],
      sourceSupportKeys: ["direct staff coordination", "speaker-not-organizer boundary"],
      boundaries: [
        "The exchange does not establish Council Member attendance, endorsement, office adoption, or Jamie's event authority."
      ],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex governed archival review"]
    },
    {
      id: "REL-JAMIE-GALLAGHER-OFFICE-COORDINATION-2026",
      project: "fair-rent-nyc",
      actorIds: ["ENT-JAMIE-BURKART"],
      action: "coordinated-with",
      objectId: "ENT-OFFICE-EMILY-GALLAGHER",
      purpose: "Share legislative provenance and campaign context while building a recurring coordination lane.",
      result: "After a direct call, the deputy chief of staff proposed a recurring meeting and scheduled a first future date with Jamie and an organizing partner.",
      creditScope: "shared",
      status: "confirmed-with-boundary",
      claimIds: ["CLM-NYCAC-ELECTED-OFFICE-COORDINATION-2026"],
      sourceIds: ["SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08"],
      sourceSupportKeys: ["direct call", "context acknowledged", "future coordination proposed"],
      boundaries: [
        "The future meeting had not occurred inside the review window, and the exchange does not establish endorsement, adoption, bill authorship, or decision rights."
      ],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex governed archival review"]
    }
  ],

  researchInquiries: [
    {
      id: "INQ-NYCAC-SBU-PUBLIC-SPEAKING-CORROBORATION-2026",
      project: "fair-rent-nyc",
      question: "Can a named public transcript, organizer caption, press clip, or other public source independently corroborate Jamie's July 29 delivered remarks?",
      methods: [
        "Reviewed the organizer's public event page and report-release campaign post.",
        "Searched the public web for Jamie's name with the report, event, and legislation.",
        "Compared the public sources with metadata-minimized participant-attested records."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "The public event and campaign context are recovered.",
        "Protected records support a scheduled speaking slot, supplied remarks, and in-person participation.",
        "No named public transcript, caption, press article, or organizer statement of Jamie's delivered words was recovered."
      ],
      limitations: [
        "Search-engine non-recovery is not proof that no clip or coverage exists.",
        "Rally photographs cannot identify Jamie without a separate reliable source.",
        "Participant attestation remains distinct from public corroboration."
      ],
      sourceIds: [
        "SRC-ACTION-LAB-SBU-RELEASE-EVENT-2026-07-29",
        "SRC-SBU-REPORT-CAMPAIGN-POST-2026-08-11",
        "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08"
      ],
      publicSummary: "The July 29 public event is verified and participant-attested records support Jamie's in-person role, while a named public record of his delivered remarks remains unrecovered.",
      protectedLocatorId: "RESEARCH-NYCAC-SBU-PUBLIC-SPEAKING-2026"
    },
    {
      id: "INQ-NYCAC-SBU-PRESS-QUOTE-PUBLICATION-2026",
      project: "fair-rent-nyc",
      question: "Was Jamie's supplied press-release quote published or used in public coverage of the July 29 report release?",
      methods: [
        "Reviewed the final report, organizer event page, public campaign post, and bounded web-search results.",
        "Kept supplied wording, organizer receipt, public delivery, press publication, and publisher quotation as distinct evidence states."
      ],
      runAt: reviewedAt,
      resultStatus: "not-recovered",
      findings: [
        "Protected records establish that a press-release quote was supplied to organizers.",
        "No public release, press article, or public post using Jamie's supplied quote was recovered."
      ],
      limitations: [
        "The bounded public search may not cover broadcast segments, unindexed newsletters, removed posts, or private media lists.",
        "Non-recovery is not proof the quote was never used."
      ],
      sourceIds: [
        "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-REPORT-2026",
        "SRC-ACTION-LAB-SBU-RELEASE-EVENT-2026-07-29",
        "SRC-SBU-REPORT-CAMPAIGN-POST-2026-08-11",
        "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08"
      ],
      publicSummary: "Jamie supplied a press-release quote, but no public source using it was recovered in the bounded review.",
      protectedLocatorId: "RESEARCH-NYCAC-SBU-PRESS-QUOTE-2026"
    }
  ]
};
