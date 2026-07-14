import type {
  ClaimRecord,
  EntityRecord,
  IntakeRecord,
  ProjectionDecision,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

export const sourceExpansionEntities = [
  {
    id: "ENT-SUNDAY-DINNER",
    kind: "program",
    label: "Sunday Dinner",
    publicSafeSummary: "A recurring Brooklyn dinner opened to the wider community and connected to Jamie's community-event practice.",
    aliases: ["Sunday night dinners"],
    projectKey: "sunday-dinner",
    relatedEntityIds: ["ENT-WOWLIST", "ENT-NYC-ARTIST-COALITION"],
    status: "historical"
  },
  {
    id: "ENT-KC-TOWN-HALL",
    kind: "project",
    label: "KC Town-Hall",
    publicSafeSummary: "A Kansas City mixed-use building proposal that advanced from a unanimous Central City Economic Development board recommendation to a $490,539 City Council appropriation and funding-agreement negotiations; the unused allocation was later reclaimed after the project withdrew.",
    aliases: ["KC Town Hall"],
    projectKey: "kc-town-hall",
    relatedEntityIds: [],
    status: "historical"
  },
  {
    id: "ENT-CLAUDETTE-AR",
    kind: "project",
    label: "Claudette's Theatre on Wheels augmented-reality experience",
    publicSafeSummary: "A collaborative augmented-reality and video project created for Make Use Visible in Munich.",
    aliases: ["Claudette's Theatre on Wheels", "Make Use Visible Munich"],
    projectKey: "claudette-ar",
    relatedEntityIds: [],
    status: "historical"
  }
] satisfies EntityRecord[];

export const sourceExpansionIntake = [
  {
    id: "INTAKE-GREENE-HILL-QA-2017",
    receivedAt: "2026-07-13",
    kind: "public-url",
    publicSafeSummary: "Greene Hill Food Co-op interview connecting Jamie's weekly community dinners, WOWList, coalition advocacy, mutual aid, and Office of Nightlife town-hall work.",
    submittedBy: "Jamie Burkart",
    sourceUrl: "https://www.greenehillfood.coop/master-blog/2017/12/september-2017-newsletter",
    entityIds: ["ENT-SUNDAY-DINNER", "ENT-WOWLIST", "ENT-NYC-ARTIST-COALITION", "ENT-OFFICE-OF-NIGHTLIFE"],
    disposition: "source-created",
    sourceIds: ["SRC-GREENE-HILL-COOP-QA-2017"],
    claimIds: ["CLM-SUNDAY-DINNER-WEEKLY-COMMUNITY", "CLM-WOWLIST-COMMUNITY-EVENT-SHARING", "CLM-NYCARTC-ORGANIZER-MUTUAL-AID-2017", "CLM-NYCARTC-OFFICE-NIGHTLIFE-TOWN-HALL"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-BEDFORD-DIY-SPACES-2017",
    receivedAt: "2026-07-13",
    kind: "public-url",
    publicSafeSummary: "Independent reporting on Jamie's organizer role, a coalition mutual-aid network, and public working sessions for safer DIY cultural spaces.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://bedfordandbowery.com/2017/02/6-things-to-know-about-making-diy-spaces-work/",
    entityIds: ["ENT-NYC-ARTIST-COALITION"],
    disposition: "source-created",
    sourceIds: ["SRC-BEDFORD-DIY-SPACES-2017"],
    claimIds: ["CLM-NYCARTC-ORGANIZER-MUTUAL-AID-2017"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-BEDFORD-NIGHT-MAYOR-2017",
    receivedAt: "2026-07-13",
    kind: "public-url",
    publicSafeSummary: "Independent reporting on a coalition-spearheaded Office of Nightlife town hall and Jamie's documented participation among coalition speakers.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-OFFICE-OF-NIGHTLIFE"],
    disposition: "source-created",
    sourceIds: ["SRC-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017"],
    claimIds: ["CLM-NYCARTC-OFFICE-NIGHTLIFE-TOWN-HALL"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-SAVE-NYC-SPACES-PLATFORM",
    receivedAt: "2026-07-13",
    kind: "public-url",
    publicSafeSummary: "Coalition-owned public platform concerning small cultural spaces, MARCH transparency, practical support, displacement, and an inclusive Office of Nightlife.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://savenycspaces.nycartc.com/",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-OFFICE-OF-NIGHTLIFE", "ENT-TALKS-NOT-RAIDS", "ENT-FAIR-RENT-NYC"],
    disposition: "source-created",
    sourceIds: ["SRC-SAVE-NYC-SPACES-PLATFORM"],
    claimIds: ["CLM-NYCARTC-SAVE-NYC-SPACES-PLATFORM"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018",
    receivedAt: "2026-07-13",
    kind: "public-url",
    publicSafeSummary: "Official City Council transcript preserving Jamie's 2018 testimony as a NYC Artist Coalition member on cultural-space affordability and commercial lease protections.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=3BAD981A-69D8-4D99-A882-52442F36F5A2&ID=6792384&M=F",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-FAIR-RENT-NYC"],
    disposition: "source-created",
    sourceIds: ["SRC-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018"],
    claimIds: ["CLM-FAIRRENT-CULTURAL-SPACES-TESTIMONY-2018"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-KCMO-KC-TOWN-HALL-2019",
    receivedAt: "2026-07-13",
    kind: "public-url",
    publicSafeSummary: "Kansas City public-board packet naming Jamie as presenter of a KC Town-Hall mixed-use redevelopment proposal and recording the board's unanimous recommendation to City Council for approval and funding.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000",
    entityIds: ["ENT-KC-TOWN-HALL"],
    disposition: "source-created",
    sourceIds: ["SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019"],
    claimIds: ["CLM-KC-TOWN-HALL-CCED-RECOMMENDATION-2019", "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019-2024"],
    researchTaskIds: ["TASK-KC-TOWN-HALL-DOWNSTREAM-OUTCOME"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-KCMO-KC-TOWN-HALL-COUNCIL-MEETING-2019",
    receivedAt: "2026-07-13",
    kind: "public-url",
    publicSafeSummary: "Official Kansas City Council meeting record showing passage of the Round Two CCED appropriation ordinance and adoption of the KC Town Hall funding resolution on September 26, 2019.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://kansascity.legistar.com/MeetingDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GID=821&LEGID=14410",
    entityIds: ["ENT-KC-TOWN-HALL"],
    disposition: "source-created",
    sourceIds: ["SRC-KCMO-COUNCIL-MEETING-2019-09-26"],
    claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019-2024"],
    researchTaskIds: ["TASK-KC-TOWN-HALL-DOWNSTREAM-OUTCOME"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-KCMO-RESOLUTION-190649-2019",
    receivedAt: "2026-07-13",
    kind: "public-url",
    publicSafeSummary: "Official legislative record for Second Committee Substitute for Resolution 190649, accepting the KC Town Hall funding recommendation and authorizing funding-agreement negotiations.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=44A50FFC-321A-41C7-9A86-6ADD9083B156&ID=5515936&Options=&Search=",
    entityIds: ["ENT-KC-TOWN-HALL"],
    disposition: "source-created",
    sourceIds: ["SRC-KCMO-RESOLUTION-190649-2019"],
    claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019-2024"],
    researchTaskIds: ["TASK-KC-TOWN-HALL-DOWNSTREAM-OUTCOME"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-KCMO-ORDINANCE-240317-2024",
    receivedAt: "2026-07-13",
    kind: "public-url",
    publicSafeSummary: "Official 2024 Kansas City ordinance confirming the earlier $490,539 KC Town Hall appropriation and reclaiming the unused allocation after the project withdrew.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://clerk.kcmo.gov/LegislationDetail.aspx?GUID=E3F31A7F-65F8-464E-ABD4-197DEB6D80C8&ID=6586846&Options=&Search=",
    entityIds: ["ENT-KC-TOWN-HALL"],
    disposition: "source-created",
    sourceIds: ["SRC-KCMO-ORDINANCE-240317-2024"],
    claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019-2024"],
    researchTaskIds: ["TASK-KC-TOWN-HALL-DOWNSTREAM-OUTCOME"],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-KCMO-KC-TOWN-HALL-TRANSITION-MEMORY",
    receivedAt: "2026-07-13",
    kind: "public-memory",
    publicSafeSummary: "Jamie reports transitioning KC Town Hall project stewardship to a mission-aligned organization; the handoff chronology and organizational credit require public-safe corroboration.",
    submittedBy: "Jamie Burkart",
    entityIds: ["ENT-KC-TOWN-HALL"],
    disposition: "claim-seed-created",
    sourceIds: [],
    claimIds: ["CLM-KC-TOWN-HALL-TRANSITION-SEED"],
    researchTaskIds: ["TASK-KC-TOWN-HALL-TRANSITION-CHRONOLOGY"],
    rawMaterialPolicy: "protected-outside-repo"
  },
  {
    id: "INTAKE-KCUR-EIGHTH-STREET-TUNNEL-2016",
    receivedAt: "2026-07-13",
    kind: "public-url",
    publicSafeSummary: "Independent public-radio reporting on Jamie's 2006 participatory film screening inside Kansas City's Eighth Street Tunnel.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
    entityIds: ["ENT-RIVER-PUBLIC-ENGAGEMENT"],
    disposition: "source-created",
    sourceIds: ["SRC-KCUR-EIGHTH-STREET-TUNNEL-2016"],
    claimIds: ["CLM-RIVER-TUNNEL-SCREENING-2006"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-PITCH-GREAT-ACCOMMODATIONS-2009",
    receivedAt: "2026-07-13",
    kind: "public-url",
    publicSafeSummary: "Independent retrospective reporting that the collective raft reached the Gulf and that Jamie continued the river inquiry through Great Accommodations.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://www.thepitchkc.com/former-huck-finn-artist-now-working-in-a-pink-plastic-bubble/",
    entityIds: ["ENT-RIVER-PUBLIC-ENGAGEMENT"],
    disposition: "source-created",
    sourceIds: ["SRC-PITCH-GREAT-ACCOMMODATIONS-2009"],
    claimIds: ["CLM-RIVER-EXPEDITION-GULF-COMPLETION"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-WLBT-RAFT-2007",
    receivedAt: "2026-07-13",
    kind: "public-url",
    publicSafeSummary: "Contemporaneous television-news report identifying Jamie as expedition organizer and documenting the three-person crew after more than one thousand river miles.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://www.wlbt.com/story/7123200/rafters-beached-on-mississippi-river/",
    entityIds: ["ENT-RIVER-PUBLIC-ENGAGEMENT"],
    disposition: "source-created",
    sourceIds: ["SRC-WLBT-RAFT-2007"],
    claimIds: ["CLM-RIVER-EXPEDITION-ORGANIZER-2007", "CLM-RIVER-EXPEDITION-GULF-COMPLETION"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  },
  {
    id: "INTAKE-CLAUDETTE-AR-COLLABORATION",
    receivedAt: "2026-07-13",
    kind: "public-url",
    publicSafeSummary: "Collaborator-owned public page documenting Jamie and Michael Rees's augmented-reality collaboration and the shared production of its source video.",
    submittedBy: "Codex public-source research",
    sourceUrl: "https://michaelrees.org/claudette",
    entityIds: ["ENT-CLAUDETTE-AR"],
    disposition: "source-created",
    sourceIds: ["SRC-CLAUDETTE-AR-COLLABORATION"],
    claimIds: ["CLM-CLAUDETTE-AR-COLLABORATION"],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only"
  }
] satisfies IntakeRecord[];

export const sourceExpansionSources = [
  {
    id: "SRC-GREENE-HILL-COOP-QA-2017",
    title: "The Co-op Q&A With Jamie Burkart and Julie Fredenberg",
    organization: "Greene Hill Food Co-op",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-12-19",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://www.greenehillfood.coop/master-blog/2017/12/september-2017-newsletter",
    preferredPublicUrl: "canonical",
    publicCitation: "Greene Hill Food Co-op, 'The Co-op Q&A With Jamie Burkart and Julie Fredenberg,' December 19, 2017.",
    publicNote: "A co-op interview linking recurring community dinners and WOWList with Jamie's public account of coalition advocacy, mutual aid, and town-hall work.",
    intakeIds: ["INTAKE-GREENE-HILL-QA-2017"],
    supportsGenerally: ["weekly community Sunday dinners", "WOWList as a community-event list", "coalition participation", "a planned Office of Nightlife town hall", "mutual aid and advocacy purpose"],
    doesNotEstablish: ["attendance or impact metrics", "sole ownership of Sunday Dinner or WOWList", "a founder title", "that the town hall changed city policy", "sole causation for Cabaret Law repeal"]
  },
  {
    id: "SRC-BEDFORD-DIY-SPACES-2017",
    title: "6 Things to Know About Making DIY Spaces Work",
    organization: "Bedford + Bowery",
    author: "Cassidy Dawn Graves",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-02-07",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://bedfordandbowery.com/2017/02/6-things-to-know-about-making-diy-spaces-work/",
    preferredPublicUrl: "canonical",
    publicCitation: "Cassidy Dawn Graves, '6 Things to Know About Making DIY Spaces Work,' Bedford + Bowery, February 7, 2017.",
    publicNote: "Contemporaneous independent reporting identifying Jamie as a coalition organizer and documenting a practical mutual-aid and safety-policy working session.",
    intakeIds: ["INTAKE-BEDFORD-DIY-SPACES-2017"],
    supportsGenerally: ["Jamie was identified as a NYC Artist Coalition organizer", "the coalition organized a public working meeting", "Jamie reported more than 100 mutual-aid signups"],
    doesNotEstablish: ["the coalition's full founding chronology", "that every signup became an active member", "sole authorship of group recommendations", "policy adoption or measured safety outcomes"]
  },
  {
    id: "SRC-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017",
    title: "What Can the Night Mayor Do? The DIY Scene Discusses",
    organization: "Bedford + Bowery",
    author: "Cassidy Dawn Graves",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-10-12",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
    preferredPublicUrl: "canonical",
    publicCitation: "Cassidy Dawn Graves, 'What Can the Night Mayor Do? The DIY Scene Discusses,' Bedford + Bowery, October 12, 2017.",
    publicNote: "Independent reporting on a coalition-spearheaded town hall with cultural participants and city officials, naming Jamie among coalition speakers.",
    intakeIds: ["INTAKE-BEDFORD-NIGHT-MAYOR-2017"],
    supportsGenerally: ["NYC Artist Coalition spearheaded the town hall", "Jamie was named among coalition speakers", "the event brought community and public officials into dialogue"],
    doesNotEstablish: ["Jamie's sole production role", "sole coalition causation for the Office of Nightlife law", "that every concern changed policy", "a complete participant roster"]
  },
  {
    id: "SRC-SAVE-NYC-SPACES-PLATFORM",
    title: "Save NYC Spaces: Culture is born in small diverse spaces",
    organization: "NYC Artist Coalition and campaign partners",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://savenycspaces.nycartc.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Artist Coalition and campaign partners, 'Save NYC Spaces: Culture is born in small diverse spaces.'",
    publicNote: "A project-owned platform preserving coalition priorities, partner credit, public statements, and media from the Office of Nightlife town-hall effort.",
    intakeIds: ["INTAKE-SAVE-NYC-SPACES-PLATFORM"],
    supportsGenerally: ["a public platform for small diverse cultural spaces", "calls for MARCH transparency and anti-displacement work", "a named Jamie statement", "a multi-organization coalition"],
    doesNotEstablish: ["individual authorship of the platform", "implementation of every recommendation", "the end of MARCH operations", "sole coalition causation for later city action"]
  },
  {
    id: "SRC-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018",
    title: "New York City Council Committee on Small Business transcript",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2018-10-22",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=3BAD981A-69D8-4D99-A882-52442F36F5A2&ID=6792384&M=F",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, Committee on Small Business transcript, October 22, 2018, pp. 346-348.",
    publicNote: "Official transcript of Jamie's testimony as a NYC Artist Coalition member concerning cultural-space affordability and commercial lease protections.",
    intakeIds: ["INTAKE-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018"],
    supportsGenerally: ["Jamie testified before the Council", "Jamie identified himself with NYC Artist Coalition", "he connected cultural-space safety and survival to commercial affordability", "he advocated for the Small Business Jobs Survival Act"],
    doesNotEstablish: ["that Jamie drafted the legislation", "passage or implementation of the bill", "that his testimony caused Council action", "agreement with every claim made by other witnesses"]
  },
  {
    id: "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019",
    title: "Central City Economic Development Sales Tax Board meeting packet",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000",
    preferredPublicUrl: "canonical",
    publicCitation: "City of Kansas City, Missouri, Central City Economic Development Sales Tax Board meeting packet, 2019.",
    publicNote: "A public packet naming Jamie as presenter for a KC Town-Hall mixed-use renovation proposal, recording the requested amount and proposed uses, and documenting the board's unanimous July 16 recommendation to City Council for approval and funding.",
    intakeIds: ["INTAKE-KCMO-KC-TOWN-HALL-2019"],
    supportsGenerally: ["Jamie was the named presenter", "the proposal concerned KC Town-Hall", "the proposal described four retail spaces and three apartments", "the recorded request was $490,539", "the board unanimously recommended the proposal to City Council for approval and funding"],
    doesNotEstablish: ["that City Council adopted the recommendation", "that a funding agreement was executed", "that money was disbursed", "that construction was completed", "sole ownership or authorship of the project"]
  },
  {
    id: "SRC-KCMO-COUNCIL-MEETING-2019-09-26",
    title: "Kansas City Council meeting record, September 26, 2019",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-09-26",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://kansascity.legistar.com/MeetingDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GID=821&LEGID=14410",
    preferredPublicUrl: "canonical",
    publicCitation: "City of Kansas City, Missouri, Council meeting record, September 26, 2019, files 190642 and 190649.",
    publicNote: "The official meeting record shows the Council passed the Round Two CCED appropriation ordinance as substituted and adopted the KC Town Hall funding resolution as substituted on September 26, 2019.",
    intakeIds: ["INTAKE-KCMO-KC-TOWN-HALL-COUNCIL-MEETING-2019"],
    supportsGenerally: ["Council passage of Ordinance 190642", "Council adoption of Resolution 190649", "the September 26, 2019 action date"],
    doesNotEstablish: ["an individual roll-call vote", "execution of a funding agreement", "disbursement of funds", "construction or completion"]
  },
  {
    id: "SRC-KCMO-RESOLUTION-190649-2019",
    title: "Second Committee Substitute for Resolution 190649",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-09-26",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=44A50FFC-321A-41C7-9A86-6ADD9083B156&ID=5515936&Options=&Search=",
    preferredPublicUrl: "canonical",
    publicCitation: "City of Kansas City, Missouri, Second Committee Substitute for Resolution 190649, adopted September 26, 2019.",
    publicNote: "The adopted resolution accepted use of up to $490,539 in CCED sales-tax revenue for eligible KC Town Hall project costs and authorized the City Manager to negotiate a funding agreement subject to specified uses and conditions.",
    intakeIds: ["INTAKE-KCMO-RESOLUTION-190649-2019"],
    supportsGenerally: ["Council acceptance of the $490,539 recommendation", "authorization to negotiate a funding agreement", "conditions limiting eligible uses"],
    doesNotEstablish: ["that a funding agreement was executed", "that funds were disbursed", "that all elements of the original proposal remained eligible", "construction or completion"]
  },
  {
    id: "SRC-KCMO-ORDINANCE-240317-2024",
    title: "Ordinance 240317",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2024-03-28",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://clerk.kcmo.gov/LegislationDetail.aspx?GUID=E3F31A7F-65F8-464E-ABD4-197DEB6D80C8&ID=6586846&Options=&Search=",
    preferredPublicUrl: "canonical",
    publicCitation: "City of Kansas City, Missouri, Ordinance 240317, passed March 28, 2024.",
    publicNote: "The later ordinance confirms that Ordinance 190642 appropriated $490,539 for KC Town Hall, records that the project withdrew and would not proceed, and reappropriates the unused allocation.",
    intakeIds: ["INTAKE-KCMO-ORDINANCE-240317-2024"],
    supportsGenerally: ["the 2019 appropriation to KC Town Hall", "later project withdrawal", "the allocation remained unused", "the 2024 clawback"],
    doesNotEstablish: ["why the project withdrew", "execution of a funding agreement", "any disbursement", "construction or completion", "individual responsibility for the withdrawal"]
  },
  {
    id: "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016",
    title: "The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In",
    organization: "KCUR",
    author: "Cody Newill",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-09-15",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://www.kcur.org/arts-life/2016-09-15/the-8th-street-tunnel-is-a-gateway-to-kansas-citys-history-but-you-probably-cant-get-in",
    preferredPublicUrl: "canonical",
    publicCitation: "Cody Newill, 'The 8th Street Tunnel Is A Gateway To Kansas City's History - But You Probably Can't Get In,' KCUR, September 15, 2016.",
    publicNote: "Retrospective public-radio reporting on Jamie's 2006 screening and public-history framing inside the tunnel.",
    intakeIds: ["INTAKE-KCUR-EIGHTH-STREET-TUNNEL-2016"],
    supportsGenerally: ["Jamie hosted a film screening in the tunnel", "he led participants through downtown beforehand", "the program connected art, shared space, transit history, and public heritage"],
    doesNotEstablish: ["formal authorization for the 2006 event", "attendance totals", "measured educational outcomes", "that the tunnel was safe or generally open to the public"]
  },
  {
    id: "SRC-PITCH-GREAT-ACCOMMODATIONS-2009",
    title: "Former Huck Finn artist now working in a pink, plastic bubble",
    organization: "The Pitch",
    author: "Carolyn Szczepanski",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2009-09-03",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://www.thepitchkc.com/former-huck-finn-artist-now-working-in-a-pink-plastic-bubble/",
    preferredPublicUrl: "canonical",
    publicCitation: "Carolyn Szczepanski, 'Former Huck Finn artist now working in a pink, plastic bubble,' The Pitch, September 3, 2009.",
    publicNote: "Independent retrospective reporting that the collective raft reached the Gulf and that Jamie continued his river inquiry through Great Accommodations.",
    intakeIds: ["INTAKE-PITCH-GREAT-ACCOMMODATIONS-2009"],
    supportsGenerally: ["the collective expedition reached the Gulf of Mexico", "the journey took four months", "Jamie continued the river inquiry through Great Accommodations at Paragraph Gallery"],
    doesNotEstablish: ["sole credit for the expedition", "the exact final landing point or date", "every collaborator's role", "measured exhibition outcomes"]
  },
  {
    id: "SRC-WLBT-RAFT-2007",
    title: "Rafters Beached On Mississippi River",
    organization: "WLBT",
    author: "Bert Case",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2007-09-25",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://www.wlbt.com/story/7123200/rafters-beached-on-mississippi-river/",
    preferredPublicUrl: "canonical",
    publicCitation: "Bert Case, 'Rafters Beached On Mississippi River,' WLBT, September 25, 2007.",
    publicNote: "Contemporaneous reporting during the expedition identifying Jamie as organizer, naming the three-person crew, and documenting more than one thousand river miles.",
    intakeIds: ["INTAKE-WLBT-RAFT-2007"],
    supportsGenerally: ["Jamie organized the journey", "the three-person crew included Libby Hendon and Laura Mattingly", "the crew had traveled more than one thousand miles by late September 2007"],
    doesNotEstablish: ["completion of the later route", "sole authorship of the expedition", "the Coast Guard's final disposition", "every participant or supporter's contribution"]
  },
  {
    id: "SRC-CLAUDETTE-AR-COLLABORATION",
    title: "Claudette's Theatre on Wheels",
    organization: "Studio Michael Rees",
    author: "Michael Rees",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://michaelrees.org/claudette",
    preferredPublicUrl: "canonical",
    publicCitation: "Michael Rees, 'Claudette's Theatre on Wheels,' Studio Michael Rees.",
    publicNote: "A collaborator-owned account of Jamie and Michael Rees's augmented-reality work and the shared production of video material with Anne Dufy Burkart, Julia Fredenburg, and Claudette.",
    intakeIds: ["INTAKE-CLAUDETTE-AR-COLLABORATION"],
    supportsGenerally: ["Jamie and Michael Rees collaborated on an augmented-reality experience", "the work was created for Make Use Visible Munich", "Jamie shared video-production credit with Anne Dufy Burkart and Julia Fredenburg"],
    doesNotEstablish: ["the technical stack", "Jamie's sole authorship", "the division of implementation work", "audience or impact metrics"]
  }
] satisfies SourceRecord[];

export const sourceExpansionReadings = [
  {
    id: "READ-GREENE-HILL-COOP-QA-2017",
    sourceId: "SRC-GREENE-HILL-COOP-QA-2017",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-GREENE-SUNDAY-DINNER-WEEKLY", text: "The co-op describes Jamie and his co-host as opening a Sunday-night dinner to the community every week.", relationToJamie: "collective-role", supportTags: ["weekly-community-dinner"], confidence: "high", locator: "Introductory paragraph" },
      { id: "PROP-GREENE-WOWLIST-EVENTS", text: "The co-op describes Jamie and his co-host as posting a community-event list through WOWList.", relationToJamie: "collective-role", supportTags: ["wowlist-community-events"], confidence: "high", locator: "Introductory paragraph" },
      { id: "PROP-GREENE-NYCARTC-PARTICIPATION", text: "The interview identifies Jamie and his collaborator as working with NYC Artist Coalition on community-space advocacy and Cabaret Law repeal.", relationToJamie: "collective-role", supportTags: ["nycartc-organizing-corroboration"], confidence: "high", locator: "Outside-the-co-op discussion" },
      { id: "PROP-GREENE-OFFICE-TOWN-HALL", text: "Jamie invited readers to a town hall intended to put community concerns into dialogue with the new Office of Nightlife.", relationToJamie: "direct-role", supportTags: ["office-nightlife-town-hall-invitation", "office-nightlife-public-dialogue"], confidence: "high", locator: "Outside-the-co-op discussion" },
      { id: "PROP-GREENE-NYCARTC-MUTUAL-AID", text: "The interview describes the coalition as an artist-driven group facilitating mutual aid and advocacy for community spaces.", relationToJamie: "project-context", supportTags: ["nycartc-mutual-aid-purpose"], confidence: "high", locator: "How members can get involved" }
    ],
    limitations: ["The Q&A combines institutional framing with participant accounts and does not independently audit every statement.", "It does not establish attendance, adoption, founder status, or policy causation."],
    researchTaskIds: []
  },
  {
    id: "READ-BEDFORD-DIY-SPACES-2017",
    sourceId: "SRC-BEDFORD-DIY-SPACES-2017",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-BEDFORD-NYCARTC-ORGANIZER", text: "Bedford + Bowery identifies Jamie as a NYC Artist Coalition organizer.", relationToJamie: "direct-role", supportTags: ["nycartc-organizer-role"], confidence: "high", locator: "Jamie Burkart quotation attribution" },
      { id: "PROP-BEDFORD-MUTUAL-AID-100", text: "The article reports Jamie's statement that more than 100 people had signed up for the coalition's mutual-aid network and offered varied skills.", relationToJamie: "direct-role", supportTags: ["nycartc-mutual-aid-network", "nycartc-network-scale-reported"], confidence: "high", locator: "Jamie Burkart quotation and paraphrase" },
      { id: "PROP-BEDFORD-DIY-MEETING", text: "The coalition organized a public working session on fire safety and practical policy proposals for DIY spaces.", relationToJamie: "collective-role", supportTags: ["nycartc-practical-working-session"], confidence: "high", locator: "Opening and meeting description" }
    ],
    limitations: ["The organizer label does not by itself establish the coalition's founding chronology.", "The reported signup count is not a measure of active participation, retention, or policy impact."],
    researchTaskIds: []
  },
  {
    id: "READ-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017",
    sourceId: "SRC-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-BEDFORD-TOWN-HALL-SPEARHEADED", text: "Bedford + Bowery reports that NYC Artist Coalition spearheaded the Office of Nightlife town hall.", relationToJamie: "collective-role", supportTags: ["office-nightlife-town-hall-production"], confidence: "high", locator: "Opening paragraphs" },
      { id: "PROP-BEDFORD-JAMIE-SPEAKER", text: "The article names Jamie among NYC Artist Coalition speakers who had participated in prior hearings or town halls.", relationToJamie: "direct-role", supportTags: ["office-nightlife-jamie-speaker"], confidence: "high", locator: "Speaker description" },
      { id: "PROP-BEDFORD-COALITION-INSTRUMENTAL", text: "The reporter characterizes the coalition as instrumental in advocacy for Office of Nightlife and Cabaret Law repeal legislation.", relationToJamie: "outcome-context", supportTags: ["office-nightlife-coalition-contribution"], confidence: "moderate", locator: "Opening paragraphs" }
    ],
    limitations: ["The town hall and advocacy were collective work involving many organizations, speakers, and public officials.", "The reporter's contribution framing does not establish sole or but-for causation for legislation or policy."],
    researchTaskIds: []
  },
  {
    id: "READ-SAVE-NYC-SPACES-PLATFORM",
    sourceId: "SRC-SAVE-NYC-SPACES-PLATFORM",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-SAVE-PLATFORM", text: "The project surface calls for preventing criminalization, transparency on MARCH raids, practical support for community spaces, and anti-displacement policy.", relationToJamie: "project-context", supportTags: ["save-nyc-spaces-platform"], confidence: "high", locator: "Campaign priorities" },
      { id: "PROP-SAVE-JAMIE-STATEMENT", text: "The page attributes to Jamie a statement connecting small, diverse spaces with New York cultural traditions.", relationToJamie: "direct-role", supportTags: ["save-nyc-spaces-jamie-statement"], confidence: "high", locator: "Named public statement" },
      { id: "PROP-SAVE-COALITION-PARTNERS", text: "The page credits a multi-organization coalition spanning cultural groups and venues.", relationToJamie: "collective-role", supportTags: ["save-nyc-spaces-collective-credit"], confidence: "high", locator: "Coalition list" }
    ],
    limitations: ["The project-owned page does not attribute authorship of each platform item.", "A public demand for MARCH transparency does not establish institutional response, operational change, or program dissolution."],
    researchTaskIds: []
  },
  {
    id: "READ-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018",
    sourceId: "SRC-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-SBJSA-JAMIE-TESTIMONY", text: "The official transcript records Jamie testifying as a member of NYC Artist Coalition before the Committee on Small Business.", relationToJamie: "direct-role", supportTags: ["commercial-rent-public-testimony"], confidence: "high", locator: "Transcript pp. 346-348" },
      { id: "PROP-SBJSA-CULTURAL-SPACES", text: "Jamie argued that cultural spaces are small businesses and connected unaffordable commercial space with displacement and unsafe conditions.", relationToJamie: "direct-role", supportTags: ["commercial-rent-cultural-safety-framing"], confidence: "high", locator: "Transcript pp. 347-348" },
      { id: "PROP-SBJSA-POLICY-ASK", text: "Jamie publicly asked the Council to pass the Small Business Jobs Survival Act and preserve fair lease renewal for cultural spaces.", relationToJamie: "direct-role", supportTags: ["commercial-rent-policy-advocacy"], confidence: "high", locator: "Transcript p. 348" }
    ],
    limitations: ["The transcript preserves Jamie's public testimony; it does not independently validate every example or policy premise in that testimony.", "It does not establish that Jamie drafted the bill, caused a vote, or secured enactment."],
    researchTaskIds: []
  },
  {
    id: "READ-KCMO-KC-TOWN-HALL-2019",
    sourceId: "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-KCTOWN-PRESENTER", text: "The public packet names Jamie as presenter for proposal 16, KC Town-Hall.", relationToJamie: "direct-role", supportTags: ["kc-town-hall-presenter"], confidence: "high", locator: "Proposal table, p. 5" },
      { id: "PROP-KCTOWN-PROPOSAL", text: "The proposal described renovating an existing building for four retail spaces and three apartments at 36th and Indiana.", relationToJamie: "project-context", supportTags: ["kc-town-hall-mixed-use-program"], confidence: "high", locator: "Proposal table, p. 5" },
      { id: "PROP-KCTOWN-REQUEST", text: "The proposal table records a CCED request of $490,539.", relationToJamie: "project-context", supportTags: ["kc-town-hall-funding-request"], confidence: "high", locator: "Proposal table, p. 5" },
      { id: "PROP-KCTOWN-BOARD-RECOMMENDATION", text: "The July 16 minutes record a unanimous board vote recommending KC Town-Hall to City Council for approval and funding at $490,539.", relationToJamie: "outcome-context", supportTags: ["kc-town-hall-board-recommendation"], confidence: "high", locator: "July 16, 2019 minutes, p. 12" }
    ],
    limitations: ["A board recommendation is not final City Council action, an executed funding agreement, a disbursement, construction, or a completed development.", "The packet does not establish sole ownership or authorship."],
    researchTaskIds: ["TASK-KC-TOWN-HALL-DOWNSTREAM-OUTCOME"]
  },
  {
    id: "READ-KCMO-COUNCIL-MEETING-2019-09-26",
    sourceId: "SRC-KCMO-COUNCIL-MEETING-2019-09-26",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-KCTOWN-COUNCIL-ORDINANCE-190642-PASSED", text: "The Council meeting record shows Ordinance 190642 passed as substituted on September 26, 2019, reappropriating Round Two CCED project funds into designated accounts.", relationToJamie: "outcome-context", supportTags: ["kc-town-hall-council-appropriation-vote"], confidence: "high", locator: "Council meeting record, file 190642" },
      { id: "PROP-KCTOWN-COUNCIL-RESOLUTION-190649-ADOPTED", text: "The same meeting record shows Resolution 190649 adopted as substituted, accepting the $490,539 KC Town Hall funding recommendation and authorizing funding-agreement negotiations.", relationToJamie: "outcome-context", supportTags: ["kc-town-hall-council-resolution-adoption"], confidence: "high", locator: "Council meeting record, file 190649" }
    ],
    limitations: ["The meeting page reports passage and adoption but does not expose an individual roll call.", "Council action did not itself execute a funding agreement, disburse money, or complete the development."],
    researchTaskIds: ["TASK-KC-TOWN-HALL-DOWNSTREAM-OUTCOME"]
  },
  {
    id: "READ-KCMO-RESOLUTION-190649-2019",
    sourceId: "SRC-KCMO-RESOLUTION-190649-2019",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-KCTOWN-RESOLUTION-ACCEPTS-FUNDING", text: "Resolution 190649 accepts the CCED Board recommendation to use an amount not to exceed $490,539 for eligible KC Town Hall project costs.", relationToJamie: "outcome-context", supportTags: ["kc-town-hall-council-funding-acceptance"], confidence: "high", locator: "Second Committee Substitute, Section 1" },
      { id: "PROP-KCTOWN-RESOLUTION-AUTHORIZES-NEGOTIATION", text: "The resolution authorizes the City Manager to negotiate a funding agreement with KC Town Hall subject to specified uses and conditions.", relationToJamie: "outcome-context", supportTags: ["kc-town-hall-funding-negotiation-authorized"], confidence: "high", locator: "Second Committee Substitute, Sections 2-3" },
      { id: "PROP-KCTOWN-RESOLUTION-LIMITS-USES", text: "The substituted resolution limited eligible CCED uses and did not preserve every element of the initial board-stage proposal as a funded use.", relationToJamie: "limitation", supportTags: ["kc-town-hall-council-funding-conditions"], confidence: "high", locator: "Second Committee Substitute, Sections 2-3" }
    ],
    limitations: ["Authorization to negotiate is not an executed funding agreement or a disbursement.", "The substituted resolution conditions eligible costs and therefore should not be summarized as unrestricted funding for the original proposal."],
    researchTaskIds: ["TASK-KC-TOWN-HALL-DOWNSTREAM-OUTCOME"]
  },
  {
    id: "READ-KCMO-ORDINANCE-240317-2024",
    sourceId: "SRC-KCMO-ORDINANCE-240317-2024",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-KCTOWN-ORDINANCE-190642-APPROPRIATED", text: "Ordinance 240317 states that Ordinance 190642 appropriated $490,539 from the Central City Sales Tax Fund for the CCED project awarded to KC Town Hall.", relationToJamie: "outcome-context", supportTags: ["kc-town-hall-council-appropriation-confirmed"], confidence: "high", locator: "Ordinance 240317, first WHEREAS clause" },
      { id: "PROP-KCTOWN-PROJECT-WITHDREW", text: "The 2024 ordinance states that KC Town Hall withdrew and would no longer proceed with the project.", relationToJamie: "outcome-context", supportTags: ["kc-town-hall-project-withdrawal"], confidence: "high", locator: "Ordinance 240317, third WHEREAS clause" },
      { id: "PROP-KCTOWN-UNUSED-FUNDS-REAPPROPRIATED", text: "The ordinance reduces the KC Town Hall project account by $490,539 and reappropriates the unused funds for future awards.", relationToJamie: "outcome-context", supportTags: ["kc-town-hall-unused-funds-clawed-back"], confidence: "high", locator: "Ordinance 240317, Sections 1-2" }
    ],
    limitations: ["The ordinance does not state why KC Town Hall withdrew or assign individual responsibility.", "The clawback confirms that the allocation remained unused; it does not erase the earlier Council appropriation."],
    researchTaskIds: ["TASK-KC-TOWN-HALL-DOWNSTREAM-OUTCOME"]
  },
  {
    id: "READ-KCUR-EIGHTH-STREET-TUNNEL-2016",
    sourceId: "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-TUNNEL-SCREENING", text: "KCUR reports that Jamie hosted a three-film screening in Kansas City's Eighth Street Tunnel in 2006.", relationToJamie: "direct-role", supportTags: ["tunnel-screening-production"], confidence: "high", locator: "Jamie Burkart section" },
      { id: "PROP-TUNNEL-SCAVENGER", text: "The screening followed a participant route through downtown described as a scavenger hunt of sorts.", relationToJamie: "direct-role", supportTags: ["tunnel-participatory-route"], confidence: "high", locator: "Jamie Burkart section" },
      { id: "PROP-TUNNEL-PUBLIC-HERITAGE", text: "Jamie framed the tunnel as public heritage through which young people could imagine Kansas City's possibilities.", relationToJamie: "direct-role", supportTags: ["tunnel-public-heritage-purpose"], confidence: "high", locator: "Jamie Burkart quotation" }
    ],
    limitations: ["The 2016 article is retrospective reporting about a 2006 event.", "It does not establish authorization, attendance, safety, or measured educational outcomes."],
    researchTaskIds: []
  },
  {
    id: "READ-PITCH-GREAT-ACCOMMODATIONS-2009",
    sourceId: "SRC-PITCH-GREAT-ACCOMMODATIONS-2009",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-PITCH-GULF-COMPLETION", text: "The Pitch reports that Jamie and the collective raft crew reached the Gulf of Mexico four months after leaving Kansas City.", relationToJamie: "collective-role", supportTags: ["river-gulf-completion", "river-four-month-duration"], confidence: "high", locator: "Opening paragraph" },
      { id: "PROP-PITCH-GREAT-ACCOMMODATIONS-CONTINUITY", text: "The article presents Great Accommodations at Paragraph Gallery as a continuation of Jamie's inquiry into the Missouri River's relationship to Kansas City.", relationToJamie: "direct-role", supportTags: ["river-program-continuity"], confidence: "high", locator: "Opening paragraphs" }
    ],
    limitations: ["The completion account is retrospective and does not provide a route log, exact landing point, or final date.", "The expedition and its accomplishment must retain collective credit."],
    researchTaskIds: []
  },
  {
    id: "READ-WLBT-RAFT-2007",
    sourceId: "SRC-WLBT-RAFT-2007",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-WLBT-JAMIE-ORGANIZER", text: "WLBT identifies Jamie as organizer of the river journey.", relationToJamie: "direct-role", supportTags: ["river-expedition-organizer"], confidence: "high", locator: "Crew description" },
      { id: "PROP-WLBT-THOUSAND-MILES", text: "WLBT reports that the crew had traveled more than one thousand river miles by late September 2007.", relationToJamie: "collective-role", supportTags: ["river-thousand-miles-in-progress"], confidence: "high", locator: "Opening report" },
      { id: "PROP-WLBT-COLLABORATORS", text: "The report names Libby Hendon and Laura Mattingly as Jamie's two expedition companions at that point in the journey.", relationToJamie: "collective-role", supportTags: ["river-expedition-crew-credit"], confidence: "high", locator: "Crew description" }
    ],
    limitations: ["The report documents an in-progress expedition dispute and cannot establish later completion.", "The article names the three-person river crew but not every remote supporter or contributor."],
    researchTaskIds: []
  },
  {
    id: "READ-CLAUDETTE-AR-COLLABORATION",
    sourceId: "SRC-CLAUDETTE-AR-COLLABORATION",
    status: "closely-read",
    readAt: "2026-07-13",
    propositions: [
      { id: "PROP-CLAUDETTE-AR-COLLABORATION", text: "Michael Rees's project page states that Jamie and Rees collaborated on an augmented-reality experience for Make Use Visible Munich.", relationToJamie: "collective-role", supportTags: ["claudette-ar-collaboration"], confidence: "high", locator: "Project credits" },
      { id: "PROP-CLAUDETTE-VIDEO-PRODUCTION", text: "The page credits Jamie, Anne Dufy Burkart, and Julia Fredenburg with producing the source video with Claudette.", relationToJamie: "collective-role", supportTags: ["claudette-video-production"], confidence: "high", locator: "Project credits" }
    ],
    limitations: ["The page does not specify the technical stack or divide implementation tasks between collaborators.", "It does not establish sole authorship, audience size, or measured impact."],
    researchTaskIds: []
  }
] satisfies SourceReading[];

