import type { KnowledgeBank } from "./schema.ts";

type KnowledgeDevelopmentRecords = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

export const knowledgeDevelopmentRecords: KnowledgeDevelopmentRecords = {
  intakeItems: [
    {
      id: "INT-2026-07-12-PITCH-RAFT",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "url",
      visibility: "public",
      summary: "Public reporting on Jamie originating and beginning a collaborative Missouri River raft expedition.",
      sourceUrl: "https://www.thepitchkc.com/when-artists-turn-huck-finn/",
      projectHints: ["participatory-public-systems"],
      status: "processed",
      disposition: "Created a source record and linked both a promoted throughline and an open route inquiry.",
      linkedRecordIds: ["SRC-RAFT-PITCH-2007", "CND-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE", "CND-RIVER-RAFT-KC-GULF"]
    },
    {
      id: "INT-2026-07-12-CHARLOTTE-STREET-RIVER",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "url",
      visibility: "public",
      summary: "Institutional event record for Great Accommodations, river-community outreach, participatory programs, and the earlier raft journey.",
      sourceUrl: "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
      projectHints: ["participatory-public-systems"],
      status: "processed",
      disposition: "Created a source reading and used it in the bounded public throughline while holding the exact route claim for research.",
      linkedRecordIds: ["SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009", "CND-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE", "CND-RIVER-RAFT-KC-GULF"]
    },
    {
      id: "INT-2026-07-12-GOOD-TIMES-OPEN-HOUSE",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "url",
      visibility: "public",
      summary: "Public profile of Open House, Shop Shows, communal responsibility, participation, facilitation, and collective documentation.",
      sourceUrl: "https://www.goodtimes.sc/archives/metro-santa-cruz/06.28.06/open-house-0626.html",
      projectHints: ["participatory-public-systems"],
      status: "processed",
      disposition: "Created a source record and promoted a bounded professional throughline for the About page.",
      linkedRecordIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006", "CND-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE"]
    },
    {
      id: "INT-2026-07-12-GOTHAMIST-CABARET",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "url",
      visibility: "public",
      summary: "Contemporaneous reporting that directly documents Jamie's Cabaret Law repeal advocacy and NYC Artist Coalition affiliation.",
      sourceUrl: "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
      projectHints: ["nyc-artist-coalition"],
      status: "processed",
      disposition: "Created a source reading and promoted bounded advocacy wording while retaining stronger causal wording as partially supported.",
      linkedRecordIds: ["SRC-NYCAC-CABARET-GOTHAMIST-2017", "CND-NYCAC-CIVIC-ADVOCACY-BOUNDED", "CND-NYCAC-OFFICE-NIGHTLIFE-INSTRUMENTAL-ROLE"]
    },
    {
      id: "INT-2026-07-12-NPR-CABARET",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "url",
      visibility: "public",
      summary: "National contemporaneous context for the Cabaret Law repeal movement.",
      sourceUrl: "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife?renderPlatform=nprone_ios&unified=true",
      projectHints: ["nyc-artist-coalition"],
      status: "processed",
      disposition: "Recorded as contextual evidence that does not establish Jamie's individual role.",
      linkedRecordIds: ["SRC-NYCAC-CABARET-NPR-2017", "CND-NYCAC-CIVIC-ADVOCACY-BOUNDED"]
    },
    {
      id: "INT-2026-07-12-MEMORY-CALLNYC-ENGAGEMENT",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "memory",
      visibility: "public-safe",
      summary: "Potentially important engagement by New York City Council member accounts with the CallNYC account.",
      projectHints: ["callnyc"],
      status: "researching",
      disposition: "Preserved as a candidate claim and reproducible research inquiry; no statistic is promoted.",
      linkedRecordIds: ["CND-CALLNYC-COUNCIL-ENGAGEMENT-STATS", "INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"]
    },
    {
      id: "INT-2026-07-12-MEMORY-NYCAC-CIVIC-ROLE",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "claim",
      visibility: "public-safe",
      summary: "Jamie's instrumental role in NYC Artist Coalition, Cabaret Law repeal advocacy, Office of Nightlife advocacy, and public town halls.",
      projectHints: ["nyc-artist-coalition"],
      status: "researching",
      disposition: "Promoted the directly documented advocacy and convening claim; retained individual causal wording for further research.",
      linkedRecordIds: ["CND-NYCAC-CIVIC-ADVOCACY-BOUNDED", "CND-NYCAC-OFFICE-NIGHTLIFE-INSTRUMENTAL-ROLE", "INQ-NYCAC-OFFICE-NIGHTLIFE-ROLE-2026"]
    },
    {
      id: "INT-2026-07-12-MEMORY-TALKS-NOT-RAIDS",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "claim",
      visibility: "public-safe",
      summary: "Talks Not Raids first sought transparency and was part of a longer arc that preceded MARCH disbanding.",
      projectHints: ["nyc-artist-coalition"],
      status: "researching",
      disposition: "Promoted the campaign-to-enacted-transparency record; retained the disbanding causal claim as unresolved.",
      linkedRecordIds: ["CND-TALKS-NOT-RAIDS-TRANSPARENCY", "CND-TALKS-NOT-RAIDS-DISBAND-CAUSALITY", "INQ-TALKS-NOT-RAIDS-DISBAND-CAUSALITY-2026"]
    },
    {
      id: "INT-2026-07-12-MEMORY-RIVER-ROUTE",
      receivedAt: "2026-07-12",
      submittedBy: "Jamie Burkart",
      kind: "claim",
      visibility: "public-safe",
      summary: "The raft traveled from Kansas City to the Gulf of Mexico within a broader practice of participatory public engagement with waterways.",
      projectHints: ["participatory-public-systems"],
      status: "researching",
      disposition: "Promoted the well-supported participatory and river-system throughline; held the exact destination pending route research.",
      linkedRecordIds: ["CND-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE", "CND-RIVER-RAFT-KC-GULF", "INQ-RIVER-RAFT-ROUTE-2026"]
    }
  ],
  sourceReadings: [
    {
      id: "READ-OPEN-HOUSE-GOOD-TIMES-2006",
      sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "AST-OPEN-HOUSE-COMMUNAL", statement: "Jamie organized a ten-day public experiment in communal living inside a UCSC gallery.", locator: "Headline and opening sections", confidence: "high", publicSafe: true },
        { id: "AST-OPEN-HOUSE-GOVERNANCE", statement: "Responsibility and decision-making were described as communal rather than leader-controlled.", locator: "Staff investigation section", confidence: "high", publicSafe: true },
        { id: "AST-OPEN-HOUSE-DOCUMENTATION", statement: "Participants created a distributed visual and written documentation practice.", locator: "Tradition of Experiment section", confidence: "high", publicSafe: true }
      ],
      limitations: ["The profile is journalistic interpretation and does not establish current consent to publish participant images."],
      entityIds: ["Jamie-Burkart", "Open-House", "Shop-Shows"],
      themeIds: ["participatory-systems", "shared-governance", "documentation"],
      candidateClaimIds: ["CND-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE"]
    },
    {
      id: "READ-RAFT-PITCH-2007",
      sourceId: "SRC-RAFT-PITCH-2007",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "AST-RAFT-IDEA", statement: "The Pitch attributed the experiential boat-expedition idea to Jamie.", locator: "Article introduction", confidence: "high", publicSafe: true },
        { id: "AST-RAFT-MISSOURI", statement: "The article documented the collaborative raft crossing Missouri using recycled materials.", locator: "Article introduction", confidence: "high", publicSafe: true }
      ],
      limitations: ["The article does not document the complete route, final landing point, or full participant roster."],
      entityIds: ["Jamie-Burkart", "River-Raft-Project"],
      themeIds: ["waterways", "participatory-systems"],
      candidateClaimIds: ["CND-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE", "CND-RIVER-RAFT-KC-GULF"]
    },
    {
      id: "READ-GREAT-ACCOMMODATIONS-2009",
      sourceId: "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "AST-GREAT-ACCOMMODATIONS-LEAD", statement: "Charlotte Street described Great Accommodations as spearheaded by Jamie.", locator: "Project description", confidence: "high", publicSafe: true },
        { id: "AST-GREAT-ACCOMMODATIONS-OUTREACH", statement: "Jamie and Suzanne Hogan mailed hundreds of invitations to river communities and invited public stories.", locator: "Project description", confidence: "high", publicSafe: true },
        { id: "AST-GREAT-ACCOMMODATIONS-ROUTE", statement: "Jamie's project letter described travel from Kansas City down the Missouri and Mississippi Rivers until the water tasted salty.", locator: "Quoted project letter", confidence: "high", publicSafe: true }
      ],
      limitations: ["The institutional page does not name an exact Gulf landing point or complete route chronology."],
      entityIds: ["Jamie-Burkart", "Suzanne-Hogan", "Great-Accommodations", "River-Raft-Project"],
      themeIds: ["waterways", "public-engagement", "participatory-systems"],
      candidateClaimIds: ["CND-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE", "CND-RIVER-RAFT-KC-GULF"]
    },
    {
      id: "READ-NYCAC-GOTHAMIST-2017",
      sourceId: "SRC-NYCAC-CABARET-GOTHAMIST-2017",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "AST-NYCAC-JAMIE-ADVOCACY", statement: "Gothamist documented Jamie rallying for full repeal of the Cabaret Law as part of NYC Artist Coalition.", locator: "Opening section", confidence: "high", publicSafe: true },
        { id: "AST-NYCAC-FIRE-CODE", statement: "The article documented Jamie organizing fire-code study groups and articulating a safety consequence of the licensing regime.", locator: "Opening section and quotation", confidence: "high", publicSafe: true }
      ],
      limitations: ["The article supports Jamie's advocacy, not sole responsibility for repeal or legislation."],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition"],
      themeIds: ["cultural-space-safety", "cabaret-law", "civic-advocacy"],
      candidateClaimIds: ["CND-NYCAC-CIVIC-ADVOCACY-BOUNDED", "CND-NYCAC-OFFICE-NIGHTLIFE-INSTRUMENTAL-ROLE"]
    },
    {
      id: "READ-NPR-CABARET-2017",
      sourceId: "SRC-NYCAC-CABARET-NPR-2017",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "AST-NPR-CABARET-CONTEXT", statement: "NPR documented the 2017 movement toward Cabaret Law repeal as a broad nightlife issue.", locator: "Article overview", confidence: "high", publicSafe: true },
        { id: "AST-NPR-CABARET-EFFECT", statement: "The article described the law as regulating dancing in public establishments serving food or drink.", locator: "Article overview", confidence: "high", publicSafe: true }
      ],
      limitations: ["The article does not establish Jamie's or NYC Artist Coalition's individual contribution."],
      entityIds: ["NYC-Cabaret-Law"],
      themeIds: ["cabaret-law", "nightlife-policy"],
      candidateClaimIds: ["CND-NYCAC-CIVIC-ADVOCACY-BOUNDED"]
    },
    {
      id: "READ-NYC-COUNCIL-CABARET-2017",
      sourceId: "SRC-NYC-COUNCIL-CABARET-REPEAL-2017",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "AST-COUNCIL-CABARET-VOTE", statement: "The City Council voted to repeal the Cabaret Law in October 2017.", locator: "Repeal section", confidence: "high", publicSafe: true },
        { id: "AST-COUNCIL-CABARET-HISTORY", statement: "The Council described the law as having targeted specific groups and stifled cultural expression.", locator: "Repeal section", confidence: "high", publicSafe: true }
      ],
      limitations: ["The official record does not allocate causal credit among advocates."],
      entityIds: ["NYC-City-Council", "NYC-Cabaret-Law"],
      themeIds: ["cabaret-law", "government-record"],
      candidateClaimIds: ["CND-NYCAC-CIVIC-ADVOCACY-BOUNDED"]
    },
    {
      id: "READ-NYC-MOME-NIGHTLIFE-2017",
      sourceId: "SRC-NYC-MOME-OFFICE-NIGHTLIFE-2017",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "AST-MOME-NIGHTLIFE-CREATED", statement: "The mayor signed legislation creating the Office of Nightlife in September 2017.", locator: "Announcement opening", confidence: "high", publicSafe: true },
        { id: "AST-MOME-NIGHTLIFE-PURPOSE", statement: "The office was designed as a liaison among agencies, nightlife participants, and residents.", locator: "Office duties section", confidence: "high", publicSafe: true }
      ],
      limitations: ["The government announcement does not establish which advocates were decisive."],
      entityIds: ["NYC-Office-of-Nightlife"],
      themeIds: ["nightlife-policy", "government-record"],
      candidateClaimIds: ["CND-NYCAC-CIVIC-ADVOCACY-BOUNDED", "CND-NYCAC-OFFICE-NIGHTLIFE-INSTRUMENTAL-ROLE"]
    },
    {
      id: "READ-NYCAC-NIGHT-MAYOR-2017",
      sourceId: "SRC-NYCAC-NIGHT-MAYOR-TOWN-HALL-2017",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "AST-NYCAC-TOWN-HALL", statement: "NYC Artist Coalition organized an October 2017 Market Hotel town hall about the Office of Nightlife.", locator: "Event overview", confidence: "high", publicSafe: true },
        { id: "AST-NYCAC-TOWN-HALL-PURPOSE", statement: "The event invited public input centered on preserving diverse grassroots cultural spaces.", locator: "Event overview", confidence: "high", publicSafe: true }
      ],
      limitations: ["The coalition page does not establish Jamie as sole producer or provide a verified attendance count."],
      entityIds: ["NYC-Artist-Coalition", "NYC-Office-of-Nightlife", "Market-Hotel"],
      themeIds: ["public-engagement", "nightlife-policy"],
      candidateClaimIds: ["CND-NYCAC-CIVIC-ADVOCACY-BOUNDED", "CND-NYCAC-OFFICE-NIGHTLIFE-INSTRUMENTAL-ROLE"]
    },
    {
      id: "READ-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
      sourceId: "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "AST-BB-NYCAC-INSTRUMENTAL", statement: "Bedford + Bowery described NYC Artist Coalition as instrumental in Office of Nightlife and Cabaret Law advocacy.", locator: "Town hall opening", confidence: "high", publicSafe: true },
        { id: "AST-BB-JAMIE-SPEAKER", statement: "The article named Jamie as an NYC Artist Coalition speaker at the town hall.", locator: "Speaker paragraph", confidence: "high", publicSafe: true }
      ],
      limitations: ["Coalition-level influence plus Jamie's participation does not by itself prove Jamie-specific sole causality."],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition", "NYC-Office-of-Nightlife"],
      themeIds: ["civic-advocacy", "public-engagement", "nightlife-policy"],
      candidateClaimIds: ["CND-NYCAC-CIVIC-ADVOCACY-BOUNDED", "CND-NYCAC-OFFICE-NIGHTLIFE-INSTRUMENTAL-ROLE"]
    },
    {
      id: "READ-TALKS-NOT-RAIDS-SITE",
      sourceId: "SRC-TALKS-NOT-RAIDS-PUBLIC-SITE",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "AST-TNR-ACTION-SURFACE", statement: "The campaign site combined explanation, calls to Council, coalition participation, media sources, and sponsor tracking.", locator: "Campaign, progress, and coalition sections", confidence: "high", publicSafe: true },
        { id: "AST-TNR-INT-1156", statement: "The site explicitly advocated passage of Introduction 1156 for MARCH transparency.", locator: "Primary call to action", confidence: "high", publicSafe: true }
      ],
      limitations: ["The live page is a campaign artifact and does not by itself prove enactment or later causal outcomes."],
      entityIds: ["NYC-Artist-Coalition", "Talks-Not-Raids", "MARCH"],
      themeIds: ["public-engagement", "transparency", "nightlife-enforcement"],
      candidateClaimIds: ["CND-TALKS-NOT-RAIDS-TRANSPARENCY", "CND-TALKS-NOT-RAIDS-DISBAND-CAUSALITY"]
    },
    {
      id: "READ-NYC-COUNCIL-INT-1156",
      sourceId: "SRC-NYC-COUNCIL-INT-1156-2018",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "AST-INT-1156-ENACTED", statement: "Introduction 1156 became Local Law 220 of 2019 with 19 Council sponsors.", locator: "Status and sponsor sections", confidence: "high", publicSafe: true },
        { id: "AST-INT-1156-REQUIREMENTS", statement: "The enacted law required reporting and advance notice for MARCH operations with stated exceptions.", locator: "Summary and enacted text", confidence: "high", publicSafe: true }
      ],
      limitations: ["The legislative record does not establish which campaign or person caused enactment."],
      entityIds: ["NYC-City-Council", "MARCH", "Local-Law-220-2019"],
      themeIds: ["transparency", "government-record", "nightlife-enforcement"],
      candidateClaimIds: ["CND-TALKS-NOT-RAIDS-TRANSPARENCY", "CND-TALKS-NOT-RAIDS-DISBAND-CAUSALITY"]
    },
    {
      id: "READ-BUSHWICK-DAILY-MARCH-2024",
      sourceId: "SRC-BUSHWICK-DAILY-MARCH-DISBANDS-2023",
      readAt: "2026-07-12",
      reader: "Codex public-source review",
      assertions: [
        { id: "AST-MARCH-DISBANDS", statement: "Bushwick Daily reported that the Adams administration disbanded MARCH.", locator: "Article opening and official interview", confidence: "high", publicSafe: true },
        { id: "AST-MARCH-CURE", statement: "The reporting described CURE as the replacement program emphasizing communication.", locator: "Program description", confidence: "high", publicSafe: true }
      ],
      limitations: ["The reporting does not establish Talks Not Raids or Jamie as the cause of the later decision."],
      entityIds: ["MARCH", "CURE"],
      themeIds: ["nightlife-enforcement", "institutional-change"],
      candidateClaimIds: ["CND-TALKS-NOT-RAIDS-DISBAND-CAUSALITY"]
    }
  ],
  candidateClaims: [
    {
      id: "CND-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE",
      project: "participatory-public-systems",
      text: "Jamie's early cultural projects created participatory public systems through shared space, facilitation, documentation, river travel, and invitations for people to contribute.",
      status: "promoted",
      sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006", "SRC-RAFT-PITCH-2007", "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009", "SRC-RAFT-SOUNDINGS-2007"],
      researchInquiryIds: ["INQ-RIVER-RAFT-ROUTE-2026"],
      supportSummary: "Four public sources across 2006-2009 independently support the recurring participatory-systems pattern, including a documented journey of more than 1,000 miles.",
      missingEvidence: ["Exact raft route and final landing point remain incomplete."],
      boundaries: ["Use as a throughline, not formal employment history.", "Preserve collaborator and participant credit."],
      promotedClaimId: "CLM-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-RIVER-RAFT-KC-GULF",
      project: "participatory-public-systems",
      text: "Jamie organized a collaborative raft expedition from Kansas City to the Gulf of Mexico.",
      status: "research-needed",
      sourceIds: ["SRC-RAFT-PITCH-2007", "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009", "SRC-RAFT-SOUNDINGS-2007"],
      researchInquiryIds: ["INQ-RIVER-RAFT-ROUTE-2026"],
      supportSummary: "Sources establish origin in Kansas City, more than 1,000 miles traveled, and a journey down the Missouri and Mississippi until salt water, but not the exact final landing point.",
      missingEvidence: ["Contemporaneous route log or map", "Exact final landing location", "Complete chronology and collaborator record"],
      boundaries: ["Do not project the Gulf destination as settled fact yet."],
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-NYCAC-CIVIC-ADVOCACY-BOUNDED",
      project: "nyc-artist-coalition",
      text: "Jamie publicly advocated through NYC Artist Coalition for Cabaret Law repeal and participated in coalition convenings around the Office of Nightlife.",
      status: "promoted",
      sourceIds: ["SRC-NYCAC-CABARET-GOTHAMIST-2017", "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017", "SRC-NYC-MOME-OFFICE-NIGHTLIFE-2017", "SRC-NYC-COUNCIL-CABARET-REPEAL-2017"],
      researchInquiryIds: ["INQ-NYCAC-OFFICE-NIGHTLIFE-ROLE-2026"],
      supportSummary: "Contemporaneous reporting directly documents Jamie's advocacy and speaker role while official sources establish the policy outcomes.",
      missingEvidence: ["More detailed production and strategy records could support a fuller individual role description."],
      boundaries: ["Use collective-work language and separate advocacy from legislative sponsorship and enactment."],
      promotedClaimId: "CLM-NYCAC-CIVIC-ADVOCACY-2017",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-NYCAC-OFFICE-NIGHTLIFE-INSTRUMENTAL-ROLE",
      project: "nyc-artist-coalition",
      text: "Jamie played an instrumental individual role in creating New York City's Office of Nightlife and securing Cabaret Law repeal.",
      status: "partially-supported",
      sourceIds: ["SRC-NYCAC-CABARET-GOTHAMIST-2017", "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017", "SRC-NYCAC-NIGHT-MAYOR-TOWN-HALL-2017", "SRC-NYC-MOME-OFFICE-NIGHTLIFE-2017"],
      researchInquiryIds: ["INQ-NYCAC-OFFICE-NIGHTLIFE-ROLE-2026"],
      supportSummary: "Sources describe the coalition as instrumental and directly place Jamie in advocacy and convening, but do not fully allocate coalition-level influence to one person.",
      missingEvidence: ["Collaborator testimony on Jamie's strategy and production responsibilities", "Contemporaneous planning records suitable for public summary", "Additional reporting naming Jamie's individual contribution"],
      boundaries: ["Do not convert coalition-level influence into solo causality."],
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-TALKS-NOT-RAIDS-TRANSPARENCY",
      project: "nyc-artist-coalition",
      text: "Talks Not Raids translated MARCH transparency legislation into a public campaign surface; Introduction 1156 became Local Law 220 of 2019.",
      status: "promoted",
      sourceIds: ["SRC-TALKS-NOT-RAIDS-PUBLIC-SITE", "SRC-NYC-COUNCIL-INT-1156-2018"],
      researchInquiryIds: ["INQ-TALKS-NOT-RAIDS-DISBAND-CAUSALITY-2026"],
      supportSummary: "The campaign artifact and enacted legislative record directly support the bounded campaign-to-law sequence.",
      missingEvidence: ["Causal attribution among coalition participants and lawmakers remains intentionally unassigned."],
      boundaries: ["Treat the campaign as collective and do not claim it alone caused enactment."],
      promotedClaimId: "CLM-TALKS-NOT-RAIDS-TRANSPARENCY",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-TALKS-NOT-RAIDS-DISBAND-CAUSALITY",
      project: "nyc-artist-coalition",
      text: "Talks Not Raids ultimately caused New York City to disband MARCH.",
      status: "research-needed",
      sourceIds: ["SRC-TALKS-NOT-RAIDS-PUBLIC-SITE", "SRC-NYC-COUNCIL-INT-1156-2018", "SRC-BUSHWICK-DAILY-MARCH-DISBANDS-2023"],
      researchInquiryIds: ["INQ-TALKS-NOT-RAIDS-DISBAND-CAUSALITY-2026"],
      supportSummary: "The record establishes advocacy, enacted transparency reform, and later disbanding, but not a single causal chain.",
      missingEvidence: ["Government decision record connecting prior advocacy to disbanding", "Public collaborator accounts of the institutional sequence", "Policy history between Local Law 220 and CURE"],
      boundaries: ["Do not publish causal wording until the institutional chain is established."],
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-CALLNYC-COUNCIL-ENGAGEMENT-STATS",
      project: "callnyc",
      text: "New York City Council member accounts engaged substantially with the CallNYC account on Twitter.",
      status: "partially-supported",
      sourceIds: [
        "SRC-SOCIAL-CALLNYC-PROFILE-CAPTURE-2026",
        "SRC-SOCIAL-CALLNYC-HELEN-ROSENTHAL-2016",
        "SRC-SOCIAL-CALLNYC-MATHIEU-EUGENE-2016"
      ],
      researchInquiryIds: ["INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"],
      supportSummary: "Two direct then-sitting Council-member engagements are recovered and source-backed, but 'substantially' and any exact or comprehensive total remain unsupported.",
      missingEvidence: ["Account export or another complete interaction corpus", "Council-member account roster for the relevant period", "Deduplicated reply, repost, quote-post, and like counts", "Archive coverage for deleted or renamed accounts"],
      boundaries: ["Do not convert a two-account recovered minimum into a comprehensive total or broad reach claim."],
      reviewedAt: "2026-07-12"
    }
  ],
  promotions: [
    { id: "PROM-PARTICIPATORY-THROUGHLINE-2026", candidateClaimId: "CND-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE", claimId: "CLM-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE", decision: "promoted", reason: "Three public sources support a bounded throughline useful on the About page.", decidedAt: "2026-07-12", decidedBy: ["Jamie Burkart", "Codex source review"] },
    { id: "PROM-NYCAC-CIVIC-ADVOCACY-2026", candidateClaimId: "CND-NYCAC-CIVIC-ADVOCACY-BOUNDED", claimId: "CLM-NYCAC-CIVIC-ADVOCACY-2017", decision: "promoted", reason: "Direct Jamie-specific reporting and official context support bounded advocacy and participation wording.", decidedAt: "2026-07-12", decidedBy: ["Jamie Burkart", "Codex source review"] },
    { id: "PROM-TALKS-NOT-RAIDS-TRANSPARENCY-2026", candidateClaimId: "CND-TALKS-NOT-RAIDS-TRANSPARENCY", claimId: "CLM-TALKS-NOT-RAIDS-TRANSPARENCY", decision: "promoted", reason: "The campaign site and legislative record directly establish the public-action and enacted-transparency sequence.", decidedAt: "2026-07-12", decidedBy: ["Jamie Burkart", "Codex source review"] },
    { id: "PROM-RIVER-GULF-HOLD-2026", candidateClaimId: "CND-RIVER-RAFT-KC-GULF", decision: "held", reason: "The reviewed sources establish the river journey but not an exact Gulf landing point.", decidedAt: "2026-07-12", decidedBy: ["Codex source review"] },
    { id: "PROM-NYCAC-INSTRUMENTAL-HOLD-2026", candidateClaimId: "CND-NYCAC-OFFICE-NIGHTLIFE-INSTRUMENTAL-ROLE", decision: "held", reason: "Coalition influence and Jamie's participation are supported; stronger individual causal allocation needs more evidence.", decidedAt: "2026-07-12", decidedBy: ["Codex source review"] },
    { id: "PROM-MARCH-CAUSALITY-HOLD-2026", candidateClaimId: "CND-TALKS-NOT-RAIDS-DISBAND-CAUSALITY", decision: "held", reason: "Chronology is established but causal attribution is not.", decidedAt: "2026-07-12", decidedBy: ["Codex source review"] },
    { id: "PROM-CALLNYC-ENGAGEMENT-HOLD-2026", candidateClaimId: "CND-CALLNYC-COUNCIL-ENGAGEMENT-STATS", decision: "held", reason: "Two direct engagements support a minimum, but no comprehensive reproducible corpus supports 'substantially' or an exact total.", decidedAt: "2026-07-12", decidedBy: ["Codex source review"] }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-JOB-APPLICATION-DEPTH-2026-07-12",
      audience: "Hiring managers, referrers, civic-technology peers, and public-interest collaborators",
      goal: "Strengthen job-application readiness without turning the portfolio into an exhaustive archive.",
      argument: "Jamie has a long, coherent practice of building participatory and civic operating structures that help people act together.",
      selectedClaimIds: ["CLM-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE", "CLM-NYCAC-CIVIC-ADVOCACY-2017", "CLM-TALKS-NOT-RAIDS-TRANSPARENCY"],
      heldCandidateClaimIds: ["CND-RIVER-RAFT-KC-GULF", "CND-NYCAC-OFFICE-NIGHTLIFE-INSTRUMENTAL-ROLE", "CND-TALKS-NOT-RAIDS-DISBAND-CAUSALITY", "CND-CALLNYC-COUNCIL-ENGAGEMENT-STATS"],
      rationale: [
        "Use the participatory throughline once on About to deepen the professional story without crowding the homepage.",
        "Use bounded civic advocacy and enacted transparency outcomes inside the NYC Artist Coalition case study.",
        "Keep exact route, quantitative engagement, and high-causality policy claims in the bank until research closes their gaps."
      ],
      createdAt: "2026-07-12"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-PHOTO-PARTICIPATORY-SYSTEMS-2026",
      kind: "photo-editor",
      summary: "A future photo brief should search for Open House shared governance and documentation, raft construction and river encounters, Great Accommodations participation, and NYC Artist Coalition town halls as evidence-bearing sequences rather than decoration.",
      projectHints: ["participatory-public-systems", "nyc-artist-coalition"],
      sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006", "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009", "SRC-NYCAC-NIGHT-MAYOR-TOWN-HALL-2017"],
      candidateClaimIds: ["CND-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE", "CND-RIVER-RAFT-KC-GULF", "CND-NYCAC-OFFICE-NIGHTLIFE-INSTRUMENTAL-ROLE"],
      rightsReviewRequired: true,
      status: "captured",
      createdAt: "2026-07-12"
    },
    {
      id: "DISC-ARCHIVE-OPEN-QUESTIONS-2026",
      kind: "archive-research",
      summary: "Archive research should prioritize the raft route and collaborator timeline, CallNYC social engagement corpus, NYC Artist Coalition production records, and the institutional path from Talks Not Raids through Local Law 220 to MARCH disbanding.",
      projectHints: ["participatory-public-systems", "callnyc", "nyc-artist-coalition"],
      sourceIds: ["SRC-RAFT-PITCH-2007", "SRC-TALKS-NOT-RAIDS-PUBLIC-SITE", "SRC-BUSHWICK-DAILY-MARCH-DISBANDS-2023"],
      candidateClaimIds: ["CND-RIVER-RAFT-KC-GULF", "CND-CALLNYC-COUNCIL-ENGAGEMENT-STATS", "CND-NYCAC-OFFICE-NIGHTLIFE-INSTRUMENTAL-ROLE", "CND-TALKS-NOT-RAIDS-DISBAND-CAUSALITY"],
      rightsReviewRequired: false,
      status: "researching",
      createdAt: "2026-07-12"
    }
  ]
};
