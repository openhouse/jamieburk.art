const reviewedAt = "2026-08-13";

export const participationImagesAugust2026 = {
  intakeItems: [
    {
      id: "INTAKE-NYCAC-PARTICIPATION-IMAGES-2026",
      kind: "photo-lead",
      title: "NYC Artist Coalition participation image sequence",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex photo-editor review",
      projectIds: ["nyc-artist-coalition", "let-nyc-dance", "save-nyc-spaces"],
      reason:
        "Compose an inspectable relationship among coalition facilitation, shared campaign infrastructure, and public participation without treating photographs as self-interpreting outcome proof.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        "SRC-NYCAC-SHOESTRING-PHOTO-2017",
        "SRC-NYCAC-MARKET-HOTEL-BANNER-PHOTO-2017",
        "SRC-JAMIE-NYCAC-SHOESTRING-ACCOUNT-2026"
      ],
      observationIds: [
        "OBS-NYCAC-SHOESTRING-VISUAL-2017",
        "OBS-NYCAC-MARKET-HOTEL-VISUAL-2017"
      ],
      researchInquiryIds: ["INQ-NYCAC-PARTICIPATION-IMAGE-SEQUENCE-2026"],
      boundaries: [
        "Public derivatives use neutral filenames and contain no private People tags, archive identifiers, original filenames, or location coordinates.",
        "The photographs do not establish exact remarks, every participant's role, attendance count, endorsement, legislative causation, or Jamie's sole credit.",
        "Album-scoped publication direction does not erase creator credit, caption review, dignity review, destination review, revocation, or exact-candidate production approval."
      ]
    },
    {
      id: "INTAKE-WOWLIST-PUBLIC-THRESHOLD-2026",
      kind: "public-url",
      title: "WOW List public return threshold",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex public-surface review",
      projectIds: ["wowlist"],
      reason:
        "Replace stale historical-only portfolio wording with the current, bounded state of the live landing and About pages.",
      sourceUrl: "https://wowlist.org/",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-WOWLIST-PUBLIC-THRESHOLD-2026"],
      observationIds: ["OBS-WOWLIST-PUBLIC-THRESHOLD-2026"],
      researchInquiryIds: [],
      boundaries: [
        "The public threshold is not the restored community calendar, a member service, a launch date, or evidence of current adoption.",
        "The inspected response was noindex and invited people to opt into testing."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-NYCAC-SHOESTRING-VISUAL-2017",
      intakeId: "INTAKE-NYCAC-PARTICIPATION-IMAGES-2026",
      sourceId: "SRC-NYCAC-SHOESTRING-PHOTO-2017",
      comparisonSourceIds: ["SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026"],
      project: "let-nyc-dance",
      kind: "visual-observation",
      text:
        "A July 24, 2017 photograph shows Jamie from behind, crouched at the center of a Shoestring Press garden discussion while participants face shared handwritten notes resting on a low grill.",
      locator: "Public portfolio derivative and public-safe source capsule.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SHARED-CAMPAIGN-INFRASTRUCTURE-2017"],
      researchInquiryIds: [],
      limitations: [
        "The image does not preserve exact remarks or prove what decisions the group made.",
        "Visible attention does not establish agreement, endorsement, or later action by each represented person."
      ]
    },
    {
      id: "OBS-NYCAC-SHOESTRING-RECOLLECTION-2026",
      intakeId: "INTAKE-NYCAC-PARTICIPATION-IMAGES-2026",
      sourceId: "SRC-JAMIE-NYCAC-SHOESTRING-ACCOUNT-2026",
      comparisonSourceIds: [
        "SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE",
        "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026"
      ],
      project: "let-nyc-dance",
      kind: "participant-memory",
      text:
        "Jamie recalls facilitating the Shoestring Press session and remembers it as the point when participating advocacy groups aligned around one Let NYC Dance site and one email list.",
      locator: "Dated first-person account summarized without private correspondence or archive metadata.",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-SHARED-CAMPAIGN-INFRASTRUCTURE-2017"],
      researchInquiryIds: [],
      limitations: [
        "The meeting decision is retained as Jamie's first-person recollection, not as independently recovered minutes or collaborator testimony.",
        "Repository histories support Jamie's implementation role but do not independently establish the exact meeting agreement."
      ]
    },
    {
      id: "OBS-NYCAC-MARKET-HOTEL-VISUAL-2017",
      intakeId: "INTAKE-NYCAC-PARTICIPATION-IMAGES-2026",
      sourceId: "SRC-NYCAC-MARKET-HOTEL-BANNER-PHOTO-2017",
      comparisonSourceIds: ["SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12"],
      project: "save-nyc-spaces",
      kind: "visual-observation",
      text:
        "An October 11, 2017 photograph shows organizers, artists, and public officials holding a hand-painted Save NYC Spaces and NYC Artist Coalition banner in front of a packed Market Hotel room.",
      locator: "Public portfolio derivative and public-safe source capsule.",
      status: "verified",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: [],
      limitations: [
        "The image does not establish an attendance count, every depicted identity, exact remarks, endorsement, or policy causation.",
        "The caption describes a collective room rather than assigning the event or its outcome to Jamie alone."
      ]
    },
    {
      id: "OBS-NYCAC-PORTFOLIO-ALBUM-AUTHORIZATION-2026",
      intakeId: "INTAKE-NYCAC-PARTICIPATION-IMAGES-2026",
      sourceId: "SRC-JAMIE-NYCAC-SHOESTRING-ACCOUNT-2026",
      comparisonSourceIds: [],
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text:
        "Jamie authorized portfolio publication of photographs in the designated Apple Photos portfolio album and specifically requested curatorial use of the Shoestring Press and Market Hotel frames while retaining the existing homepage hero.",
      locator: "Dated public-safe authorization capsule; album identifiers and private metadata withheld.",
      status: "verified",
      publicSafe: true,
      claimIds: [],
      researchInquiryIds: [],
      limitations: [
        "The authorization is destination-bound to Jamie's portfolio and does not publish or authorize raw Apple Photos metadata.",
        "Known photographers still require visible credit, and exact-candidate production publication remains a separate human gate."
      ]
    },
    {
      id: "OBS-WOWLIST-PUBLIC-THRESHOLD-2026",
      intakeId: "INTAKE-WOWLIST-PUBLIC-THRESHOLD-2026",
      sourceId: "SRC-WOWLIST-PUBLIC-THRESHOLD-2026",
      comparisonSourceIds: [],
      project: "wowlist",
      kind: "source-fact",
      text:
        "On August 13, 2026, wowlist.org served a recognizable landing page, an About page, and a consented tester-interest invitation while response headers kept the public threshold noindex.",
      locator: "Public homepage, About page, and response headers inspected August 13, 2026.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-WOWLIST-PUBLIC-THRESHOLD-2026"],
      researchInquiryIds: [],
      limitations: [
        "The threshold is not the restored community calendar and does not establish active membership, current adoption, or a completed relaunch.",
        "No private introduction corpus, historical member data, or protected source locator was inspected through the public application."
      ]
    }
  ],
  sources: [
    {
      id: "SRC-NYCAC-SHOESTRING-PHOTO-2017",
      title: "Shoestring Press coalition working-session photograph",
      organization: "NYC Artist Coalition archive",
      author: "Paul Mossine",
      kind: "participant-photograph",
      visibility: "public",
      preservationStatus: "private",
      publishedAt: "2017-07-24",
      accessedAt: reviewedAt,
      publicCitation:
        "Paul Mossine, photograph of a July 24, 2017 NYC Artist Coalition working session at Shoestring Press; portfolio use authorized by Jamie Burkart.",
      publicNote:
        "The metadata-stripped portfolio derivative excludes private archive identifiers, People tags, and location coordinates.",
      supportsGenerally: [
        "capture date",
        "Shoestring Press working-session context",
        "Jamie's facilitation with shared visual notes",
        "Paul Mossine creator credit"
      ],
      doesNotEstablish: ["exact remarks", "meeting decisions", "endorsement", "policy causation"],
      media: {
        mediaKind: "photograph",
        photographer: "Paul Mossine",
        rightsStatus: "cleared",
        consentStatus: "cleared",
        publicDisplayStatus: "cleared",
        visibleText: ["ESPINAL"],
        captureTimestamp: "2017-07-24",
        timestampConfidence: "high"
      }
    },
    {
      id: "SRC-NYCAC-MARKET-HOTEL-BANNER-PHOTO-2017",
      title: "Market Hotel Save NYC Spaces banner photograph",
      organization: "NYC Artist Coalition archive",
      author: "Paul Mossine",
      kind: "participant-photograph",
      visibility: "public",
      preservationStatus: "private",
      publishedAt: "2017-10-11",
      accessedAt: reviewedAt,
      publicCitation:
        "Paul Mossine, photograph of the October 11, 2017 Save NYC Spaces town hall at Market Hotel; portfolio use authorized by Jamie Burkart.",
      publicNote:
        "The metadata-stripped portfolio derivative excludes private archive identifiers and People tags.",
      supportsGenerally: [
        "capture date",
        "Market Hotel setting",
        "Save NYC Spaces and NYC Artist Coalition banner",
        "collective public-room context",
        "Paul Mossine creator credit"
      ],
      doesNotEstablish: ["attendance count", "every depicted identity", "endorsement", "policy causation"],
      media: {
        mediaKind: "photograph",
        photographer: "Paul Mossine",
        rightsStatus: "cleared",
        consentStatus: "cleared",
        publicDisplayStatus: "cleared",
        visibleText: ["SAVE NYC SPACES", "NYC ARTIST COALITION"],
        captureTimestamp: "2017-10-11",
        timestampConfidence: "high"
      }
    },
    {
      id: "SRC-JAMIE-NYCAC-SHOESTRING-ACCOUNT-2026",
      title: "Jamie Burkart public-safe Shoestring Press account and portfolio authorization",
      kind: "research-run",
      visibility: "public",
      preservationStatus: "private",
      capturedAt: reviewedAt,
      publicCitation:
        "Jamie Burkart first-person account and portfolio-use authorization, August 13, 2026.",
      publicNote:
        "The capsule records Jamie's recollection and authorization boundaries without correspondence, Apple Photos identifiers, People tags, or location coordinates.",
      supportsGenerally: [
        "Jamie's facilitation account",
        "Jamie's recollection of shared site and email-list alignment",
        "portfolio-album publication authorization",
        "instruction to retain the existing homepage hero"
      ],
      doesNotEstablish: [
        "independent collaborator corroboration of the meeting agreement",
        "permission for other destinations",
        "permission to expose private metadata",
        "sole authorship or causation"
      ]
    },
    {
      id: "SRC-WOWLIST-PUBLIC-THRESHOLD-2026",
      title: "WOW List public landing and About threshold",
      organization: "WOW List",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://wowlist.org/",
      preferredPublicUrl: "canonical",
      publicCitation:
        "WOW List public landing and About pages, with tester-interest invitation, accessed August 13, 2026.",
      publicNote:
        "The inspected surface was deliberately small and noindex; it did not expose a restored calendar or private historical corpus.",
      supportsGenerally: [
        "recognizable public landing page",
        "public About page",
        "consented tester-interest invitation",
        "noindex public threshold"
      ],
      doesNotEstablish: ["restored calendar", "active membership", "current adoption", "completed relaunch"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NYCAC-PARTICIPATION-IMAGE-SEQUENCE-2026",
      project: "let-nyc-dance",
      question:
        "Can additional public records or collaborator accounts independently establish the Shoestring Press meeting agreement without exposing private coalition notes?",
      methods: [
        "Compared direct visual observations with the public Facebook-event census and retained campaign repository histories.",
        "Separated Jamie's first-person recollection from facts independently established by photographs and repositories."
      ],
      runAt: reviewedAt,
      sourceIds: [
        "SRC-NYCAC-SHOESTRING-PHOTO-2017",
        "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
        "SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE"
      ],
      resultStatus: "partially-recovered",
      findings: [
        "The photograph establishes the Shoestring Press setting and visible facilitation.",
        "Repository histories establish Jamie's implementation role.",
        "The exact agreement remains a bounded first-person recollection."
      ],
      limitations: [
        "The photograph supports the setting and visible facilitation, not the exact decision.",
        "Repository histories support Jamie's implementation role, not the meeting agreement.",
        "No public meeting minutes or collaborator account establishing the exact agreement has been recovered."
      ],
      publicSummary:
        "The visual setting and implementation history are corroborated; the exact meeting agreement remains attributed to Jamie's first-person recollection."
    }
  ],
  claims: [
    {
      id: "CLM-NYCAC-SHARED-CAMPAIGN-INFRASTRUCTURE-2017",
      project: "let-nyc-dance",
      internalClaim:
        "Jamie recalls facilitating the July 2017 Shoestring Press session where participating advocacy groups aligned around one Let NYC Dance site and one email list; repository histories independently establish his web implementation role but not the exact meeting agreement.",
      status: "use-with-care",
      projections: [
        {
          key: "case-study",
          text:
            "Jamie recalls that at a July 2017 coalition meeting at Shoestring Press, participating groups aligned around a shared Let NYC Dance site and email list. Retained repository histories separately establish his implementation and maintenance of the campaign web infrastructure.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-JAMIE-NYCAC-SHOESTRING-ACCOUNT-2026",
          relationship: "private-support",
          supports: ["Jamie's facilitation account", "Jamie's recollection of shared infrastructure alignment"],
          publicNote: "First-person recollection; the exact agreement is not independently recovered.",
          confidence: "moderate",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE",
          relationship: "corroborating",
          supports: ["Jamie's campaign-web implementation and maintenance"],
          confidence: "high",
          renderCitation: true
        },
        {
          sourceId: "SRC-NYCAC-SHOESTRING-PHOTO-2017",
          relationship: "corroborating",
          supports: ["working-session setting", "facilitation with shared visual notes"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Attribute the exact meeting agreement to Jamie's recollection unless independent minutes or collaborator testimony are recovered.",
        "Do not turn infrastructure contribution into sole campaign authorship or legislative causation."
      ],
      antiClaims: ["Jamie alone unified every advocacy group", "the website caused Cabaret Law repeal"],
      researchInquiryIds: [],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-WOWLIST-PUBLIC-THRESHOLD-2026",
      project: "wowlist",
      internalClaim:
        "On August 13, 2026, WOW List had a live, noindex public threshold with a recognizable landing page, an About page, and a consented tester-interest invitation; it was not yet the restored calendar.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text:
            "WOW List is returning one deliberate step at a time. Its current live, noindex public threshold restores a recognizable landing page, an About page, and a consented tester invitation—not yet the community calendar itself.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/wowlist"]
        }
      ],
      evidence: [
        {
          sourceId: "SRC-WOWLIST-PUBLIC-THRESHOLD-2026",
          relationship: "direct-support",
          supports: ["live landing page", "live About page", "tester invitation", "noindex threshold"],
          confidence: "high",
          renderCitation: true
        }
      ],
      boundaries: [
        "Describe the current surface as a public threshold, not the restored service or a completed relaunch.",
        "Do not infer active membership, adoption, or archival-publication permission from the live pages."
      ],
      antiClaims: ["WOW List is already operating as a restored community calendar"],
      researchInquiryIds: [],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex public-surface review"]
    }
  ]
} as const;
