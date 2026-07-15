import type { KnowledgeBank } from "./schema.ts";

type StrengtheningDevelopment = Pick<
  KnowledgeBank,
  | "intakeItems"
  | "sourceReadings"
  | "candidateClaims"
  | "promotions"
  | "editorialBriefs"
  | "discoveryNotes"
>;

export const strengtheningDevelopmentRecords: StrengtheningDevelopment = {
  intakeItems: [
    {
      id: "INT-2026-07-12-NYC-COUNCIL-CABARET-HEARING",
      receivedAt: "2026-07-12",
      submittedBy: "Codex public-source research",
      kind: "url",
      visibility: "public",
      summary: "Official transcript of Jamie's 2017 City Council testimony on Cabaret Law repeal and safety.",
      sourceUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=41F1062B-FC32-4A12-846E-65CEB3BB052C&ID=5316935&M=F",
      projectHints: ["nyc-artist-coalition"],
      status: "processed",
      disposition: "Promoted a bounded claim about Jamie's public testimony; no legislative causality was inferred.",
      linkedRecordIds: ["SRC-NYC-COUNCIL-CABARET-HEARING-2017", "CND-NYCAC-PUBLIC-TESTIMONY", "CLM-NYCAC-PUBLIC-TESTIMONY-2017-2019"]
    },
    {
      id: "INT-2026-07-12-NYC-COUNCIL-MARCH-HEARING",
      receivedAt: "2026-07-12",
      submittedBy: "Codex public-source research",
      kind: "url",
      visibility: "public",
      summary: "Official transcript of Jamie's 2019 City Council testimony on MARCH transparency and coalition safety work.",
      sourceUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=2582E680-452D-46B1-8DE1-C5C5168F5D63&ID=7080592&M=F",
      projectHints: ["nyc-artist-coalition"],
      status: "processed",
      disposition: "Used as direct evidence of testimony while keeping study-group metrics and policy causality bounded.",
      linkedRecordIds: ["SRC-NYC-COUNCIL-MARCH-HEARING-2019", "CND-NYCAC-PUBLIC-TESTIMONY", "CND-NYCAC-SOLE-POLICY-CAUSALITY"]
    },
    {
      id: "INT-2026-07-12-VICE-NYCAC-SAFETY",
      receivedAt: "2026-07-12",
      submittedBy: "Codex public-source research",
      kind: "url",
      visibility: "public",
      summary: "Contemporaneous reporting on NYC Artist Coalition's formation and DIY-space safety agenda.",
      sourceUrl: "https://www.vice.com/en/article/nyc-artist-coalition-dance-liberation-network-diy-spaces/",
      projectHints: ["nyc-artist-coalition"],
      status: "processed",
      disposition: "Added as coalition context; it is not used to prove Jamie's individual founding role.",
      linkedRecordIds: ["SRC-VICE-NYCAC-DIY-SAFETY-2017", "CND-NYCAC-PUBLIC-TESTIMONY", "CND-NYCAC-SOLE-POLICY-CAUSALITY"]
    },
    {
      id: "INT-2026-07-12-VILLAGE-VOICE-NIGHT-MAYOR",
      receivedAt: "2026-07-12",
      submittedBy: "Codex public-source research",
      kind: "url",
      visibility: "public",
      summary: "Independent reporting on the coalition's Save NYC Spaces town hall and public-agency dialogue.",
      sourceUrl: "https://www.villagevoice.com/awaiting-the-night-mayor/",
      projectHints: ["nyc-artist-coalition"],
      status: "processed",
      disposition: "Added as independent evidence of coalition convening and scale, without assigning Jamie solo production credit.",
      linkedRecordIds: ["SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017", "CND-NYCAC-SOLE-POLICY-CAUSALITY"]
    },
    {
      id: "INT-2026-07-12-NYC-MAYOR-CURE",
      receivedAt: "2026-07-12",
      submittedBy: "Codex public-source research",
      kind: "url",
      visibility: "public",
      summary: "Official 2023 record replacing MARCH with CURE and acknowledging NYC Artist Coalition among advocates.",
      sourceUrl: "https://www.nyc.gov/mayors-office/news/2023/12/transcript-mayor-adams-launches-effort-enhance-nightlife-safety-strengthen-small",
      projectHints: ["nyc-artist-coalition"],
      status: "processed",
      disposition: "Closed the outcome chronology while explicitly holding any claim that earlier advocacy alone caused the 2023 change.",
      linkedRecordIds: ["SRC-NYC-MAYOR-CURE-MARCH-2023", "CND-NYCAC-SOLE-POLICY-CAUSALITY", "INQ-TALKS-NOT-RAIDS-DISBAND-CAUSALITY-2026"]
    },
    {
      id: "INT-2026-07-12-CREATENYC-NYCAC",
      receivedAt: "2026-07-12",
      submittedBy: "Codex public-source research",
      kind: "url",
      visibility: "public",
      summary: "City-hosted CreateNYC appendix preserving coalition recommendations and WOWList-distributed public programs.",
      sourceUrl: "https://createnyc.cityofnewyork.us/wp-content/uploads/2017/07/CreateNYC_Appendix-Sect5_NYC-Artist-Coalition-DIY-Community.pdf",
      projectHints: ["nyc-artist-coalition", "wowlist"],
      status: "processed",
      disposition: "Added as direct evidence of public-plan participation and cross-project infrastructure, not Jamie's sole authorship.",
      linkedRecordIds: ["SRC-CREATENYC-NYCAC-APPENDIX-2017", "CND-NYCAC-SOLE-POLICY-CAUSALITY", "CND-WOWLIST-SBDIY-CALENDAR-USE"]
    },
    {
      id: "INT-2026-07-12-SBDIY-WOWLIST",
      receivedAt: "2026-07-12",
      submittedBy: "Codex public-source research",
      kind: "url",
      visibility: "public",
      summary: "Independent community site inviting visitors to use a dedicated WOWList calendar.",
      sourceUrl: "https://www.sbdiy.org/",
      projectHints: ["wowlist"],
      status: "processed",
      disposition: "Promoted as one concrete external-use example, separate from aggregate adoption metrics.",
      linkedRecordIds: ["SRC-SBDIY-WOWLIST-CALENDAR", "CND-WOWLIST-SBDIY-CALENDAR-USE", "CLM-WOWLIST-SBDIY-CALENDAR-USE"]
    },
    {
      id: "INT-2026-07-12-KCMO-KC-TOWN-HALL-PROPOSAL",
      receivedAt: "2026-07-12",
      submittedBy: "Codex public-source research",
      kind: "url",
      visibility: "public",
      summary: "Kansas City board packet naming Jamie as KC Town Hall's developer/presenter and describing the funding request.",
      sourceUrl: "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000",
      projectHints: ["kc-town-hall"],
      status: "processed",
      disposition: "Promoted the named role and unanimous board recommendation while holding final-award and completion claims.",
      linkedRecordIds: ["SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019", "CND-KC-TOWN-HALL-MUNICIPAL-RECORD", "CND-KC-TOWN-HALL-FUNDING-AWARD", "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD"]
    },
    {
      id: "INT-2026-07-12-KCMO-KC-TOWN-HALL-MINUTES",
      receivedAt: "2026-07-12",
      submittedBy: "Codex public-source research",
      kind: "url",
      visibility: "public",
      summary: "Kansas City board packet recording Jamie's continued public participation for KC Town Hall in 2021.",
      sourceUrl: "https://www.kcmo.gov/home/showpublisheddocument/7198/637696345156870000",
      projectHints: ["kc-town-hall"],
      status: "processed",
      disposition: "Used as corroboration of continued project participation without inferring award or completion.",
      linkedRecordIds: ["SRC-KCMO-KC-TOWN-HALL-MINUTES-2021", "CND-KC-TOWN-HALL-MUNICIPAL-RECORD", "CND-KC-TOWN-HALL-FUNDING-AWARD"]
    },
    {
      id: "INT-2026-07-12-KCUR-EIGHTH-STREET-TUNNEL",
      receivedAt: "2026-07-12",
      submittedBy: "Codex public-source research",
      kind: "url",
      visibility: "public",
      summary: "Independent public-radio reporting on Jamie's 2006 participatory public-history program in Kansas City's 8th Street Tunnel.",
      sourceUrl: "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
      projectHints: ["participatory-public-systems"],
      status: "processed",
      disposition: "Matured into a defensible knowledge-bank claim and held from the current site for editorial focus.",
      linkedRecordIds: ["SRC-KCUR-EIGHTH-STREET-TUNNEL-2016", "CND-EIGHTH-STREET-TUNNEL-PUBLIC-HISTORY"]
    }
  ],
  sourceReadings: [
    {
      id: "READ-NYC-COUNCIL-CABARET-HEARING-2017",
      sourceId: "SRC-NYC-COUNCIL-CABARET-HEARING-2017",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        { id: "ASSERT-CABARET-HEARING-IDENTITY", statement: "The appearance list and testimony identify Jamie with NYC Artist Coalition.", locator: "Pages 3 and 199-202", confidence: "high", publicSafe: true },
        { id: "ASSERT-CABARET-HEARING-ACTION", statement: "Jamie urged the Council to repeal the Cabaret Law and argued for trust-based safety support.", locator: "Pages 199-202", confidence: "high", publicSafe: true }
      ],
      limitations: ["The transcript records testimony; it does not independently verify every statement or allocate causal credit for repeal."],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition", "NYC-Council"],
      themeIds: ["public-testimony", "cabaret-law", "safety"],
      candidateClaimIds: ["CND-NYCAC-PUBLIC-TESTIMONY", "CND-NYCAC-SOLE-POLICY-CAUSALITY"]
    },
    {
      id: "READ-NYC-COUNCIL-MARCH-HEARING-2019",
      sourceId: "SRC-NYC-COUNCIL-MARCH-HEARING-2019",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        { id: "ASSERT-MARCH-HEARING-IDENTITY", statement: "Jamie testified as an NYC Artist Coalition member on Introduction 1156 and MARCH.", locator: "Pages 90-93", confidence: "high", publicSafe: true },
        { id: "ASSERT-MARCH-HEARING-ACTION", statement: "He called for transparency, talks rather than raids, and city-coalition liaison work.", locator: "Pages 90-93", confidence: "high", publicSafe: true },
        { id: "ASSERT-MARCH-HEARING-SAFETY", statement: "He described fire-safety walk-throughs, workshops, and Fireguard study groups as coalition responses.", locator: "Page 90", confidence: "high", publicSafe: true },
        { id: "ASSERT-MARCH-HEARING-COUNCIL-USE", statement: "Council Chair Rory Lancman repeatedly used NYC Artist Coalition's FOIL-derived analysis to question NYPD about non-enforcement outcomes, data differences, selection, and racial disparities.", locator: "Pages 15-28", confidence: "high", publicSafe: true },
        { id: "ASSERT-MARCH-HEARING-FOLLOW-UP", statement: "Lancman proposed a follow-up meeting involving NYPD, the coalition, interested Council members, and Council staff.", locator: "Pages 27-28", confidence: "high", publicSafe: true }
      ],
      limitations: ["The 100 percent pass-rate statement remains testimony unless corroborated by records."],
      entityIds: ["Jamie-Burkart", "NYC-Artist-Coalition", "NYC-Council"],
      themeIds: ["public-testimony", "march", "transparency", "safety"],
      candidateClaimIds: ["CND-NYCAC-PUBLIC-TESTIMONY", "CND-NYCAC-SOLE-POLICY-CAUSALITY", "CND-NYCAC-GOVERNMENT-INTERFACE-2017-2019", "CND-NYCAC-OFFICIALS-NEEDED-COALITION"]
    },
    {
      id: "READ-VICE-NYCAC-DIY-SAFETY-2017",
      sourceId: "SRC-VICE-NYCAC-DIY-SAFETY-2017",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        { id: "ASSERT-VICE-NYCAC-FORMATION", statement: "VICE reported that NYC Artist Coalition formed in January 2017 after the Ghost Ship fire.", locator: "Coalition background section", confidence: "high", publicSafe: true },
        { id: "ASSERT-VICE-NYCAC-AGENDA", statement: "The article describes safety, affordability, and support for informal community spaces as coalition priorities.", locator: "Coalition background section", confidence: "high", publicSafe: true }
      ],
      limitations: ["The article does not identify Jamie or establish internal founding roles."],
      entityIds: ["NYC-Artist-Coalition"],
      themeIds: ["coalition-formation", "diy-safety", "affordability"],
      candidateClaimIds: ["CND-NYCAC-SOLE-POLICY-CAUSALITY"]
    },
    {
      id: "READ-VILLAGE-VOICE-NIGHT-MAYOR-2017",
      sourceId: "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        { id: "ASSERT-VILLAGE-VOICE-TOWN-HALL", statement: "The article attributes the Save NYC Spaces town hall to NYC Artist Coalition.", locator: "Opening section", confidence: "high", publicSafe: true },
        { id: "ASSERT-VILLAGE-VOICE-ATTENDANCE", statement: "It estimates about one hundred attendees, including Council and agency representatives.", locator: "Opening section", confidence: "moderate", publicSafe: true }
      ],
      limitations: ["The article does not identify Jamie's production role and its attendance figure is a journalistic estimate."],
      entityIds: ["NYC-Artist-Coalition"],
      themeIds: ["public-convening", "office-of-nightlife"],
      candidateClaimIds: ["CND-NYCAC-SOLE-POLICY-CAUSALITY"]
    },
    {
      id: "READ-NYC-MAYOR-CURE-MARCH-2023",
      sourceId: "SRC-NYC-MAYOR-CURE-MARCH-2023",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        { id: "ASSERT-CURE-OUTCOME", statement: "The administration announced the end of MARCH enforcement and launch of CURE in December 2023.", locator: "Announcement and mayoral remarks", confidence: "high", publicSafe: true },
        { id: "ASSERT-CURE-NYCAC", statement: "The event acknowledged NYC Artist Coalition among advocates connected to the issue.", locator: "Opening acknowledgments", confidence: "high", publicSafe: true }
      ],
      limitations: ["The acknowledgment does not establish Jamie's individual role or a sole causal chain from earlier campaigns."],
      entityIds: ["NYC-Artist-Coalition", "NYC-Mayors-Office"],
      themeIds: ["march", "policy-outcome", "cooperative-compliance"],
      candidateClaimIds: ["CND-NYCAC-SOLE-POLICY-CAUSALITY"]
    },
    {
      id: "READ-CREATENYC-NYCAC-APPENDIX-2017",
      sourceId: "SRC-CREATENYC-NYCAC-APPENDIX-2017",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        { id: "ASSERT-CREATENYC-RECOMMENDATIONS", statement: "The City-hosted appendix preserves NYC Artist Coalition recommendations for community-driven spaces.", locator: "Pages 4-10", confidence: "high", publicSafe: true },
        { id: "ASSERT-CREATENYC-WOWLIST", statement: "The appendix uses WOWList event links for public meetings and deadlines.", locator: "Pages 2-4", confidence: "high", publicSafe: true }
      ],
      limitations: ["The appendix does not name Jamie as author or show which recommendations the City adopted."],
      entityIds: ["NYC-Artist-Coalition", "WOWList", "NYC-Department-Cultural-Affairs"],
      themeIds: ["public-planning", "community-spaces", "event-distribution"],
      candidateClaimIds: ["CND-NYCAC-SOLE-POLICY-CAUSALITY", "CND-WOWLIST-SBDIY-CALENDAR-USE"]
    },
    {
      id: "READ-SBDIY-WOWLIST-CALENDAR",
      sourceId: "SRC-SBDIY-WOWLIST-CALENDAR",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        { id: "ASSERT-SBDIY-DEDICATED-CALENDAR", statement: "SBDIY links to a dedicated WOWList community calendar.", locator: "Upcoming Events", confidence: "high", publicSafe: true },
        { id: "ASSERT-SBDIY-ADD-EVENT", statement: "SBDIY invites visitors to add events through that calendar.", locator: "Upcoming Events", confidence: "high", publicSafe: true }
      ],
      limitations: ["The current state of the linked WOWList page and total platform adoption are not established."],
      entityIds: ["SBDIY", "WOWList"],
      themeIds: ["community-calendar", "external-use"],
      candidateClaimIds: ["CND-WOWLIST-SBDIY-CALENDAR-USE"]
    },
    {
      id: "READ-KCMO-KC-TOWN-HALL-PROPOSAL-2019",
      sourceId: "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        { id: "ASSERT-KCTH-PRESENTER", statement: "The board packet names Jamie as KC Town Hall's developer/presenter.", locator: "Proposal 16, page 5", confidence: "high", publicSafe: true },
        { id: "ASSERT-KCTH-REQUEST", statement: "It lists a $490,539 request for four retail spaces and three apartments at 36th and Indiana.", locator: "Proposal 16, page 5", confidence: "high", publicSafe: true },
        { id: "ASSERT-KCTH-RECOMMENDATION", statement: "The board unanimously recommended the project to the City Council for approval and $490,539 in funding.", locator: "Board action, page 12", confidence: "high", publicSafe: true }
      ],
      limitations: ["A board recommendation is not proof of final City Council approval, contract execution, disbursement, or completed redevelopment."],
      entityIds: ["Jamie-Burkart", "KC-Town-Hall", "KCMO"],
      themeIds: ["adaptive-reuse", "municipal-review", "funding-request"],
      candidateClaimIds: ["CND-KC-TOWN-HALL-MUNICIPAL-RECORD", "CND-KC-TOWN-HALL-FUNDING-AWARD"]
    },
    {
      id: "READ-KCMO-KC-TOWN-HALL-MINUTES-2021",
      sourceId: "SRC-KCMO-KC-TOWN-HALL-MINUTES-2021",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        { id: "ASSERT-KCTH-2021-PARTICIPATION", statement: "The meeting packet lists Jamie with KC Town Hall among community participants.", locator: "Community participants list", confidence: "high", publicSafe: true },
        { id: "ASSERT-KCTH-2021-CONTINUITY", statement: "The record corroborates continued public participation for the project in 2021.", locator: "Community participants list", confidence: "moderate", publicSafe: true }
      ],
      limitations: ["The participant list does not establish an award, construction completion, or the outcome of every discussion."],
      entityIds: ["Jamie-Burkart", "KC-Town-Hall", "KCMO"],
      themeIds: ["municipal-review", "project-continuity"],
      candidateClaimIds: ["CND-KC-TOWN-HALL-MUNICIPAL-RECORD", "CND-KC-TOWN-HALL-FUNDING-AWARD"]
    },
    {
      id: "READ-KCUR-EIGHTH-STREET-TUNNEL-2016",
      sourceId: "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016",
      readAt: "2026-07-12",
      reader: "Codex source review",
      assertions: [
        { id: "ASSERT-TUNNEL-PROGRAM", statement: "KCUR reports that Jamie hosted a 2006 tunnel film screening after leading participants through downtown Kansas City.", locator: "Public-program section", confidence: "high", publicSafe: true },
        { id: "ASSERT-TUNNEL-PUBLIC-HISTORY", statement: "The program connected film, navigation, transit history, and an argument for public educational access.", locator: "Public-program section", confidence: "high", publicSafe: true }
      ],
      limitations: ["The article does not establish formal permission, the complete audience, or present-day access."],
      entityIds: ["Jamie-Burkart", "KCMO-Eighth-Street-Tunnel"],
      themeIds: ["participatory-public-systems", "public-history", "urban-navigation"],
      candidateClaimIds: ["CND-EIGHTH-STREET-TUNNEL-PUBLIC-HISTORY"]
    }
  ],
  candidateClaims: [
    {
      id: "CND-NYCAC-PUBLIC-TESTIMONY",
      project: "nyc-artist-coalition",
      text: "Jamie represented NYC Artist Coalition in public Council testimony on Cabaret Law repeal and MARCH transparency.",
      status: "promoted",
      sourceIds: ["SRC-NYC-COUNCIL-CABARET-HEARING-2017", "SRC-NYC-COUNCIL-MARCH-HEARING-2019"],
      researchInquiryIds: [],
      supportSummary: "Two official transcripts directly record Jamie's identity, public testimony, and specific advocacy.",
      missingEvidence: [],
      boundaries: ["Do not turn testimony into sole policy causality or treat every witness statement as independently verified."],
      promotedClaimId: "CLM-NYCAC-PUBLIC-TESTIMONY-2017-2019",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-NYCAC-SOLE-POLICY-CAUSALITY",
      project: "nyc-artist-coalition",
      text: "Jamie's work through NYC Artist Coalition caused Cabaret Law repeal, creation of the Office of Nightlife, and replacement of MARCH.",
      status: "hold",
      sourceIds: ["SRC-VICE-NYCAC-DIY-SAFETY-2017", "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017", "SRC-NYC-MAYOR-CURE-MARCH-2023", "SRC-CREATENYC-NYCAC-APPENDIX-2017", "SRC-NYC-COUNCIL-CABARET-HEARING-2017", "SRC-NYC-COUNCIL-MARCH-HEARING-2019"],
      researchInquiryIds: ["INQ-NYCAC-OFFICE-NIGHTLIFE-ROLE-2026", "INQ-TALKS-NOT-RAIDS-DISBAND-CAUSALITY-2026"],
      supportSummary: "The record establishes direct advocacy, coalition activity, and later outcomes, but not one-person or one-organization causality.",
      missingEvidence: ["decision-maker testimony allocating causal influence", "a complete coalition and legislative chronology"],
      boundaries: ["Keep outcomes collective and distinguish participation, influence, enactment, and later policy change."],
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-WOWLIST-SBDIY-CALENDAR-USE",
      project: "wowlist",
      text: "SBDIY used WOWList as a dedicated community calendar and invited public event submissions.",
      status: "promoted",
      sourceIds: ["SRC-SBDIY-WOWLIST-CALENDAR", "SRC-CREATENYC-NYCAC-APPENDIX-2017"],
      researchInquiryIds: [],
      supportSummary: "The SBDIY site directly shows a dedicated calendar and submission invitation; the CreateNYC appendix independently shows WOWList event-distribution links.",
      missingEvidence: [],
      boundaries: ["Use as one external-use example, not a quantitative adoption measure."],
      promotedClaimId: "CLM-WOWLIST-SBDIY-CALENDAR-USE",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-KC-TOWN-HALL-MUNICIPAL-RECORD",
      project: "kc-town-hall",
      text: "Kansas City records identify Jamie as KC Town Hall's developer/presenter, record a unanimous board recommendation, and establish subsequent Council authorization and appropriation.",
      status: "promoted",
      sourceIds: ["SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019", "SRC-KCMO-KC-TOWN-HALL-RESOLUTION-190649-2019", "SRC-KCMO-CCED-ORDINANCE-190642-2019", "SRC-KCMO-KC-TOWN-HALL-MINUTES-2021", "SRC-KCMO-CCED-CLAWBACK-240317-2024"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-AUTHORIZATION-2026"],
      supportSummary: "Official city records establish the named role, adaptive-reuse details, board recommendation, Council authorization and appropriation, continued participation, and later withdrawal.",
      missingEvidence: [],
      boundaries: ["Say Council authorization and appropriation, not receipt or disbursement; include the later withdrawal and reappropriation; do not infer completed construction or current status."],
      promotedClaimId: "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD",
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-KC-TOWN-HALL-FUNDING-AWARD",
      project: "kc-town-hall",
      text: "KC Town Hall received or spent the $490,539 Council allocation.",
      status: "hold",
      sourceIds: ["SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019", "SRC-KCMO-KC-TOWN-HALL-RESOLUTION-190649-2019", "SRC-KCMO-CCED-ORDINANCE-190642-2019", "SRC-KCMO-KC-TOWN-HALL-MINUTES-2021", "SRC-KCMO-CCED-CLAWBACK-240317-2024"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-COUNCIL-AUTHORIZATION-2026"],
      supportSummary: "The Council authorized and appropriated the allocation, but the later ordinance identifies it as unused, records the project's withdrawal, and reappropriates the full amount.",
      missingEvidence: ["executed funding agreement", "disbursement or expenditure record"],
      boundaries: ["Authorization and appropriation are publishable; receipt, expenditure, completed construction, and reasons for withdrawal are not established."],
      reviewedAt: "2026-07-12"
    },
    {
      id: "CND-EIGHTH-STREET-TUNNEL-PUBLIC-HISTORY",
      project: "participatory-public-systems",
      text: "Jamie created a participatory public-history program combining a downtown route, a film screening, and Kansas City transit history in the 8th Street Tunnel.",
      status: "hold",
      sourceIds: ["SRC-KCUR-EIGHTH-STREET-TUNNEL-2016"],
      researchInquiryIds: [],
      supportSummary: "Independent public-radio reporting directly documents the 2006 program and Jamie's educational-access framing.",
      missingEvidence: [],
      boundaries: ["Do not imply present-day tunnel access or formal permission not established by the source."],
      reviewedAt: "2026-07-12"
    }
  ],
  promotions: [
    { id: "PROM-NYCAC-PUBLIC-TESTIMONY", candidateClaimId: "CND-NYCAC-PUBLIC-TESTIMONY", claimId: "CLM-NYCAC-PUBLIC-TESTIMONY-2017-2019", decision: "promoted", reason: "Official transcripts make Jamie's public role specific and directly legible without overstating policy causality.", decidedAt: "2026-07-12", decidedBy: ["Jamie Burkart", "Codex source review"] },
    { id: "PROM-NYCAC-SOLE-POLICY-CAUSALITY-HOLD", candidateClaimId: "CND-NYCAC-SOLE-POLICY-CAUSALITY", decision: "held", reason: "The evidence establishes participation and collective advocacy, not sole causality across three outcomes.", decidedAt: "2026-07-12", decidedBy: ["Codex source review"] },
    { id: "PROM-WOWLIST-SBDIY-CALENDAR-USE", candidateClaimId: "CND-WOWLIST-SBDIY-CALENDAR-USE", claimId: "CLM-WOWLIST-SBDIY-CALENDAR-USE", decision: "promoted", reason: "A concrete external-use example strengthens the product story without relying on private user data.", decidedAt: "2026-07-12", decidedBy: ["Jamie Burkart", "Codex source review"] },
    { id: "PROM-KC-TOWN-HALL-MUNICIPAL-RECORD", candidateClaimId: "CND-KC-TOWN-HALL-MUNICIPAL-RECORD", claimId: "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD", decision: "promoted", reason: "Official records make Jamie's role and the proposed adaptive-reuse program concrete.", decidedAt: "2026-07-12", decidedBy: ["Jamie Burkart", "Codex source review"] },
    { id: "PROM-KC-TOWN-HALL-FUNDING-AWARD-HOLD", candidateClaimId: "CND-KC-TOWN-HALL-FUNDING-AWARD", decision: "held", reason: "The Council allocated the funds, but later official records identify the allocation as unused and reappropriate the full amount after withdrawal.", decidedAt: "2026-07-12", decidedBy: ["Codex source review"] },
    { id: "PROM-EIGHTH-STREET-TUNNEL-EDITORIAL-HOLD", candidateClaimId: "CND-EIGHTH-STREET-TUNNEL-PUBLIC-HISTORY", decision: "held", reason: "The claim is defensible and retained for future composition; the current site already carries the participatory throughline and does not need another project example.", decidedAt: "2026-07-12", decidedBy: ["Jamie Burkart", "Codex editorial review"] }
  ],
  editorialBriefs: [
    {
      id: "BRIEF-PORTFOLIO-STRENGTHENING-2026-07-12",
      audience: "Hiring managers, OTI reviewers, referrers, and public-interest technical operations peers",
      goal: "Make Jamie's agency, implementation depth, and externally visible outcomes easier to verify without crowding the portfolio.",
      argument: "Jamie does not only document complex work: he builds public systems, represents collective needs in formal settings, and carries ambiguous initiatives into usable civic and technical forms.",
      selectedClaimIds: ["CLM-NYCAC-PUBLIC-TESTIMONY-2017-2019", "CLM-WOWLIST-SBDIY-CALENDAR-USE", "CLM-KC-TOWN-HALL-MUNICIPAL-RECORD"],
      heldCandidateClaimIds: ["CND-NYCAC-SOLE-POLICY-CAUSALITY", "CND-KC-TOWN-HALL-FUNDING-AWARD", "CND-EIGHTH-STREET-TUNNEL-PUBLIC-HISTORY"],
      rationale: [
        "Use official testimony to make Jamie visible as the actor while keeping outcomes collective.",
        "Use one outside WOWList community to show the product model in use without publishing private platform data.",
        "Use official Kansas City records to show that Jamie's proposal advanced through board recommendation, Council authorization, and appropriation.",
        "Keep receipt, disbursement, causal policy claims, and additional participatory examples in the bank unless evidence and composition warrant projection."
      ],
      createdAt: "2026-07-12"
    }
  ],
  discoveryNotes: [
    {
      id: "DISC-STRENGTHENING-BATCH-NEXT-RESEARCH-2026",
      kind: "agent-research",
      summary: "The Council authorization question is resolved; future KC Town Hall research may examine agreement negotiations, withdrawal context, and project afterlife while other priorities remain fire-safety corroboration, coalition production testimony, and public traces of WOWList adoption.",
      projectHints: ["kc-town-hall", "nyc-artist-coalition", "wowlist"],
      sourceIds: ["SRC-NYC-COUNCIL-MARCH-HEARING-2019", "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019", "SRC-KCMO-CCED-CLAWBACK-240317-2024", "SRC-SBDIY-WOWLIST-CALENDAR"],
      candidateClaimIds: ["CND-NYCAC-SOLE-POLICY-CAUSALITY", "CND-KC-TOWN-HALL-FUNDING-AWARD", "CND-WOWLIST-SBDIY-CALENDAR-USE"],
      rightsReviewRequired: false,
      status: "researching",
      createdAt: "2026-07-12"
    }
  ]
};
