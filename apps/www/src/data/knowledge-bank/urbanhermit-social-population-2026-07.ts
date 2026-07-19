const reviewedAt = "2026-07-15";

const fixtureSourceId = "SRC-URBANHERM-X-FULL-POPULATION-2026";
const researchSourceId = "SRC-URBANHERM-X-AUTHENTICATED-RESEARCH-2026";

export const urbanhermitSocialPopulationJuly2026 = {
  intakeItems: [
    {
      id: "INTAKE-URBANHERM-X-FULL-POPULATION-2026",
      kind: "analysis-note",
      title: "Urbanhermit X full live-profile population archival pass",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated public-web review",
      projectIds: ["urbanhermit-public-record"],
      reason: "Preserve a public-safe disposition for every record counted by Jamie's live personal profile while separating Jamie-authored posts, external-source native reposts, personal context, and professional evidence.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [fixtureSourceId, researchSourceId],
      observationIds: [
        "OBS-URBANHERM-X-FULL-POPULATION-RECONCILIATION",
        "OBS-URBANHERM-X-PUBLISHING-LINK-AND-MISSION-PATTERN",
        "OBS-URBANHERM-X-BOUNDED-INCOMING-RESPONSE",
        "OBS-URBANHERM-X-VISIBLE-ENGAGEMENT-SNAPSHOT"
      ],
      researchInquiryIds: [
        "INQ-URBANHERM-X-OWNER-ARCHIVE-RECONCILIATION",
        "INQ-URBANHERM-X-POSTED-SOURCE-MATURATION"
      ],
      boundaries: [
        "One hundred percent means every one of the 434 records counted by the live profile on July 15, 2026; it does not prove that no older post was deleted or absent before capture.",
        "Raw post text, historical contact details, direct messages, cookies, credentials, private activity, and authenticated-session state remain outside the public repository.",
        "The public fixture retains nine non-mission personal or network-context records only as redacted dispositions; their identities, dates, URLs, and metrics are withheld.",
        "External-source native reposts retain their original authorship and are not Jamie-authored text."
      ]
    },
    {
      id: "INTAKE-URBANHERM-X-MISSION-SOURCES-2026",
      kind: "analysis-note",
      title: "Urbanhermit mission-source and stakeholder production",
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex authenticated public-web review",
      projectIds: [
        "urbanhermit-public-record",
        "horse-lords-truthers-video",
        "eighth-street-tunnel",
        "kc-town-hall",
        "nyc-artist-coalition"
      ],
      reason: "Mature high-value public records and incoming responses into bounded observations and claims without treating social circulation or mutable interaction counts as impact.",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        fixtureSourceId,
        "SRC-URBANHERM-X-HORSE-LORDS-POST-2016",
        "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016",
        "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
        "SRC-URBANHERM-X-KCTH-TIRES-2019",
        "SRC-URBANHERM-X-JIMMY-TIRES-2022",
        "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017"
      ],
      observationIds: [
        "OBS-URBANHERM-X-HORSE-LORDS-CORROBORATION",
        "OBS-URBANHERM-X-JULIA-TUNNEL-RESPONSE",
        "OBS-URBANHERM-X-TIRED-OF-TIRES-PARTICIPATION",
        "OBS-URBANHERM-X-TIRED-OF-TIRES-PROJECT-CORROBORATION"
      ],
      researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION"],
      boundaries: [
        "A posted URL documents publication or circulation, not authorship, agreement, readership, partnership, or impact.",
        "A public response documents one attributable interaction; it is not automatically an endorsement or a complete stakeholder-engagement census.",
        "Project-account and coalition-account posts do not establish Jamie's individual authorship without post-level evidence."
      ]
    },
    {
      id: "INTAKE-URBANHERM-EIGHTH-STREET-TUNNEL-2016",
      kind: "public-url",
      title: "KCUR history of Jamie's 8th Street Tunnel program",
      submittedAt: reviewedAt,
      submittedBy: "Urbanhermit posted-source review",
      projectIds: ["eighth-street-tunnel"],
      reason: "Preserve independent reporting about Jamie's 2006 participatory public-history program and its present access and safety boundary.",
      sourceUrl: "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016"],
      observationIds: ["OBS-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL"],
      researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION"],
      boundaries: [
        "The article documents a participatory screening, not restoration, ownership, permanent opening, attendance, or measured impact.",
        "Any future visual treatment must address current authorization, safety, rights, and represented-person consent."
      ]
    },
    {
      id: "INTAKE-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
      kind: "public-url",
      title: "Brooklyn Eagle reporting on the Office of Nightlife sequence",
      submittedAt: reviewedAt,
      submittedBy: "Urbanhermit posted-source review",
      projectIds: ["nyc-artist-coalition", "office-of-nightlife"],
      reason: "Add contemporaneous reporting that quotes NYC Artist Coalition and records the Council committee and public-feedback sequence around the proposed Office of Nightlife.",
      sourceUrl: "https://brooklyneagle.com/58743/nycs-office-of-nightlife-expected-to-be-here-by-2018/",
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: ["SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017"],
      observationIds: ["OBS-URBANHERM-BROOKLYN-EAGLE-NYCAC-NIGHTLIFE-SEQUENCE"],
      researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION"],
      boundaries: [
        "The article establishes a direct coalition quotation and contemporaneous policy sequence; it does not name Jamie or assign individual causation.",
        "The later official enactment record remains the governing source for legal status."
      ]
    }
  ],
  observations: [
    {
      id: "OBS-URBANHERM-X-FULL-POPULATION-RECONCILIATION",
      intakeId: "INTAKE-URBANHERM-X-FULL-POPULATION-2026",
      sourceId: fixtureSourceId,
      comparisonSourceIds: [researchSourceId],
      project: "urbanhermit-public-record",
      kind: "bounded-inference",
      text: "The authenticated July 15, 2026 pass reconciled all 434 records counted by the live @urbanhermit profile. Posts yielded 421 primary records; Replies rendered 436 cards comprising 434 primary profile records and two excluded conversation-parent cards authored by another account. The 434-record union contains 340 originals, 13 replies, and 81 external-source native reposts.",
      locator: "populationReconciliation, recordTypeCounts, conversationContextRecords, and 434 row-level records",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE"],
      researchInquiryIds: ["INQ-URBANHERM-X-OWNER-ARCHIVE-RECONCILIATION"],
      limitations: [
        "The exact reconciliation covers the live profile-counted population on the capture date, not records deleted, withheld, or otherwise absent beforehand.",
        "A complete historical archive still requires reconciliation against the account-owner X Archive."
      ]
    },
    {
      id: "OBS-URBANHERM-X-PUBLISHING-LINK-AND-MISSION-PATTERN",
      intakeId: "INTAKE-URBANHERM-X-FULL-POPULATION-2026",
      sourceId: fixtureSourceId,
      project: "urbanhermit-public-record",
      kind: "bounded-inference",
      text: "The population contains 353 account-authored originals or replies and 81 redistributed external-source records. Source bodies contain 349 external-link occurrences representing 321 distinct short URLs across 277 records; strict overlapping rules identify recurring signals in community platforms and gatherings, civic participation, cultural-space advocacy, public history and waterways, creative technology and media, and neighborhood mutual aid.",
      locator: "publishingPattern, postedUrlInventory, missionSignalClassification, and row-level classifications",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE"],
      researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION"],
      limitations: [
        "The six signal families overlap and describe source-body patterns, not professional priority, labor, agreement, reach, or impact.",
        "For native reposts, the source words and source-post metrics belong to the external author."
      ]
    },
    {
      id: "OBS-URBANHERM-X-BOUNDED-INCOMING-RESPONSE",
      intakeId: "INTAKE-URBANHERM-X-FULL-POPULATION-2026",
      sourceId: fixtureSourceId,
      project: "urbanhermit-public-record",
      kind: "bounded-inference",
      text: "A year-bounded authenticated search from 2008 through 2026 recovered 26 public incoming records. Close reading classified 15 records from nine accounts as mission-relevant third-party responses and retained two additional mission-relevant conversation-context records. Nine personal or network-context records remain only as redacted dispositions: their identities, dates, URLs, and metrics are withheld and they are excluded from professional traction claims.",
      locator: "stakeholderInventory and its 26 row-level records",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE"],
      researchInquiryIds: ["INQ-URBANHERM-X-OWNER-ARCHIVE-RECONCILIATION"],
      limitations: [
        "The public-index search excludes likes, direct messages, private activity, deleted or unindexed records, and responses that omit the handle.",
        "The 15 records and nine accounts are a bounded recovered sample, not a complete engagement census or endorsement count."
      ]
    },
    {
      id: "OBS-URBANHERM-X-VISIBLE-ENGAGEMENT-SNAPSHOT",
      intakeId: "INTAKE-URBANHERM-X-FULL-POPULATION-2026",
      sourceId: fixtureSourceId,
      project: "urbanhermit-public-record",
      kind: "bounded-inference",
      text: "At the July 15, 2026 access snapshot, 85 of 353 account-authored records displayed at least one interaction. The account-authored records displayed 175 likes, eight replies, and 60 reposts; records redistributed from external sources were excluded from these account-owned totals.",
      locator: "visibleEngagementSnapshot and account-authored row metrics",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE"],
      researchInquiryIds: [],
      limitations: [
        "The values are volatile, dated interface observations.",
        "They are not 243 people, unique people, reach, endorsement, conversion, attendance, or impact."
      ]
    },
    {
      id: "OBS-URBANHERM-X-HORSE-LORDS-CORROBORATION",
      intakeId: "INTAKE-URBANHERM-X-MISSION-SOURCES-2026",
      sourceId: "SRC-URBANHERM-X-HORSE-LORDS-POST-2016",
      comparisonSourceIds: ["SRC-HORSE-LORDS-TRUTHERS-NPR-2016-04-29", fixtureSourceId],
      project: "horse-lords-truthers-video",
      kind: "source-fact",
      text: "Jamie's contemporaneous public post links the NPR publication and names M.C. Schmidt's account and Horse Lords. The knowledge bank's independently recovered NPR article directly credits M.C. Schmidt and Jamie Burkart as the video's co-creators, corroborating rather than replacing the existing article-level claim.",
      locator: "status 726144972802691073 and NPR article introduction",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-HORSE-LORDS-TRUTHERS-VIDEO-2016"],
      researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION"],
      limitations: [
        "Always credit M.C. Schmidt alongside Jamie.",
        "The sources do not establish the collaborators' precise division of labor, commission terms, rights clearance, reach, or impact."
      ]
    },
    {
      id: "OBS-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL",
      intakeId: "INTAKE-URBANHERM-EIGHTH-STREET-TUNNEL-2016",
      sourceId: "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016",
      comparisonSourceIds: ["SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016"],
      project: "eighth-street-tunnel",
      kind: "source-fact",
      text: "KCUR reports that in 2006 Jamie led participants on a scavenger hunt through downtown Kansas City and hosted a film screening inside the historic 8th Street Tunnel. The program combined an artist call for shared space, a popular film, and an archival streetcar training film; the article also records Jamie's public-history and youth-imagination rationale for access.",
      locator: "Article sections identifying Jamie and describing the 2006 event, three-film program, and access rationale",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-URBANHERM-EIGHTH-STREET-TUNNEL-SCREENING"],
      researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION"],
      limitations: [
        "The article does not establish authorization terms, attendance, measured impact, or that Jamie restored, owned, controlled, or permanently opened the tunnel.",
        "Future public treatment should foreground current authorization and safety."
      ]
    },
    {
      id: "OBS-URBANHERM-X-JULIA-TUNNEL-RESPONSE",
      intakeId: "INTAKE-URBANHERM-X-MISSION-SOURCES-2026",
      sourceId: "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
      comparisonSourceIds: ["SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016", fixtureSourceId],
      project: "eighth-street-tunnel",
      kind: "context",
      text: "Julia Fredenburg publicly shared Jamie's KCUR appearance as historical knowledge about Kansas City's 8th Street Tunnel, providing attributable public-response context for the independently reported program.",
      locator: "status 775795144553398272 and stakeholderInventory",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-URBANHERM-EIGHTH-STREET-TUNNEL-SCREENING"],
      researchInquiryIds: [],
      limitations: [
        "The response connects Jamie to the article but does not independently establish every 2006 program detail.",
        "A public share is not treated as a complete engagement measure or formal endorsement."
      ]
    },
    {
      id: "OBS-URBANHERM-X-TIRED-OF-TIRES-PARTICIPATION",
      intakeId: "INTAKE-URBANHERM-X-MISSION-SOURCES-2026",
      sourceId: "SRC-URBANHERM-X-JIMMY-TIRES-2022",
      comparisonSourceIds: ["SRC-URBANHERM-X-KCTH-TIRES-2019", fixtureSourceId],
      project: "kc-town-hall",
      kind: "source-fact",
      text: "Jimmy Fitzner gave a first-hand public account of riding with Jamie in a dump truck to pick up tires around Northeast Kansas City. A KC Town Hall operating update separately names Jamie among participants in the recurring Tired of Tires workflow.",
      locator: "Jimmy Fitzner status 1510067983456026629 and KC Town Hall status 1135246124883861504",
      status: "corroborated",
      publicSafe: true,
      claimIds: ["CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION"],
      researchInquiryIds: ["INQ-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE"],
      limitations: [
        "The records establish direct participation, not sole program ownership, design authorship, every shift, the complete operating period, or independently audited totals.",
        "The project-account post remains collectively authored unless post-level evidence establishes an individual author."
      ]
    },
    {
      id: "OBS-URBANHERM-X-TIRED-OF-TIRES-PROJECT-CORROBORATION",
      intakeId: "INTAKE-URBANHERM-X-MISSION-SOURCES-2026",
      sourceId: "SRC-URBANHERM-X-KCTH-TIRES-2019",
      comparisonSourceIds: ["SRC-URBANHERM-X-JIMMY-TIRES-2022"],
      project: "kc-town-hall",
      kind: "source-fact",
      text: "A June 2019 KC Town Hall operating update names Jamie among participants in a recurring free tire-disposal and curbside-pickup workflow.",
      locator: "status 1135246124883861504",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION"],
      researchInquiryIds: ["INQ-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE"],
      limitations: [
        "The first-party project post supports participation and workflow continuity, not sole ownership or independently audited tire and savings totals.",
        "The record does not establish which named participant performed every task."
      ]
    },
    {
      id: "OBS-URBANHERM-BROOKLYN-EAGLE-NYCAC-NIGHTLIFE-SEQUENCE",
      intakeId: "INTAKE-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
      sourceId: "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
      project: "nyc-artist-coalition",
      kind: "source-fact",
      text: "The Brooklyn Eagle reported the Council committee and public-feedback sequence around the proposed Office of Nightlife and directly quoted NYC Artist Coalition's critique of the Cabaret Law's discriminatory history and its effect on informal cultural spaces.",
      locator: "Article sections on committee progress, feedback, the coalition quotation, and proposed office functions",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-NYCAC-PUBLIC-ADVOCACY-SYSTEM", "CLM-NYCAC-OFFICE-NIGHTLIFE-OUTCOME-2017"],
      researchInquiryIds: ["INQ-NYCAC-OFFICE-NIGHTLIFE-CONTRIBUTION"],
      limitations: [
        "The article does not name Jamie or establish his individual authorship of the coalition statement.",
        "It documents contemporaneous coalition participation and policy sequence, not sole coalition causation or final legal status."
      ]
    }
  ],
  sources: [
    {
      id: fixtureSourceId,
      title: "Urbanhermit X full live-profile population inventory",
      organization: "Jamie Burkart portfolio knowledge bank",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: reviewedAt,
      canonicalUrl: "https://github.com/openhouse/jamieburk.art/blob/develop/apps/www/src/data/knowledge-bank/fixtures/urbanhermit-full-population.json",
      preferredPublicUrl: "canonical",
      publicCitation: "Public-safe metadata inventory of all 434 records counted by the live @urbanhermit profile on July 15, 2026.",
      publicNote: "Preserves status identities, dates, source authorship, record types, retrieval provenance, public links, classifications, bounded mission-relevant incoming records, and dated visible counts while excluding raw post text, authenticated-session state, and unnecessary identity data for non-mission personal context.",
      supportsGenerally: [
        "434-of-434 live profile-counted record review",
        "record-type and source-authorship separation",
        "posted-URL, mission-signal, bounded incoming-response, and visible-interaction inventories"
      ],
      doesNotEstablish: [
        "that no older post was deleted or absent before capture",
        "a complete owner archive",
        "Jamie's authorship of external-source native reposts",
        "the truth of every historical statement or linked destination",
        "reach, endorsement, conversion, participation, or impact",
        "the identity or activity of nine redacted non-mission personal-context records"
      ]
    },
    {
      id: researchSourceId,
      title: "Authenticated Urbanhermit archival-production research run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-15",
      publicCitation: "Authenticated July 15, 2026 archival-production run over @urbanhermit Posts, Replies, and year-bounded incoming mentions.",
      publicNote: "The protected capture permits future audit and reclassification without publishing raw post text, historical personal context, contact details, or authenticated-session data.",
      protectedLocatorId: "PTR-URBANHERM-X-AUTHENTICATED-CAPTURE-2026",
      supportsGenerally: [
        "authenticated traversal and repeated no-growth stopping rule",
        "private source-body close reading",
        "classification-input provenance",
        "year-bounded incoming-search method"
      ],
      doesNotEstablish: [
        "a complete owner archive",
        "deleted or unindexed records",
        "private or nonpublic engagement",
        "permission to publish raw historical post text"
      ]
    },
    {
      id: "SRC-URBANHERM-X-HORSE-LORDS-POST-2016",
      title: "Jamie Burkart post linking the Horse Lords Truthers video",
      author: "Jamie Burkart",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-04-29",
      accessedAt: reviewedAt,
      canonicalUrl: "https://x.com/urbanhermit/status/726144972802691073",
      preferredPublicUrl: "canonical",
      publicCitation: "Jamie Burkart, public post linking the Horse Lords 'Truthers' video on NPR, April 29, 2016.",
      publicNote: "The contemporaneous post names M.C. Schmidt's account and Horse Lords and links the NPR publication.",
      supportsGenerally: ["contemporaneous association with the video collaboration", "the NPR publication destination"],
      doesNotEstablish: ["sole authorship", "the precise production split", "commission terms", "rights clearance", "audience reach or impact"]
    },
    {
      id: "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016",
      title: "The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In",
      organization: "KCUR",
      author: "Cody Newill",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-09-15",
      accessedAt: reviewedAt,
      canonicalUrl: "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
      preferredPublicUrl: "canonical",
      publicCitation: "Cody Newill, 'The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In,' KCUR, September 15, 2016.",
      publicNote: "Independent reporting identifies Jamie and documents the 2006 participatory screening and his public-history rationale while foregrounding access and safety limits.",
      supportsGenerally: ["Jamie's 2006 downtown scavenger hunt and tunnel screening", "the three-part film program", "Jamie's attributed public-history and imagination rationale"],
      doesNotEstablish: ["tunnel restoration or ownership", "a permanent public opening", "event authorization terms", "attendance", "measured educational impact"]
    },
    {
      id: "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
      title: "Julia Fredenburg post sharing Jamie's 8th Street Tunnel interview",
      author: "Julia Fredenburg",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-09-13",
      accessedAt: reviewedAt,
      canonicalUrl: "https://x.com/juliafredenburg/status/775795144553398272",
      preferredPublicUrl: "canonical",
      publicCitation: "Julia Fredenburg, public post sharing Jamie Burkart's KCUR interview about the 8th Street Tunnel, September 13, 2016.",
      supportsGenerally: ["public collaborator response to Jamie's historical interpretation", "the connection between Jamie and the KCUR article"],
      doesNotEstablish: ["the complete 2006 event details", "formal access rights", "attendance", "measured public impact"]
    },
    {
      id: "SRC-URBANHERM-X-KCTH-TIRES-2019",
      title: "KC Town Hall Tired of Tires operating update",
      organization: "KC Town Hall",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-06-02",
      accessedAt: reviewedAt,
      canonicalUrl: "https://x.com/KCTownHall/status/1135246124883861504",
      preferredPublicUrl: "canonical",
      publicCitation: "KC Town Hall, public Tired of Tires operating update naming Jamie Burkart among participants, June 2, 2019.",
      publicNote: "The project account names Jamie among participants in a recurring pickup and free-disposal workflow; its exact tire and savings figures remain first-party claims.",
      supportsGenerally: ["Jamie's named participation", "recurring public intake and disposal coordination"],
      doesNotEstablish: ["Jamie's sole operation or design of the program", "individual authorship of the post", "every participant's task", "independently audited totals"]
    },
    {
      id: "SRC-URBANHERM-X-JIMMY-TIRES-2022",
      title: "Jimmy Fitzner first-hand account of a tire-pickup shift with Jamie",
      author: "Jimmy Fitzner",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2022-04-01",
      accessedAt: reviewedAt,
      canonicalUrl: "https://x.com/JimmyFitzner/status/1510067983456026629",
      preferredPublicUrl: "canonical",
      publicCitation: "Jimmy Fitzner, first-hand public account of driving a dump truck with Jamie Burkart to pick up tires in Northeast Kansas City, April 1, 2022.",
      supportsGenerally: ["Jamie's direct participation in a neighborhood tire-pickup shift", "use of a dump truck", "Northeast Kansas City as the described service area"],
      doesNotEstablish: ["Jamie's sole operation or design of the program", "a complete operating period", "every shift", "a complete participant roster", "independently audited totals"]
    },
    {
      id: "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017",
      title: "NYC's Office of Nightlife expected to be here by 2018",
      organization: "Brooklyn Eagle",
      author: "Scott Enman",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-08-04",
      accessedAt: reviewedAt,
      canonicalUrl: "https://brooklyneagle.com/58743/nycs-office-of-nightlife-expected-to-be-here-by-2018/",
      preferredPublicUrl: "canonical",
      publicCitation: "Scott Enman, 'NYC's Office of Nightlife expected to be here by 2018,' Brooklyn Eagle, August 4, 2017.",
      publicNote: "Contemporaneous reporting quotes NYC Artist Coalition and describes the Council committee, public feedback, and proposed Office of Nightlife functions.",
      supportsGenerally: ["direct NYC Artist Coalition quotation", "contemporaneous Office of Nightlife policy sequence", "reported public-feedback process"],
      doesNotEstablish: ["Jamie's individual authorship or role", "sole coalition causation", "final legal status", "implementation quality", "measured policy impact"]
    }
  ],
  claims: [
    {
      id: "CLM-URBANHERM-X-PERSONAL-PUBLIC-WORKING-SURFACE",
      project: "urbanhermit-public-record",
      internalClaim: "From 2008 through 2023, Jamie's personal @urbanhermit account functioned as a cross-project public working surface spanning community platforms and gatherings, civic participation, cultural-space advocacy, public history and waterways, creative technology, and neighborhood work. The July 15, 2026 archival pass reconciled all 434 records counted by the live profile and retained a bounded incoming-response inventory.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "The personal account preserves a complete, public-safe metadata record of its 434 live profile-counted posts and reposts across multiple project lineages.", status: "hold", citationRequired: false, surfaces: [] }],
      evidence: [
        { sourceId: fixtureSourceId, relationship: "direct-support", supports: ["434-of-434 live-profile reconciliation", "record-type and source-authorship separation", "posted-link and mission-signal inventories", "bounded incoming-response and visible-interaction inventories"], confidence: "high", renderCitation: false },
        { sourceId: researchSourceId, relationship: "private-support", supports: ["authenticated traversal provenance", "source-body close reading", "classification reproducibility without publishing raw text"], publicNote: "Protected raw capture; the public fixture preserves public-safe metadata and hashes only.", confidence: "high", renderCitation: false }
      ],
      boundaries: [
        "All 434 live profile-counted records were reviewed; this is not proof that no record was deleted or absent before capture.",
        "The corpus contains 353 account-authored originals or replies and 81 external-source native reposts; source authorship remains explicit.",
        "The 15 mission-relevant incoming records from nine accounts are a bounded public-index sample, not complete historical engagement.",
        "Nine non-mission personal or network-context records are represented only by redacted dispositions, not public identities, dates, URLs, or metrics.",
        "Raw post text and protected personal or authenticated-session context remain outside the public repository.",
        "The corpus is knowledge-bank depth and is not selected for the current job-application website."
      ],
      antiClaims: [
        "Jamie authored all 434 source records",
        "The live profile is a complete owner archive of every post Jamie ever published",
        "Every posted source endorses Jamie or a project",
        "Theme frequency measures professional importance or work performed",
        "243 displayed interaction units equal 243 people",
        "Visible interactions measure reach, conversion, participation, or impact",
        "The bounded incoming search recovered every historical response"
      ],
      researchInquiryIds: ["INQ-URBANHERM-X-OWNER-ARCHIVE-RECONCILIATION", "INQ-URBANHERM-X-POSTED-SOURCE-MATURATION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex authenticated public-web review"]
    },
    {
      id: "CLM-URBANHERM-EIGHTH-STREET-TUNNEL-SCREENING",
      project: "eighth-street-tunnel",
      internalClaim: "In 2006, Jamie led participants through downtown Kansas City on a scavenger hunt and hosted a film screening inside the historic 8th Street Tunnel, combining artist, popular, and archival media to connect hidden infrastructure with public history and imagination.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "In 2006, led participants through downtown Kansas City on a scavenger hunt and hosted a three-part film program inside the historic 8th Street Tunnel.", status: "hold", citationRequired: true, surfaces: [] }],
      evidence: [
        { sourceId: "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016", relationship: "direct-support", supports: ["Jamie's leadership of the scavenger hunt and screening", "the three-part program", "Jamie's attributed public-history and imagination rationale"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016", relationship: "corroborating", supports: ["public collaborator response connecting Jamie to the KCUR historical account"], confidence: "moderate", renderCitation: false }
      ],
      boundaries: [
        "Describe a participatory screening and public-history program, not tunnel restoration, ownership, control, or permanent opening.",
        "The sources do not establish authorization terms, attendance, or measured educational impact.",
        "Any future public visual treatment requires rights, consent, present access, and safety review.",
        "The claim is mature but not selected for the current website."
      ],
      antiClaims: ["Jamie restored the 8th Street Tunnel", "Jamie owned or permanently opened the tunnel", "the event had a documented attendance total", "the program's educational impact was measured", "historical access authorizes present entry"],
      researchInquiryIds: ["INQ-URBANHERM-X-POSTED-SOURCE-MATURATION"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex public-source review"]
    },
    {
      id: "CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION",
      project: "kc-town-hall",
      internalClaim: "Jamie directly participated in KC Town Hall's recurring Tired of Tires neighborhood workflow, including a documented dump-truck pickup shift around Northeast Kansas City.",
      status: "confirmed-with-boundary",
      projections: [{ key: "archive-note", text: "Directly participated in a recurring neighborhood tire-removal workflow, including a documented dump-truck pickup shift around Northeast Kansas City.", status: "hold", citationRequired: true, surfaces: [] }],
      evidence: [
        { sourceId: "SRC-URBANHERM-X-JIMMY-TIRES-2022", relationship: "direct-support", supports: ["first-hand participant account of a dump-truck tire-pickup shift with Jamie", "Northeast Kansas City service area"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-URBANHERM-X-KCTH-TIRES-2019", relationship: "corroborating", supports: ["Jamie's named participation in a recurring tire-pickup and disposal workflow"], confidence: "high", renderCitation: false }
      ],
      boundaries: [
        "The records establish direct participation, not sole program ownership, design authorship, complete coordination, or every shift.",
        "Exact tire and savings totals remain first-party figures unless independently corroborated.",
        "The KC Town Hall post remains collectively authored without post-level attribution.",
        "The narrow participation claim is mature but not selected for the current website."
      ],
      antiClaims: ["Jamie alone created or operated Tired of Tires", "Jamie performed every pickup", "the records establish the complete operating period", "the social posts independently audit tire or savings totals", "the project-account post was authored by Jamie"],
      researchInquiryIds: ["INQ-KCTH-TIRED-OF-TIRES-INDIVIDUAL-ROLE"],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex public-source review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-URBANHERM-X-OWNER-ARCHIVE-RECONCILIATION",
      project: "urbanhermit-public-record",
      question: "Can the live-profile population be reconciled against Jamie's account-owner X Archive to identify records deleted, withheld, or otherwise absent before July 15, 2026?",
      methods: [
        "Request and download the account-owner X Archive.",
        "Transform it only in a protected workspace and reconcile stable status IDs against the 434-row public fixture.",
        "Publish only public-safe derived metadata and explicit remainder dispositions."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "All 434 records counted by the live profile materialized and were reviewed.",
        "Posts and Replies reconciled exactly after excluding two conversation-parent cards authored by another account.",
        "The public fixture is complete for the capture-date profile counter."
      ],
      limitations: [
        "The owner archive has not been supplied to this production pass.",
        "The live interface cannot establish whether older records were deleted or otherwise absent before capture."
      ],
      sourceIds: [fixtureSourceId, researchSourceId],
      publicSummary: "The capture-date live profile is fully reconciled; all-ever historical completeness remains an owner-archive question.",
      protectedLocatorId: "PTR-URBANHERM-X-AUTHENTICATED-CAPTURE-2026"
    },
    {
      id: "INQ-URBANHERM-X-POSTED-SOURCE-MATURATION",
      project: "urbanhermit-public-record",
      question: "Which of the 321 distinct posted short URLs should mature from complete inventory into source-level observations, claims, or explicit non-recovery records?",
      methods: [
        "Retain every recovered link in the public-safe fixture.",
        "Prioritize independent sources that identify Jamie, document role or method, establish project outcomes, or clarify collective and institutional context.",
        "Keep circulation, self-description, first-hand testimony, independent reporting, official record, and public response as separate source roles.",
        "Record redirect failures and non-recovery without claiming that a destination never existed."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "All 321 distinct short URLs have an inventory disposition in the fixture.",
        "The KCUR 8th Street Tunnel article matured into a new bounded public-history claim.",
        "Public participant and project-account records matured a narrow direct-participation claim for Tired of Tires.",
        "The corpus independently corroborated the existing Horse Lords co-creation claim.",
        "The Brooklyn Eagle article added a direct coalition quotation and contemporaneous Office of Nightlife policy sequence without assigning Jamie individual causation."
      ],
      limitations: [
        "Not all 321 destinations have been resolved and close-read at article level.",
        "A source posted or reposted by Jamie is not automatically coverage, endorsement, partnership, or evidence of Jamie's role.",
        "Media rights and collaborator role granularity remain separate research questions."
      ],
      sourceIds: [
        fixtureSourceId,
        "SRC-HORSE-LORDS-TRUTHERS-NPR-2016-04-29",
        "SRC-URBANHERM-KCUR-EIGHTH-STREET-TUNNEL-2016",
        "SRC-URBANHERM-X-JULIA-EIGHTH-STREET-TUNNEL-2016",
        "SRC-URBANHERM-X-KCTH-TIRES-2019",
        "SRC-URBANHERM-X-JIMMY-TIRES-2022",
        "SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017"
      ],
      publicSummary: "Every posted URL is preserved; source-level maturation proceeds by evidentiary value rather than social circulation alone."
    }
  ]
};