export const sourceExpansionClaims = [
  {
    id: "CLM-SUNDAY-DINNER-WEEKLY-COMMUNITY",
    project: "sunday-dinner",
    internalClaim: "In 2017, Greene Hill Food Co-op described Jamie and his co-host as opening a Sunday-night dinner to the Brooklyn community every week.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-GREENE-HILL-QA-2017"],
    requiredSupportTags: ["weekly-community-dinner"],
    composition: {
      action: "Co-hosted a weekly dinner open to the community.",
      intendedEnd: "Create a recurring, low-barrier setting for people to meet and share a meal.",
      usableResult: "A weekly public invitation and recurring community gathering.",
      audience: "Friends, neighbors, and wider Brooklyn community participants.",
      collectiveCredit: "Credit Jamie and his co-host together; the source does not support sole ownership.",
      causalBoundary: "The source establishes recurring public practice, not attendance totals or long-term outcomes."
    },
    projections: [],
    evidence: [{ sourceId: "SRC-GREENE-HILL-COOP-QA-2017", relationship: "direct-support", supports: ["weekly recurrence", "community invitation", "Jamie's co-host role"], propositionIds: ["PROP-GREENE-SUNDAY-DINNER-WEEKLY"], confidence: "high", renderCitation: false }],
    boundaries: ["The source supports a weekly community dinner in 2017, not a lifetime event count or unique-attendee total."],
    antiClaims: ["Jamie solely created or operated every Sunday Dinner.", "The interview proves attendance or impact metrics."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-WOWLIST-COMMUNITY-EVENT-SHARING",
    project: "wowlist",
    internalClaim: "A 2017 co-op interview independently described Jamie and his co-host as using WOWList to publish a list of community events.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-GREENE-HILL-QA-2017"],
    requiredSupportTags: ["wowlist-community-events"],
    composition: {
      action: "Maintained a community-event list through WOWList with a collaborator.",
      intendedEnd: "Help people discover gatherings and cultural activity around them.",
      usableResult: "A public list of community events.",
      audience: "Community members looking for events and shared activity.",
      collectiveCredit: "The source attributes the practice to Jamie and his co-host together.",
      causalBoundary: "The interview corroborates purpose and use, not platform adoption, geographic scale, or Jamie's full technical role."
    },
    projections: [],
    evidence: [{ sourceId: "SRC-GREENE-HILL-COOP-QA-2017", relationship: "direct-support", supports: ["community-event purpose", "Jamie's collaborative role"], propositionIds: ["PROP-GREENE-WOWLIST-EVENTS"], confidence: "high", renderCitation: false }],
    boundaries: ["Use this source for community-event purpose, not for user, event, or city counts."],
    antiClaims: ["The co-op interview proves WOWList adoption or scale.", "Jamie was the only person maintaining WOWList."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-NYCARTC-ORGANIZER-MUTUAL-AID-2017",
    project: "nyc-artist-coalition",
    internalClaim: "By February 2017, independent reporting identified Jamie as a NYC Artist Coalition organizer and documented a coalition working session plus his report that more than 100 people had signed up for its skill-sharing mutual-aid network.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-GREENE-HILL-QA-2017", "INTAKE-BEDFORD-DIY-SPACES-2017"],
    requiredSupportTags: ["nycartc-organizer-role", "nycartc-mutual-aid-network", "nycartc-practical-working-session", "nycartc-mutual-aid-purpose"],
    composition: {
      action: "Organized with NYC Artist Coalition and helped articulate its mutual-aid network and practical public working sessions.",
      intendedEnd: "Help informal cultural spaces share skills, improve safety, and formulate workable recommendations.",
      usableResult: "A public working session and a reported network of more than 100 skill-sharing signups.",
      audience: "DIY cultural-space operators, artists, community leaders, and city agencies.",
      collectiveCredit: "The coalition organized the work collectively; the independent article specifically identifies Jamie as an organizer.",
      causalBoundary: "The evidence establishes organizer status by February 2017, not the complete founding chronology, active-member count, or policy adoption."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-BEDFORD-DIY-SPACES-2017", relationship: "direct-support", supports: ["organizer title", "public working session", "reported mutual-aid signup count"], propositionIds: ["PROP-BEDFORD-NYCARTC-ORGANIZER", "PROP-BEDFORD-MUTUAL-AID-100", "PROP-BEDFORD-DIY-MEETING"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-GREENE-HILL-COOP-QA-2017", relationship: "corroborating", supports: ["Jamie's coalition participation", "mutual-aid and advocacy purpose"], propositionIds: ["PROP-GREENE-NYCARTC-PARTICIPATION", "PROP-GREENE-NYCARTC-MUTUAL-AID"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Retain the separately open research question about Jamie's precise role in the coalition's creation.", "Describe the network number as reported signups, not active members or beneficiaries."],
    antiClaims: ["Jamie solely founded NYC Artist Coalition.", "More than 100 signups equals more than 100 active members or successful mutual-aid exchanges.", "The meeting recommendations were adopted by the city."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-NYCARTC-OFFICE-NIGHTLIFE-TOWN-HALL",
    project: "nyc-artist-coalition",
    internalClaim: "Jamie helped bring small-space concerns into public dialogue with the new Office of Nightlife: he invited participation in the town-hall effort, and independent reporting says the coalition spearheaded a subsequent town hall and names Jamie among coalition speakers.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-GREENE-HILL-QA-2017", "INTAKE-BEDFORD-NIGHT-MAYOR-2017"],
    requiredSupportTags: ["office-nightlife-town-hall-invitation", "office-nightlife-public-dialogue", "office-nightlife-town-hall-production", "office-nightlife-jamie-speaker"],
    composition: {
      action: "Invited community participation and spoke through a coalition-spearheaded Office of Nightlife town-hall process.",
      intendedEnd: "Make the concerns of small, diverse, and less-resourced cultural spaces legible to the new city office.",
      usableResult: "A public town hall bringing cultural participants and city officials into structured dialogue.",
      audience: "Cultural-space operators, community members, city officials, and the new Office of Nightlife.",
      collectiveCredit: "NYC Artist Coalition spearheaded the town hall with many partner organizations, speakers, and officials; Jamie is documented as one coalition participant and speaker.",
      causalBoundary: "The sources establish participation and collective production, not sole authorship, policy adoption, or Jamie's precise share in creating the office itself."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-GREENE-HILL-COOP-QA-2017", relationship: "direct-support", supports: ["Jamie's invitation", "the public-dialogue purpose"], propositionIds: ["PROP-GREENE-OFFICE-TOWN-HALL"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017", relationship: "direct-support", supports: ["coalition production", "Jamie's speaker role"], propositionIds: ["PROP-BEDFORD-TOWN-HALL-SPEARHEADED", "PROP-BEDFORD-JAMIE-SPEAKER"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Keep Jamie's contribution distinct from the coalition's collective role and the actions of Council members and city agencies."],
    antiClaims: ["Jamie alone created the Office of Nightlife.", "Jamie solely produced the town hall.", "The town hall demonstrably changed city policy."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-NYCARTC-SAVE-NYC-SPACES-PLATFORM",
    project: "nyc-artist-coalition",
    internalClaim: "Jamie contributed a named public statement to the multi-organization Save NYC Spaces platform, which called for MARCH transparency, practical support for community spaces, and anti-displacement policy.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-SAVE-NYC-SPACES-PLATFORM"],
    requiredSupportTags: ["save-nyc-spaces-platform", "save-nyc-spaces-jamie-statement", "save-nyc-spaces-collective-credit"],
    composition: {
      action: "Contributed a named public statement to a coalition platform for small, diverse cultural spaces.",
      intendedEnd: "Shape the Office of Nightlife agenda around safety, trust, anti-displacement, and transparency.",
      usableResult: "A public platform, coalition roster, media kit, and articulated set of policy priorities.",
      audience: "The Office of Nightlife, city officials, cultural-space communities, and the public.",
      collectiveCredit: "The platform credits NYC Artist Coalition and many partner organizations; Jamie is one named contributor.",
      causalBoundary: "The source establishes the public platform and Jamie's statement, not authorship of every recommendation or implementation of the agenda."
    },
    projections: [],
    evidence: [{ sourceId: "SRC-SAVE-NYC-SPACES-PLATFORM", relationship: "direct-support", supports: ["platform priorities", "Jamie's named contribution", "multi-organization credit"], propositionIds: ["PROP-SAVE-PLATFORM", "PROP-SAVE-JAMIE-STATEMENT", "PROP-SAVE-COALITION-PARTNERS"], confidence: "high", renderCitation: false }],
    boundaries: ["Use the page as a project-owned record of stated priorities, not proof of institutional outcomes."],
    antiClaims: ["Jamie authored the entire platform.", "The platform caused MARCH to end.", "Every recommendation was adopted."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-FAIRRENT-CULTURAL-SPACES-TESTIMONY-2018",
    project: "fair-rent-nyc",
    internalClaim: "In October 2018, Jamie testified before the New York City Council as a NYC Artist Coalition member, linking commercial affordability to cultural-space safety and advocating for fair lease renewal through the Small Business Jobs Survival Act.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018"],
    requiredSupportTags: ["commercial-rent-public-testimony", "commercial-rent-cultural-safety-framing", "commercial-rent-policy-advocacy"],
    composition: {
      action: "Testified before the City Council for commercial lease protections for cultural spaces.",
      intendedEnd: "Keep neighborhood cultural spaces affordable, safer, and able to remain in their communities.",
      usableResult: "A public, on-the-record policy argument connecting cultural survival, safety, and fair lease renewal.",
      audience: "City Council members, small-business stakeholders, cultural-space communities, and the public.",
      collectiveCredit: "Jamie testified as a NYC Artist Coalition member within a large hearing involving many advocates and opposing viewpoints.",
      causalBoundary: "The transcript proves testimony and advocacy, not authorship, passage, or causal effect on legislation."
    },
    projections: [],
    evidence: [{ sourceId: "SRC-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018", relationship: "direct-support", supports: ["public testimony", "coalition identity", "safety and affordability framing", "policy request"], propositionIds: ["PROP-SBJSA-JAMIE-TESTIMONY", "PROP-SBJSA-CULTURAL-SPACES", "PROP-SBJSA-POLICY-ASK"], confidence: "high", renderCitation: false }],
    boundaries: ["Attribute the testimony to Jamie and distinguish it from proof of legislative adoption or policy efficacy."],
    antiClaims: ["Jamie drafted the Small Business Jobs Survival Act.", "Jamie's testimony caused the Council to enact commercial-rent protections.", "The testimony proves every factual premise stated at the hearing."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-CCED-RECOMMENDATION-2019",
    project: "kc-town-hall",
    internalClaim: "A 2019 Kansas City public-board packet names Jamie as presenter of a KC Town-Hall proposal to renovate an existing building at 36th and Indiana into four retail spaces and three apartments; the board unanimously recommended the $490,539 request to City Council for approval and funding.",
    status: "superseded",
    maturity: "superseded",
    intakeIds: ["INTAKE-KCMO-KC-TOWN-HALL-2019"],
    requiredSupportTags: ["kc-town-hall-presenter", "kc-town-hall-mixed-use-program", "kc-town-hall-funding-request", "kc-town-hall-board-recommendation"],
    composition: {
      action: "Presented a mixed-use neighborhood redevelopment proposal to Kansas City's Central City Economic Development board.",
      intendedEnd: "Create retail and residential uses in an existing building at 36th and Indiana.",
      usableResult: "A formal proposal specifying four retail spaces and three apartments that received a unanimous board recommendation to City Council for approval and $490,539 in funding.",
      audience: "The public development board, neighborhood stakeholders, and city decision-makers.",
      collectiveCredit: "The public packet names Jamie as presenter but does not establish sole ownership or the full project team.",
      causalBoundary: "The board recommendation is not final City Council action, an executed award, a disbursement, a construction start, or a completed outcome."
    },
    projections: [],
    evidence: [{ sourceId: "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019", relationship: "direct-support", supports: ["presenter role", "proposed program", "requested amount", "unanimous board recommendation to City Council"], propositionIds: ["PROP-KCTOWN-PRESENTER", "PROP-KCTOWN-PROPOSAL", "PROP-KCTOWN-REQUEST", "PROP-KCTOWN-BOARD-RECOMMENDATION"], confidence: "high", renderCitation: false }],
    boundaries: ["This claim preserves the board-stage evidence but is superseded by the later claim that incorporates Council action and project disposition."],
    antiClaims: ["The board packet alone establishes final City Council action.", "The board recommendation was an executed agreement or disbursement.", "KC Town-Hall was constructed or completed.", "Jamie solely owned or authored the proposal."],
    disposition: {
      reason: "Official Council and clawback records recover the later appropriation, negotiation authorization, withdrawal, and unused-fund disposition.",
      predecessorClaimIds: [],
      successorClaimIds: ["CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019-2024"],
      decidedAt: "2026-07-13"
    },
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019-2024",
    project: "kc-town-hall",
    internalClaim: "After Jamie presented the KC Town-Hall mixed-use proposal and the CCED Board unanimously recommended it, the Kansas City Council on September 26, 2019 passed the Round Two appropriation ordinance and adopted Resolution 190649, accepting up to $490,539 for eligible project costs and authorizing funding-agreement negotiations; a 2024 ordinance records that the project later withdrew and reappropriates the unused $490,539 allocation.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: [
      "INTAKE-KCMO-KC-TOWN-HALL-2019",
      "INTAKE-KCMO-KC-TOWN-HALL-COUNCIL-MEETING-2019",
      "INTAKE-KCMO-RESOLUTION-190649-2019",
      "INTAKE-KCMO-ORDINANCE-240317-2024"
    ],
    requiredSupportTags: [
      "kc-town-hall-presenter",
      "kc-town-hall-board-recommendation",
      "kc-town-hall-council-appropriation-vote",
      "kc-town-hall-council-resolution-adoption",
      "kc-town-hall-council-funding-acceptance",
      "kc-town-hall-funding-negotiation-authorized",
      "kc-town-hall-council-funding-conditions",
      "kc-town-hall-council-appropriation-confirmed",
      "kc-town-hall-project-withdrawal",
      "kc-town-hall-unused-funds-clawed-back"
    ],
    composition: {
      action: "Presented a mixed-use neighborhood redevelopment proposal to Kansas City's CCED Board; public records show the proposal then moved through a unanimous recommendation and Council funding decisions.",
      intendedEnd: "Renovate an existing building at 36th and Indiana for four retail spaces and three apartments.",
      usableResult: "A unanimously recommended proposal that received a $490,539 Council appropriation and authorization for funding-agreement negotiations.",
      audience: "The CCED Board, City Council, neighborhood stakeholders, and municipal development staff.",
      collectiveCredit: "The board packet names Jamie as presenter; the proposal, board recommendation, Council legislation, and negotiations were collective and institutional work involving additional project participants and public officials.",
      causalBoundary: "The records support Jamie's presenter role and document the proposal's institutional progression; they do not establish that Jamie personally caused or managed the Council action. The allocation did not become a disbursement or completed development and was later reclaimed after withdrawal."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019", relationship: "direct-support", supports: ["Jamie's presenter role", "proposal context", "unanimous board recommendation"], propositionIds: ["PROP-KCTOWN-PRESENTER", "PROP-KCTOWN-PROPOSAL", "PROP-KCTOWN-REQUEST", "PROP-KCTOWN-BOARD-RECOMMENDATION"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-KCMO-COUNCIL-MEETING-2019-09-26", relationship: "direct-support", supports: ["Council vote on the appropriation ordinance", "Council adoption of the project resolution"], propositionIds: ["PROP-KCTOWN-COUNCIL-ORDINANCE-190642-PASSED", "PROP-KCTOWN-COUNCIL-RESOLUTION-190649-ADOPTED"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-KCMO-RESOLUTION-190649-2019", relationship: "direct-support", supports: ["acceptance of up to $490,539 for eligible costs", "authorization for funding-agreement negotiations", "funding-use conditions"], propositionIds: ["PROP-KCTOWN-RESOLUTION-ACCEPTS-FUNDING", "PROP-KCTOWN-RESOLUTION-AUTHORIZES-NEGOTIATION", "PROP-KCTOWN-RESOLUTION-LIMITS-USES"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-KCMO-ORDINANCE-240317-2024", relationship: "direct-support", supports: ["the $490,539 appropriation", "project withdrawal", "unused-fund clawback"], propositionIds: ["PROP-KCTOWN-ORDINANCE-190642-APPROPRIATED", "PROP-KCTOWN-PROJECT-WITHDREW", "PROP-KCTOWN-UNUSED-FUNDS-REAPPROPRIATED"], confidence: "high", renderCitation: false }
    ],
    boundaries: [
      "Use appropriated, allocated, or awarded with the exact amount and Council action; do not substitute received, paid, or disbursed.",
      "The substituted resolution limited eligible uses and authorized negotiation rather than executing a funding agreement.",
      "Carry the later withdrawal and clawback whenever describing the ultimate project outcome.",
      "Do not attribute the later withdrawal to Jamie; the official records do not establish project stewardship at that stage."
    ],
    antiClaims: [
      "KC Town-Hall received or spent $490,539 in City funds.",
      "A funding agreement was executed or money was disbursed.",
      "KC Town-Hall was constructed or completed through this allocation.",
      "Jamie solely authored the proposal or caused the board recommendation or Council vote.",
      "Jamie personally made or controlled the later withdrawal.",
      "The public record establishes why the project withdrew or assigns individual responsibility."
    ],
    disposition: {
      reason: "This claim replaces the board-only account with the complete recovered Council and disposition record.",
      predecessorClaimIds: ["CLM-KC-TOWN-HALL-CCED-RECOMMENDATION-2019"],
      successorClaimIds: [],
      decidedAt: "2026-07-13"
    },
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-TRANSITION-SEED",
    project: "kc-town-hall",
    internalClaim: "Research Jamie's recollection that he transitioned KC Town Hall project stewardship to a mission-aligned organization, including the handoff date, recipient identity, accepted responsibilities, and relationship to the later official disposition.",
    status: "claim-seed",
    maturity: "researching",
    intakeIds: ["INTAKE-KCMO-KC-TOWN-HALL-TRANSITION-MEMORY"],
    requiredSupportTags: [],
    projections: [],
    evidence: [],
    boundaries: [
      "Treat the transition as first-party memory until public records or permissioned collaborator evidence establish the professional handoff.",
      "Limit research and any future projection to the professional handoff, stewardship chronology, and precise organizational credit.",
      "Do not infer that the transition caused the later withdrawal or attribute the withdrawal to Jamie without evidence."
    ],
    antiClaims: [
      "The current official sources establish the stewardship transition.",
      "Jamie personally made or controlled the later withdrawal.",
      "The transition caused the later withdrawal.",
      "The receiving organization or handoff terms are established by the current record."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart memory intake", "Codex triage"]
  },
  {
    id: "CLM-RIVER-TUNNEL-SCREENING-2006",
    project: "river-public-engagement",
    internalClaim: "In 2006, Jamie led participants through downtown Kansas City and hosted a three-film screening inside the Eighth Street Tunnel, using transit history and shared-space questions to help people imagine the city's possibilities.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-KCUR-EIGHTH-STREET-TUNNEL-2016"],
    requiredSupportTags: ["tunnel-screening-production", "tunnel-participatory-route", "tunnel-public-heritage-purpose"],
    composition: {
      action: "Led a participatory downtown route and produced a film screening inside a historic transit tunnel.",
      intendedEnd: "Reconnect residents with Kansas City's transportation history and expand public imagination about shared urban space.",
      usableResult: "A three-film public-history program grounded in the physical infrastructure under downtown.",
      audience: "Kansas City cultural participants, residents, and future public-history audiences.",
      collectiveCredit: "Jamie hosted and framed the program; the films and the tunnel's history came from multiple creators and stewards.",
      causalBoundary: "The retrospective article supports the program and purpose, not authorization, attendance, or measurable educational impact."
    },
    projections: [],
    evidence: [{ sourceId: "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016", relationship: "direct-support", supports: ["Jamie's host role", "participatory route", "screening contents", "public-heritage purpose"], propositionIds: ["PROP-TUNNEL-SCREENING", "PROP-TUNNEL-SCAVENGER", "PROP-TUNNEL-PUBLIC-HERITAGE"], confidence: "high", renderCitation: false }],
    boundaries: ["Describe the 2006 event through KCUR's 2016 retrospective and avoid claims about permission or safety."],
    antiClaims: ["The screening was formally authorized.", "The tunnel was safe or generally open to the public.", "The program produced measured educational outcomes."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-RIVER-EXPEDITION-GULF-COMPLETION",
    project: "river-public-engagement",
    internalClaim: "Independent reporting says the collective raft expedition reached the Gulf of Mexico four months after leaving Kansas City; contemporaneous reporting documents the crew more than one thousand miles into the journey.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-PITCH-GREAT-ACCOMMODATIONS-2009", "INTAKE-WLBT-RAFT-2007"],
    requiredSupportTags: ["river-gulf-completion", "river-four-month-duration", "river-thousand-miles-in-progress"],
    composition: {
      action: "Helped carry a collective, bicycle-powered raft expedition from Kansas City to the Gulf of Mexico.",
      intendedEnd: "Experience and reimagine the connected Missouri and Mississippi river system as public and cultural infrastructure.",
      usableResult: "A completed four-month expedition, independently reported after more than one thousand miles and again after Gulf arrival.",
      audience: "River communities, cultural participants, and readers encountering the waterways as a connected civic system.",
      collectiveCredit: "The expedition was collective; contemporaneous reporting names Libby Hendon and Laura Mattingly with Jamie during the journey.",
      causalBoundary: "The sources establish the broad route and duration, not every segment, supporter, exact landing point, or individual contribution."
    },
    projections: [],
    evidence: [
      { sourceId: "SRC-PITCH-GREAT-ACCOMMODATIONS-2009", relationship: "direct-support", supports: ["Gulf completion", "four-month duration", "collective expedition"], propositionIds: ["PROP-PITCH-GULF-COMPLETION"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-WLBT-RAFT-2007", relationship: "corroborating", supports: ["more than one thousand miles in progress", "named crew context"], propositionIds: ["PROP-WLBT-THOUSAND-MILES", "PROP-WLBT-COLLABORATORS"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["Use collective credit and retain uncertainty about the exact final landing point and complete support network."],
    antiClaims: ["Jamie completed the expedition alone.", "The sources provide a complete route log or contribution ledger.", "The in-progress WLBT report itself proves later Gulf arrival."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-RIVER-EXPEDITION-ORGANIZER-2007",
    project: "river-public-engagement",
    internalClaim: "Contemporaneous WLBT reporting identified Jamie as organizer of the three-person river expedition during its 2007 journey.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-WLBT-RAFT-2007"],
    requiredSupportTags: ["river-expedition-organizer", "river-expedition-crew-credit"],
    composition: {
      action: "Organized a three-person river expedition and continued it through a major logistical interruption.",
      intendedEnd: "Carry the participatory river journey south through the connected river system.",
      usableResult: "A documented expedition crew that had traveled more than one thousand miles by late September 2007.",
      audience: "The expedition's participants, supporters, river communities, and public-news audience.",
      collectiveCredit: "WLBT identifies Jamie as organizer and names Libby Hendon and Laura Mattingly as expedition companions.",
      causalBoundary: "Organizer is not sole creator or sole operator; the report does not enumerate every supporter or later participant."
    },
    projections: [],
    evidence: [{ sourceId: "SRC-WLBT-RAFT-2007", relationship: "direct-support", supports: ["organizer role", "named expedition crew"], propositionIds: ["PROP-WLBT-JAMIE-ORGANIZER", "PROP-WLBT-COLLABORATORS"], confidence: "high", renderCitation: false }],
    boundaries: ["Keep organizer credit alongside named crew and broader collective-credit limits."],
    antiClaims: ["Jamie alone designed, built, operated, or completed the expedition.", "The report names every person who contributed to the journey."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex public-source review"]
  },
  {
    id: "CLM-CLAUDETTE-AR-COLLABORATION",
    project: "claudette-ar",
    internalClaim: "Jamie and Michael Rees collaborated on an augmented-reality experience for Make Use Visible Munich, using video produced by Jamie, Anne Dufy Burkart, and Julia Fredenburg with Claudette.",
    status: "confirmed-with-boundary",
    maturity: "public-ready",
    intakeIds: ["INTAKE-CLAUDETTE-AR-COLLABORATION"],
    requiredSupportTags: ["claudette-ar-collaboration", "claudette-video-production"],
    composition: {
      action: "Collaborated on an augmented-reality experience and co-produced its source video.",
      intendedEnd: "Make Claudette's performance history visible through an interactive exhibition experience.",
      usableResult: "An augmented-reality work for Make Use Visible Munich built from collaboratively produced video.",
      audience: "Exhibition visitors and audiences encountering Claudette's work.",
      collectiveCredit: "Credit Michael Rees on the AR collaboration and Anne Dufy Burkart, Julia Fredenburg, and Claudette on the video work.",
      causalBoundary: "The collaborator page establishes shared credits and purpose, not the technical stack or individual implementation split."
    },
    projections: [],
    evidence: [{ sourceId: "SRC-CLAUDETTE-AR-COLLABORATION", relationship: "direct-support", supports: ["AR collaboration", "Make Use Visible Munich context", "shared video-production credit"], propositionIds: ["PROP-CLAUDETTE-AR-COLLABORATION", "PROP-CLAUDETTE-VIDEO-PRODUCTION"], confidence: "high", renderCitation: false }],
    boundaries: ["Preserve all named collaborators and avoid inferring technical ownership from the public credit line."],
    antiClaims: ["Jamie solely created the augmented-reality experience.", "Jamie alone produced the video.", "The source establishes the technical stack or audience metrics."],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex public-source review"]
  }
] satisfies ClaimRecord[];

export const sourceExpansionResearchTasks = [
  {
    id: "TASK-KC-TOWN-HALL-DOWNSTREAM-OUTCOME",
    project: "kc-town-hall",
    question: "What public records establish whether City Council adopted the July 2019 board recommendation, whether a funding agreement was executed or disbursed, and what was ultimately built?",
    status: "resolved",
    priority: "high",
    openedAt: "2026-07-13",
    intakeIds: [
      "INTAKE-KCMO-KC-TOWN-HALL-2019",
      "INTAKE-KCMO-KC-TOWN-HALL-COUNCIL-MEETING-2019",
      "INTAKE-KCMO-RESOLUTION-190649-2019",
      "INTAKE-KCMO-ORDINANCE-240317-2024"
    ],
    sourceIds: [
      "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019",
      "SRC-KCMO-COUNCIL-MEETING-2019-09-26",
      "SRC-KCMO-RESOLUTION-190649-2019",
      "SRC-KCMO-ORDINANCE-240317-2024"
    ],
    claimIds: ["CLM-KC-TOWN-HALL-CCED-RECOMMENDATION-2019", "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019-2024"],
    nextActions: [
      "Preserve the distinction between appropriation, negotiation authorization, execution, and disbursement in every future use.",
      "Reopen only if a later official record materially changes the withdrawn, unused, or unbuilt status."
    ],
    resolutionSummary: "Official records establish that Council passed the Round Two appropriation ordinance and adopted Resolution 190649 on September 26, 2019. Ordinance 240317 later confirms the $490,539 KC Town Hall appropriation, project withdrawal, and reappropriation of the unused funds; no disbursement or completed development is established. The official records do not attribute the later withdrawal to Jamie."
  },
  {
    id: "TASK-KC-TOWN-HALL-TRANSITION-CHRONOLOGY",
    project: "kc-town-hall",
    question: "What public or permissioned evidence can establish Jamie's transition of KC Town Hall project stewardship to a mission-aligned organization and distinguish that handoff from the later official withdrawal?",
    status: "open",
    priority: "high",
    openedAt: "2026-07-13",
    intakeIds: ["INTAKE-KCMO-KC-TOWN-HALL-TRANSITION-MEMORY"],
    sourceIds: [],
    claimIds: ["CLM-KC-TOWN-HALL-TRANSITION-SEED"],
    nextActions: [
      "Establish the handoff date, receiving organization, accepted responsibilities, and Jamie's role using public records or permissioned collaborator evidence.",
      "Confirm whether the receiving organization may be named and how collective credit should be stated.",
      "Map the professional stewardship chronology against the later official withdrawal without inferring causation.",
      "Keep the research scope limited to the professional handoff and project stewardship."
    ]
  }
] satisfies ResearchTask[];

export const sourceExpansionDecisions = sourceExpansionClaims.map((claim) => ({
  id: `DEC-${claim.id.replace(/^CLM-/, "")}-${claim.maturity === "superseded" ? "RETIRE" : "DEFER"}`,
  claimId: claim.id,
  surface: "future-portfolio-composition",
  decision: claim.maturity === "superseded" ? "retire" as const : "defer" as const,
  rationale: claim.maturity === "superseded"
    ? "A more complete source-backed successor replaces this board-only claim."
    : claim.maturity === "public-ready"
      ? "The claim is public-ready and retained for future composition; this source-ingestion pass does not automatically change the live portfolio argument."
      : "The first-party memory remains research-stage and cannot be projected until the professional handoff is corroborated.",
  decidedAt: "2026-07-13",
  reviewedBy: ["Codex editorial review"]
})) satisfies ProjectionDecision[];
