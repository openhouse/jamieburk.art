import type {
  ClaimRecord,
  CitationPage,
  IntakeRecord,
  ProjectRecord,
  ProofCoverage,
  PublicationDecision,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";
import {
  campaignPressIndexes,
  campaignPressIntake,
  campaignPressNewSourceIds,
  campaignPressSourceIds,
  campaignPressSources
} from "./campaign-press.ts";
import {
  socialArchiveClaims,
  socialArchiveInquiries,
  socialArchiveIntake,
  socialArchiveProofCoverage,
  socialArchivePublicationDecisions,
  socialArchiveSources
} from "./social-archive.ts";
import {
  callNycSocialCorpusClaims,
  callNycSocialCorpusInquiries,
  callNycSocialCorpusIntake,
  callNycSocialCorpusProofCoverage,
  callNycSocialCorpusPublicationDecisions,
  callNycSocialCorpusSources
} from "./callnyc-social-corpus.ts";
import {
  nycArtCSocialCorpusClaims,
  nycArtCSocialCorpusInquiries,
  nycArtCSocialCorpusIntake,
  nycArtCSocialCorpusProofCoverage,
  nycArtCSocialCorpusPublicationDecisions,
  nycArtCSocialCorpusSources
} from "./nycartc-social-corpus.ts";
import {
  nycartcFacebookEventClaims,
  nycartcFacebookEventInquiries,
  nycartcFacebookEventIntake,
  nycartcFacebookEventProofCoverage,
  nycartcFacebookEventPublicationDecisions,
  nycartcFacebookEventSources
} from "./nycartc-facebook-events-batch-2026-07-13.ts";
import {
  nycartcFacebookPostClaims,
  nycartcFacebookPostInquiries,
  nycartcFacebookPostIntake,
  nycartcFacebookPostProofCoverage,
  nycartcFacebookPostPublicationDecisions,
  nycartcFacebookPostSources
} from "./nycartc-facebook-posts-batch-2026-07-14.ts";
import {
  personalWowlistFacebookEventClaims,
  personalWowlistFacebookEventInquiries,
  personalWowlistFacebookEventIntake,
  personalWowlistFacebookEventProofCoverage,
  personalWowlistFacebookEventPublicationDecisions,
  personalWowlistFacebookEventSources
} from "./personal-wowlist-facebook-events-batch-2026-07-14.ts";
import {
  wowlistFacebookPostClaims,
  wowlistFacebookPostInquiries,
  wowlistFacebookPostIntake,
  wowlistFacebookPostProofCoverage,
  wowlistFacebookPostPublicationDecisions,
  wowlistFacebookPostSources
} from "./wowlist-facebook-posts-batch-2026-07-14.ts";
import {
  wowlistSocialCorpusClaims,
  wowlistSocialCorpusInquiries,
  wowlistSocialCorpusIntake,
  wowlistSocialCorpusProofCoverage,
  wowlistSocialCorpusPublicationDecisions,
  wowlistSocialCorpusSources
} from "./wowlist-social-corpus.ts";
import {
  kcTownHallSocialCorpusClaims,
  kcTownHallSocialCorpusInquiries,
  kcTownHallSocialCorpusIntake,
  kcTownHallSocialCorpusProofCoverage,
  kcTownHallSocialCorpusPublicationDecisions,
  kcTownHallSocialCorpusSources
} from "./kc-town-hall-social-corpus.ts";
import {
  urbanHermitSocialCorpusClaims,
  urbanHermitSocialCorpusInquiries,
  urbanHermitSocialCorpusIntake,
  urbanHermitSocialCorpusProofCoverage,
  urbanHermitSocialCorpusPublicationDecisions,
  urbanHermitSocialCorpusSources
} from "./urbanhermit-social-corpus.ts";

export const frameworkPrinciple =
  "No silent loss: every submitted fragment receives a durable disposition, but intake is never automatically promoted to a public claim.";

export const frameworkIntake = [
  {
    id: "LEAD-NYCARTC-COFOUNDING-MEMORY",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "memory",
    title: "NYC Artist Coalition founding-role memory",
    summary: "Research Jamie's role in creating and developing NYC Artist Coalition.",
    status: "researching",
    dispositions: ["project-linked", "inquiry-created"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: [],
    claimIds: [],
    inquiryIds: ["INQ-NYCARTC-COFOUNDING-ROLE"],
    notes: ["Treat Jamie's memory as a research lead until public records and collaborator context are mapped."]
  },
  {
    id: "LEAD-CABARET-LAW-ROLE-MEMORY",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "memory",
    title: "Cabaret Law repeal role memory",
    summary: "Research Jamie's contribution to the collective campaign to repeal New York City's Cabaret Law.",
    status: "researching",
    dispositions: ["project-linked", "claim-created", "inquiry-created"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: [
      "SRC-NYCARTC-CABARET-GOTHAMIST-2017",
      "SRC-NYC-COUNCIL-CABARET-HEARING-2017"
    ],
    claimIds: ["CLM-NYCARTC-CABARET-ORGANIZING"],
    inquiryIds: ["INQ-NYCARTC-CABARET-OUTCOME-ROLE"],
    notes: ["The first mature claim covers documented organizing activity, not causality for repeal."]
  },
  {
    id: "LEAD-OFFICE-NIGHTLIFE-ROLE-MEMORY",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "memory",
    title: "Office of Nightlife creation-role memory",
    summary: "Research Jamie's contribution to advocacy surrounding creation of New York City's Office of Nightlife.",
    status: "researching",
    dispositions: ["project-linked", "inquiry-created"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: [],
    claimIds: [],
    inquiryIds: ["INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE"],
    notes: ["Do not publish causal or first-office claims until the legislative and coalition record is mapped."]
  },
  {
    id: "LEAD-NIGHTLIFE-TOWN-HALLS-MEMORY",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "memory",
    title: "Nightlife town-hall production memory",
    summary: "Research Jamie's role producing public town halls intended to connect the Office of Nightlife with small and diverse cultural spaces.",
    status: "researching",
    dispositions: ["project-linked", "inquiry-created"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: [],
    claimIds: [],
    inquiryIds: ["INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS"],
    notes: ["Recover event pages, programs, attendance context, collaborators, and Jamie's production artifacts."]
  },
  {
    id: "LEAD-TALKS-NOT-RAIDS-MARCH-MEMORY",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "memory",
    title: "Talks Not Raids and MARCH memory",
    summary: "Research the collective Talks Not Raids campaign, its transparency work, and the documented path to changes in MARCH enforcement activity.",
    status: "researching",
    dispositions: ["project-linked", "inquiry-created"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: [],
    claimIds: [],
    inquiryIds: ["INQ-NYCARTC-TALKS-NOT-RAIDS-MARCH"],
    notes: ["Separate Jamie's role, coalition accomplishments, agency decisions, and the meaning of disbandment."]
  },
  {
    id: "LEAD-RAFT-GULF-MEMORY",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "memory",
    title: "Kansas City-to-Gulf raft memory",
    summary: "Research the exact route, duration, participants, and endpoint of Jamie's recycled-material raft expedition.",
    status: "researching",
    dispositions: ["project-linked", "claim-created", "inquiry-created"],
    projectIds: ["great-accommodations"],
    sourceIds: ["SRC-RAFT-PITCH-2007", "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"],
    claimIds: ["CLM-RIVER-RAFT-EXPEDITION"],
    inquiryIds: ["INQ-RIVER-RAFT-EXACT-ROUTE"],
    notes: ["Current sources support four months and reaching salt water, but not an exact Gulf endpoint."]
  },
  {
    id: "LEAD-WATERWAYS-PUBLIC-ENGAGEMENT-MEMORY",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "memory",
    title: "Waterways public-engagement practice memory",
    summary: "Research the range of participatory programs Jamie created to connect city residents with shared waterways.",
    status: "researching",
    dispositions: ["project-linked", "claim-created", "inquiry-created"],
    projectIds: ["participatory-public-practice", "great-accommodations"],
    sourceIds: ["SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"],
    claimIds: ["CLM-GREAT-ACCOMMODATIONS-PARTICIPATORY-RIVER-PROGRAM", "CLM-PARTICIPATORY-SYSTEMS-LONGITUDINAL"],
    inquiryIds: ["INQ-WATERWAYS-PUBLIC-PROGRAMS", "INQ-PARTICIPATORY-PRACTICE-LONGITUDINAL"],
    notes: ["One institutional source supports Great Accommodations; the broader practice remains a research hypothesis."]
  },
  {
    id: "LEAD-PITCH-RAFT-2007",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "article",
    title: "The Pitch raft article",
    summary: "Contemporaneous reporting on the recycled-material raft expedition and its Kansas City transportation-history context.",
    sourceUrl: "https://www.thepitchkc.com/when-artists-turn-huck-finn/",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["great-accommodations"],
    sourceIds: ["SRC-RAFT-PITCH-2007"],
    claimIds: ["CLM-RIVER-RAFT-EXPEDITION"],
    inquiryIds: [],
    notes: []
  },
  {
    id: "LEAD-CHARLOTTE-GREAT-ACCOMMODATIONS-2009",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "website",
    title: "Charlotte Street Great Accommodations record",
    summary: "Institutional event record for Jamie's participatory Cities on the Water exhibition and related raft history.",
    sourceUrl: "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["great-accommodations", "participatory-public-practice"],
    sourceIds: ["SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"],
    claimIds: ["CLM-GREAT-ACCOMMODATIONS-PARTICIPATORY-RIVER-PROGRAM", "CLM-RIVER-RAFT-EXPEDITION", "CLM-PARTICIPATORY-SYSTEMS-LONGITUDINAL"],
    inquiryIds: [],
    notes: []
  },
  {
    id: "LEAD-GOOD-TIMES-OPEN-HOUSE-2006",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "article",
    title: "Good Times Open House profile",
    summary: "Reported account of Open House as a participatory communal-living, public-art, and documentation experiment.",
    sourceUrl: "https://www.goodtimes.sc/archives/metro-santa-cruz/06.28.06/open-house-0626.html",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["open-house", "participatory-public-practice"],
    sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006"],
    claimIds: ["CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAM", "CLM-PARTICIPATORY-SYSTEMS-LONGITUDINAL"],
    inquiryIds: [],
    notes: []
  },
  {
    id: "LEAD-GOTHAMIST-CABARET-2017",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "article",
    title: "Gothamist Cabaret Law organizing report",
    summary: "Contemporaneous reporting on Jamie's fire-code study groups and public advocacy for Cabaret Law repeal.",
    sourceUrl: "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: ["SRC-NYCARTC-CABARET-GOTHAMIST-2017"],
    claimIds: ["CLM-NYCARTC-CABARET-ORGANIZING"],
    inquiryIds: [],
    notes: []
  },
  {
    id: "LEAD-NPR-CABARET-REPEAL-2017",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "article",
    title: "NPR Cabaret Law repeal article",
    summary: "NPR article indexed by both Let NYC Dance and Save NYC Spaces; article-level close reading remains pending.",
    sourceUrl: "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife",
    status: "integrated",
    dispositions: ["source-created", "project-linked", "inquiry-created"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: ["SRC-NPR-CABARET-OFFICE-NIGHTLIFE-2017"],
    claimIds: [],
    inquiryIds: ["INQ-NPR-CABARET-SOURCE-CAPTURE"],
    notes: ["Canonical metadata and campaign membership are captured; do not use the article for claim support until close reading is complete."]
  },
  {
    id: "LEAD-GHFC-JAMIE-JULIA-QA-2017",
    receivedAt: "2026-07-12",
    suppliedBy: "Jamie Burkart",
    kind: "article",
    title: "Greene Hill Food Co-op Q&A with Jamie Burkart and Julie Fredenberg",
    summary: "A contemporaneous institutional interview connecting weekly open Sunday dinners, WOW List, NYC Artist Coalition advocacy, and an announced Office of Nightlife town hall.",
    sourceUrl: "https://www.greenehillfood.coop/master-blog/2017/12/september-2017-newsletter",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["sunday-dinner-196", "wowlist", "nyc-artist-coalition"],
    sourceIds: ["SRC-GHFC-JAMIE-JULIA-QA-2017"],
    claimIds: ["CLM-SUNDAY-DINNER-WEEKLY-OPEN", "CLM-NYCARTC-NIGHTLIFE-TOWN-HALL"],
    inquiryIds: [],
    notes: ["The source supports a weekly open gathering and public project relationships, not the current aggregate gathering or residency counts."]
  },
  {
    id: "LEAD-BEDFORD-BOWERY-DIY-SPACES-2017",
    receivedAt: "2026-07-12",
    suppliedBy: "Codex public-source research",
    kind: "article",
    title: "6 Things to Know About Making DIY Spaces Work",
    summary: "Contemporaneous reporting identifies Jamie as an NYC Artist Coalition organizer and documents a coalition-organized fire-safety and policy meeting.",
    sourceUrl: "https://bedfordandbowery.com/2017/02/6-things-to-know-about-making-diy-spaces-work/",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: ["SRC-BEDFORD-BOWERY-DIY-SPACES-2017"],
    claimIds: ["CLM-NYCARTC-EARLY-MUTUAL-AID-ORGANIZING"],
    inquiryIds: [],
    notes: []
  },
  {
    id: "LEAD-VICE-NYCARTC-DCA-2017",
    receivedAt: "2026-07-12",
    suppliedBy: "Codex public-source research",
    kind: "article",
    title: "NYC Artist Coalition and Dance Liberation Network meet cultural commissioner",
    summary: "VICE reporting dates the coalition's formation and records its policy agenda and planned meeting with the cultural-affairs commissioner.",
    sourceUrl: "https://www.vice.com/en/article/nyc-artist-coalition-dance-liberation-network-diy-spaces/",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: ["SRC-VICE-NYCARTC-DCA-2017"],
    claimIds: ["CLM-NYCARTC-EARLY-MUTUAL-AID-ORGANIZING"],
    inquiryIds: [],
    notes: ["This establishes coalition chronology and activity, not Jamie's individual founding status."]
  },
  {
    id: "LEAD-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
    receivedAt: "2026-07-12",
    suppliedBy: "Codex public-source research",
    kind: "article",
    title: "What Can the Night Mayor Do? The DIY Scene Discusses",
    summary: "Independent reporting says NYC Artist Coalition spearheaded an Office of Nightlife town hall and identifies Jamie as a speaker.",
    sourceUrl: "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: ["SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017"],
    claimIds: ["CLM-NYCARTC-NIGHTLIFE-TOWN-HALL"],
    inquiryIds: [],
    notes: []
  },
  {
    id: "LEAD-SAVE-NYC-SPACES-CAMPAIGN",
    receivedAt: "2026-07-12",
    suppliedBy: "Codex public-source research",
    kind: "website",
    title: "Save NYC Spaces campaign",
    summary: "The coalition campaign page preserves Jamie's public framing, coalition partners, media resources, and the Office of Nightlife town-hall context.",
    sourceUrl: "https://savenycspaces.nycartc.com/",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: ["SRC-SAVE-NYC-SPACES-CAMPAIGN"],
    claimIds: ["CLM-NYCARTC-NIGHTLIFE-TOWN-HALL"],
    inquiryIds: [],
    notes: ["Treat the campaign page as a primary artifact, not independent verification of outcome or individual authorship."]
  },
  {
    id: "LEAD-EDGE-SAVE-NYC-SPACES-2017",
    receivedAt: "2026-07-12",
    suppliedBy: "Codex public-source research",
    kind: "article",
    title: "Save NYC Spaces Means Protecting the City's Most Vulnerable Populations",
    summary: "Reporting identifies Jamie with the coalition that organized the town hall and records his public explanation of the cultural-space purpose.",
    sourceUrl: "https://medium.com/edge-of-sound/savenycspaces-means-protecting-the-citys-most-vulnerable-populations-9f7395138bae",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: ["SRC-EDGE-OF-SOUND-SAVE-NYC-SPACES-2017"],
    claimIds: ["CLM-NYCARTC-NIGHTLIFE-TOWN-HALL"],
    inquiryIds: [],
    notes: []
  },
  {
    id: "LEAD-NYC-COUNCIL-CABARET-HEARING-2017",
    receivedAt: "2026-07-12",
    suppliedBy: "Codex public-source research",
    kind: "document",
    title: "New York City Council Cabaret Law hearing transcript",
    summary: "The official transcript records Jamie's public testimony, coalition affiliation, safety workshops, and fire-guard study groups.",
    sourceUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=E8FF9F52-F802-49FB-92A8-0AF58EE0F37A&ID=5444681&M=F",
    status: "integrated",
    dispositions: ["source-created", "project-linked"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: ["SRC-NYC-COUNCIL-CABARET-HEARING-2017"],
    claimIds: ["CLM-NYCARTC-CABARET-ORGANIZING"],
    inquiryIds: [],
    notes: ["The transcript contains a misspelling of Jamie's surname; self-reported metrics remain attributed testimony rather than independent measurement."]
  },
  {
    id: "LEAD-TALKS-NOT-RAIDS-CAMPAIGN",
    receivedAt: "2026-07-12",
    suppliedBy: "Codex public-source research",
    kind: "website",
    title: "Talks Not Raids campaign",
    summary: "The public campaign surface explains MARCH, links the coalition, tracks Council sponsors, and directs residents to support Intro 1156.",
    sourceUrl: "https://talksnotraids.com/",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: ["SRC-TALKS-NOT-RAIDS-CAMPAIGN"],
    claimIds: ["CLM-NYCARTC-MARCH-TRANSPARENCY"],
    inquiryIds: [],
    notes: ["The campaign page establishes public strategy and coalition participation, not individual authorship or legislative causality."]
  },
  {
    id: "LEAD-NYC-COUNCIL-MARCH-REPORTING-2019",
    receivedAt: "2026-07-12",
    suppliedBy: "Codex public-source research",
    kind: "document",
    title: "New York City Council MARCH reporting legislative record",
    summary: "The Council report credits NYC Artist Coalition's FOIL-derived MARCH data and records adoption of Intro 1156-A with reporting and advance-notice requirements.",
    sourceUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=0C3B9F69-B958-48E9-9DCD-FB00125A173F&ID=8200738&M=F",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: ["SRC-NYC-COUNCIL-MARCH-REPORTING-2019"],
    claimIds: ["CLM-NYCARTC-MARCH-TRANSPARENCY"],
    inquiryIds: [],
    notes: ["The record supports coalition contribution and legislative sequence, not sole causality, Jamie's individual role, or disbandment of MARCH."]
  },
  {
    id: "LEAD-KCMO-CCED-ROUND2-MINUTES-2019",
    receivedAt: "2026-07-12",
    suppliedBy: "Codex public-source research",
    kind: "document",
    title: "Kansas City CCED Round 2 meeting minutes and recommendations",
    summary: "Official minutes identify Jamie as KC Town Hall's presenter and record the board's unanimous $490,539 funding recommendation to City Council.",
    sourceUrl: "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["kc-town-hall"],
    sourceIds: ["SRC-KCMO-CCED-ROUND2-MINUTES-2019"],
    claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-ALLOCATION"],
    inquiryIds: [],
    notes: ["The board recommendation is one step in a public-record sequence completed by separate Council ordinance and resolution records."]
  },
  {
    id: "LEAD-KCMO-KC-TOWN-HALL-COUNCIL-ACTION-2019",
    receivedAt: "2026-07-13",
    suppliedBy: "Codex primary-source research",
    kind: "document",
    title: "Kansas City Council KC Town Hall appropriation and resolution",
    summary: "On September 26, 2019, the Council passed an ordinance allocating $490,539 to KC Town Hall and adopted a resolution accepting the CCED recommendation and authorizing funding-agreement negotiations.",
    sourceUrl: "https://kansascity.legistar.com/MeetingDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GID=821&LEGID=14410",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "inquiry-created", "project-linked"],
    projectIds: ["kc-town-hall"],
    sourceIds: ["SRC-KCMO-ORDINANCE-190642-2019", "SRC-KCMO-RESOLUTION-190649-2019"],
    claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-ALLOCATION"],
    inquiryIds: ["INQ-KC-TOWN-HALL-AGREEMENT-DISBURSEMENT"],
    notes: ["Council allocation and negotiation authority do not establish an executed funding agreement, receipt or disbursement of funds, project completion, or current status."]
  },
  {
    id: "LEAD-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-MEMORY",
    receivedAt: "2026-07-13",
    suppliedBy: "Jamie Burkart",
    kind: "correction",
    title: "KC Town Hall stewardship transition",
    summary: "Jamie reports that he transitioned project stewardship to a mission-aligned organization when he stepped away.",
    status: "researching",
    dispositions: ["inquiry-created", "project-linked", "protected-from-publication"],
    projectIds: ["kc-town-hall"],
    sourceIds: [],
    claimIds: [],
    inquiryIds: ["INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION"],
    notes: ["The professional handoff is retained as firsthand research context, not as a selected public claim.", "No personal circumstances are recorded or needed for professional publication.", "Do not name the receiving organization without permission and public-safe corroboration."]
  },
  {
    id: "LEAD-ICLOUD-JAMIE-PROJECTS-HISTORY-PASS-2026",
    receivedAt: "2026-07-13",
    suppliedBy: "Codex archival review with Jamie Burkart",
    kind: "document",
    title: "Jamie Projects History archival pass",
    summary: "A targeted review of project-history anchors and hydrated public-page captures surfaced a bounded record of Jamie's Claudette's Theatre on Wheels collaboration.",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked"],
    projectIds: ["claudettes-theatre-on-wheels"],
    sourceIds: ["SRC-CLAUDETTE-MICHAEL-REES", "SRC-CLAUDETTE-MAKE-US-VISIBLE"],
    claimIds: ["CLM-CLAUDETTE-AR-COLLABORATION"],
    inquiryIds: [],
    notes: [
      "The public claim uses only collaborator and institutional pages; private correspondence and family context remain excluded.",
      "The Make Us Visible page was recovered in the local archive but its current client-rendered route was not durably readable in this pass."
    ]
  },
  {
    id: "LEAD-ICLOUD-CRS-OPERATING-BACKBONE-PASS-2026",
    receivedAt: "2026-07-13",
    suppliedBy: "Codex archival review with Jamie Burkart",
    kind: "document",
    title: "Commercial Rent Stabilization operating-backbone archival pass",
    summary: "A targeted review of a 90-day operating plan and subsequent running minutes supports a bounded claim that Jamie designed and maintained lightweight collaboration infrastructure for active Commercial Rent Stabilization work.",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "project-linked", "protected-from-publication"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: ["SRC-CRS-OPERATING-BACKBONE-ARCHIVE-2026"],
    claimIds: ["CLM-CRS-OPERATING-BACKBONE-2026"],
    inquiryIds: [],
    notes: [
      "The public projection names usable operating outputs while omitting raw notes, participant details, legal review, strategy, contact data, and private correspondence.",
      "The plan establishes design intent; the running minutes separately document ongoing use of decisions, action ownership, open questions, source boundaries, and follow-up."
    ]
  },
  {
    id: "LEAD-ICLOUD-JOB-HUNT-PROOF-AUDIT-2026",
    receivedAt: "2026-07-13",
    suppliedBy: "Codex archival review with Jamie Burkart",
    kind: "document",
    title: "Job-hunt evidence and proof-debt audit",
    summary: "A targeted review of the current role-positioning outline and approved resume identified the strongest hiring frame and the quantified claims that still need independent or protected corroboration.",
    status: "integrated",
    dispositions: ["source-created", "inquiry-created", "project-linked", "protected-from-publication"],
    projectIds: ["career-proof-system"],
    sourceIds: ["SRC-JOB-HUNT-PROOF-AUDIT-2026"],
    claimIds: [],
    inquiryIds: ["INQ-JOB-HUNT-QUANTIFIED-PROOF-DEBT"],
    notes: [
      "First-party resume and positioning documents can prioritize research but do not independently verify metrics or causality.",
      "Private proposal, transcript, correspondence, and contact context remain outside the repository."
    ]
  },
  {
    id: "LEAD-GDRIVE-SHARED-DRIVES-ARCHIVAL-PASS-2026",
    receivedAt: "2026-07-13",
    suppliedBy: "Codex archival review with Jamie Burkart",
    kind: "document",
    title: "Google Drive Shared Drives archival-production pass",
    summary: "A collection-scale inventory of 110 accessible Shared Drives and focused close reading of public-interest, cultural-program, technical-method, and civic-project records produced selected claims, reserve depth, protected support, photo leads, and explicit research debt.",
    status: "integrated",
    dispositions: ["source-created", "claim-created", "inquiry-created", "project-linked", "protected-from-publication"],
    projectIds: ["commercial-vacancy-public-data", "nyc-artist-coalition", "sunday-dinner-196", "career-proof-system"],
    sourceIds: [
      "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
      "SRC-GDRIVE-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026",
      "SRC-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023",
      "SRC-GDRIVE-SUNDAY-DINNER-PHOTO-SET-2025",
      "SRC-GDRIVE-NYCARTC-MUTUAL-SUPPORT-FAQ-2017",
      "SRC-GDRIVE-NYCARTC-CURE-PERIODS-DATA-NOTE-2019",
      "SRC-GDRIVE-SOURCE-BACKED-SPRINT-PROPOSAL-2026"
    ],
    claimIds: [
      "CLM-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026",
      "CLM-196-RESIDENCY-ONBOARDING-2023",
      "CLM-NYCARTC-MUTUAL-SUPPORT-RESOURCE-2017"
    ],
    inquiryIds: [
      "INQ-NYCARTC-CURE-PERIODS-DATA-NOTE-AUTHORSHIP",
      "INQ-GDRIVE-DEFERRED-COLLECTION-REVIEW",
      "INQ-COMMERCIAL-VACANCY-PUBLICATION-OUTCOME"
    ],
    notes: [
      "The repository retains a public-safe collection summary, not the complete drive-name inventory, access links, file IDs, participant rows, or private drafts.",
      "Shared Drive presence establishes custody and project context, not authorship, distribution, adoption, institutional approval, or outcome by itself.",
      "Files whose access visibility could not be verified remain protected even when their contents afford a public-safe claim."
    ]
  },
  ...campaignPressIntake,
  ...socialArchiveIntake,
  ...nycArtCSocialCorpusIntake,
  ...nycartcFacebookEventIntake,
  ...nycartcFacebookPostIntake,
  ...personalWowlistFacebookEventIntake,
  ...wowlistFacebookPostIntake,
  ...callNycSocialCorpusIntake,
  ...wowlistSocialCorpusIntake,
  ...kcTownHallSocialCorpusIntake,
  ...urbanHermitSocialCorpusIntake
] satisfies IntakeRecord[];

export const frameworkProjects = [
  {
    id: "callnyc",
    title: "CallNYC",
    aliases: ["CallNYC.org"],
    period: "2016",
    status: "historical",
    summary: "Independent civic-data prototype translating CouncilStat records into resident-facing pathways.",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    themes: ["civic data", "public guidance", "information architecture"],
    sourceIds: [
      "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
      "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
      "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC",
      "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO",
      "SRC-CALLNYC-POLITICO-2016-03-14",
      "SRC-CALLNYC-GITHUB-REPOSITORY",
      "SRC-CALLNYC-COUNCIL-MINUTES-2016-09-28",
      "SRC-CALLNYC-HELEN-ROSENTHAL-780797474277511170",
      "SRC-CALLNYC-YDANIS-RODRIGUEZ-733089563334299648",
      "SRC-CALLNYC-ROSIE-MENDEZ-733410096915550208",
      "SRC-CALLNYC-MATHIEU-EUGENE-783305320508514304",
      "SRC-CALLNYC-PETER-KOO-RETWEET-725422714807267328",
      "SRC-CALLNYC-CIVIC-HALL-RESEARCH-2026",
      "SRC-X-CALLNYC-PROFILE-INVENTORY-2026",
      "SRC-X-CALLNYC-FULL-POPULATION-AUDIT-2026",
      "SRC-NYC-SCHOOL-OF-DATA-CALLNYC-2016",
      "SRC-NYC-COUNCIL-CONSTITUENT-SERVICES-DATASET-2026",
      "SRC-X-CALLNYC-JAMIE-ROLE-710150246781882369",
      "SRC-X-CALLNYC-DISTRICT-API-713537148000018432",
      "SRC-X-CALLNYC-JSON-API-722837286476390401",
      "SRC-X-CALLNYC-ISSUE-TWEET-BUTTONS-710154803054301184"
    ],
    claimIds: [
      "CLM-CALLNYC-HACKATHON-DATE-TIME",
      "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON",
      "CLM-CALLNYC-EVENT-BRANDING",
      "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
      "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS",
      "CLM-CALLNYC-COUNCIL-MEMBER-AMPLIFICATION",
      "CLM-CALLNYC-SOCIAL-ENGAGEMENT-ARCHITECTURE",
      "CLM-CALLNYC-SCHOOL-OF-DATA-RECOGNITION",
      "CLM-CALLNYC-PUBLIC-API-ANNOUNCEMENT",
      "CLM-CALLNYC-DIGITAL-DISTRICT",
      "CLM-CALLNYC-CIVIC-HALL-PAGE-NOT-RECOVERED"
    ],
    inquiryIds: [
      "INQ-CALLNYC-CIVIC-HALL-PAGE-2026",
      "INQ-CALLNYC-FULL-POPULATION-RECOVERY-2026",
      "INQ-CALLNYC-UNVERIFIED-ACCOUNT-METRICS",
      "INQ-CALLNYC-API-IMPLEMENTATION"
    ],
    photoBrief: {
      status: "candidates-located",
      selectionQuestion: "Which image best shows Jamie working in a collaborative civic-data setting without implying official Council ownership?",
      evidenceNeeds: ["event context", "visible project work", "rights and participant consent"],
      rightsNotes: "The known participant photograph remains metadata-only pending rights and consent review."
    }
  },
  {
    id: "nyc-artist-coalition",
    title: "NYC Artist Coalition",
    aliases: ["NYCARTC", "FairRentNYC", "Talks Not Raids", "Let NYC Dance"],
    period: "2017-present",
    status: "active",
    summary: "Collective cultural-space advocacy supported by civic systems, public campaigns, coalition operations, and policy communications.",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    themes: ["cultural-space advocacy", "coalition operations", "public policy"],
    sourceIds: [
      "SRC-NYCARTC-CABARET-GOTHAMIST-2017",
      "SRC-GHFC-JAMIE-JULIA-QA-2017",
      "SRC-BEDFORD-BOWERY-DIY-SPACES-2017",
      "SRC-VICE-NYCARTC-DCA-2017",
      "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
      "SRC-SAVE-NYC-SPACES-CAMPAIGN",
      "SRC-EDGE-OF-SOUND-SAVE-NYC-SPACES-2017",
      "SRC-NYC-COUNCIL-CABARET-HEARING-2017",
      "SRC-TALKS-NOT-RAIDS-CAMPAIGN",
      "SRC-NYC-COUNCIL-MARCH-REPORTING-2019",
      "SRC-CRS-OPERATING-BACKBONE-ARCHIVE-2026",
      "SRC-GDRIVE-NYCARTC-MUTUAL-SUPPORT-FAQ-2017",
      "SRC-GDRIVE-NYCARTC-CURE-PERIODS-DATA-NOTE-2019",
      "SRC-X-NYCARTC-PROFILE-INVENTORY-2026",
      "SRC-X-NYCARTC-ESPINAL-CABARET-2017",
      "SRC-X-NYCARTC-LEVIN-MARCH-2019",
      "SRC-X-NYCARTC-RIVERA-FAIR-RENT-2021",
      "SRC-X-NYCARTC-BRANNAN-MARCH-2019",
      "SRC-X-NYCARTC-VAN-BRAMER-CULTURE-2020",
      "SRC-X-NYCARTC-MARK-LEVINE-REPLY-2020",
      "SRC-X-NYCARTC-MADE-IN-NY-TOWN-HALL-2017",
      "SRC-X-NYCARTC-OLYMPIA-CONTINUITY-2022",
      "SRC-X-NYCARTC-FULL-POPULATION-AUDIT-2026",
      "SRC-X-NYCARTC-INBOUND-ENGAGEMENT-AUDIT-2026",
      "SRC-NYCAC-FACEBOOK-EVENTS-CONTROL-2026",
      "SRC-NYCAC-FACEBOOK-EVENTS-POPULATION-RUN-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-LINK-INVENTORY-2026",
      "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026",
      "SRC-FB-NYCAC-PAGE-CONTROL-2026",
      "SRC-FB-NYCAC-FULL-PUBLIC-TIMELINE-RUN-2026",
      "SRC-FB-NYCAC-MANAGED-CONTENT-CROSSCHECK-2026",
      "SRC-FB-NYCAC-CABARET-REPEAL-EVENT-2017",
      "SRC-FB-NYCAC-NIGHT-MAYOR-ROUTE-2018",
      "SRC-FB-NYCAC-MARCH-TRANSPARENCY-2020",
      "SRC-FB-NYCAC-FAIR-RENT-VIRTUAL-HOUSE-2021",
      "SRC-NYCAC-FACEBOOK-EVENT-MARCH-MEETING-2017",
      "SRC-NYCAC-FACEBOOK-EVENT-CABARET-PANEL-2017",
      "SRC-NYCAC-FACEBOOK-EVENT-NIGHTLIFE-TOWN-HALL-2017",
      "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
      "SRC-GOTHAMIST-COMMERCIAL-RENT-2019",
      "SRC-X-NYCARTC-BRAD-LANDER-FAIR-RENT-2021",
      "SRC-HELL-GATE-WHO-LEADS-NIGHTCLUB-RAIDS-2023",
      "SRC-NYT-COMMERCIAL-RENTS-SURGING-2023",
      "SRC-HELL-GATE-LUCYS-EVICTION-2024",
      "SRC-HELL-GATE-SAINT-VITUS-RAID-2024",
      "SRC-HELL-GATE-NIGHTCLUB-RAIDS-2025",
      "SRC-CITY-STATE-COMMERCIAL-RENT-2026",
      "SRC-GOTHAMIST-SMALL-BUSINESS-RENT-CONTROL-2026",
      "SRC-BUSHWICK-DAILY-LEASE-RENEWALS-2026",
      "SRC-DOCUMENT-JOURNAL-NIGHTLIFE-2018",
      "SRC-NYC-NIGHTLIFE-ADVISORY-REPORT-2021",
      ...campaignPressNewSourceIds
    ],
    claimIds: [
      "CLM-NYCARTC-CABARET-ORGANIZING",
      "CLM-NYCARTC-EARLY-MUTUAL-AID-ORGANIZING",
      "CLM-NYCARTC-NIGHTLIFE-TOWN-HALL",
      "CLM-NYCARTC-MARCH-TRANSPARENCY",
      "CLM-CRS-OPERATING-BACKBONE-2026",
      "CLM-NYCARTC-MUTUAL-SUPPORT-RESOURCE-2017",
      "CLM-NYCARTC-COUNCIL-SOCIAL-ENGAGEMENT",
      "CLM-NYCARTC-COMPLETE-SOCIAL-POPULATION",
      "CLM-NYCARTC-SOURCE-ROUTING-CONTINUITY",
      "CLM-NYCAC-FACEBOOK-EVENT-POPULATION-2026",
      "CLM-NYCAC-PARTICIPATION-SYSTEM",
      "CLM-NYCAC-FACEBOOK-RESPONSE-BOUNDARY",
      "CLM-NYCAC-FACEBOOK-EVENT-LINK-ROUTING",
      "CLM-NYCAC-FACEBOOK-SURVIVING-PUBLIC-TIMELINE",
      "CLM-NYCAC-FACEBOOK-PUBLICATION-SYSTEM",
      "CLM-NYCAC-FACEBOOK-STAKEHOLDER-ROUTING",
      "CLM-NYCAC-FACEBOOK-INTERACTION-SIGNALS"
    ],
    inquiryIds: ["INQ-NYCARTC-COFOUNDING-ROLE", "INQ-NYCARTC-CABARET-OUTCOME-ROLE", "INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE", "INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS", "INQ-NYCARTC-TALKS-NOT-RAIDS-MARCH", "INQ-NYCARTC-CAMPAIGN-PRESS-CORPUS", "INQ-NYCARTC-CURE-PERIODS-DATA-NOTE-AUTHORSHIP", "INQ-NYCARTC-COUNCIL-ENGAGEMENT-2026", "INQ-NYCARTC-FULL-POPULATION-2026", "INQ-NYCAC-FACEBOOK-EVENTS-2026", "INQ-NYCAC-FACEBOOK-POSTS-2026"],
    photoBrief: {
      status: "research-needed",
      selectionQuestion: "Which public images show Jamie's facilitation, web, documentation, or event-production role while preserving collective credit?",
      evidenceNeeds: ["Jamie visibly working", "event or campaign context", "collaborator credit", "rights"],
      rightsNotes: "Use public press or campaign images only after rights, caption, and collaborator review."
    }
  },
  {
    id: "sunday-dinner-196",
    title: "196 Artists Residency / Sunday Dinner",
    aliases: ["Sunday Dinner", "196 Artists Residency"],
    period: "2010s",
    status: "historical",
    summary: "Recurring community dinners and artist residencies supported by repeatable hosting, onboarding, facilitation, and continuity practices.",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    themes: ["community infrastructure", "hosting", "participation"],
    sourceIds: [
      "SRC-GHFC-JAMIE-JULIA-QA-2017",
      "SRC-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023",
      "SRC-GDRIVE-SUNDAY-DINNER-PHOTO-SET-2025",
      "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-100-2014",
      "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-NYC-2014",
      "SRC-JAMIE-FACEBOOK-EVENT-WHY-I-MARCH-2017"
    ],
    claimIds: ["CLM-SUNDAY-DINNER-WEEKLY-OPEN", "CLM-196-RESIDENCY-ONBOARDING-2023"],
    inquiryIds: ["INQ-SUNDAY-DINNER-AGGREGATE-COUNTS"],
    photoBrief: {
      status: "candidates-located",
      selectionQuestion: "Which images show repeatable hosting and participant agency without exposing a private home, guest identity, or vulnerable context?",
      evidenceNeeds: ["hosting context", "participant consent", "date", "photographer rights"],
      rightsNotes: "Eleven candidate image files were located in a Shared Drive; guest lists, home details, faces, and image contents remain protected until date, photographer, participant consent, and public-display rights are reviewed."
    }
  },
  {
    id: "commercial-vacancy-public-data",
    title: "Commercial vacancy public-data baseline",
    aliases: ["Toward a Fuller Public Baseline for Commercial Vacancy and Lease Cost in NYC"],
    period: "2026",
    status: "active",
    summary: "A privacy-preserving open-data proposal for geography-aggregated commercial vacancy, occupancy, and lease-cost indicators alongside existing storefront data.",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    themes: ["open data", "privacy", "policy implementation"],
    sourceIds: ["SRC-GDRIVE-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026"],
    claimIds: ["CLM-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026"],
    inquiryIds: ["INQ-COMMERCIAL-VACANCY-PUBLICATION-OUTCOME"],
    photoBrief: {
      status: "candidates-located",
      selectionQuestion: "Which map or brief page best explains the proposed public indicator layer without implying that the City adopted or implemented it?",
      evidenceNeeds: ["clear indicator concept", "privacy and suppression context", "date", "publication rights"],
      rightsNotes: "Three council-district map images were located; do not publish them until data provenance, map authorship, accessibility, and rights are reviewed."
    }
  },
  {
    id: "wowlist",
    title: "WOW List",
    aliases: ["WOWList.org"],
    period: "2010s",
    status: "historical",
    summary: "Community-calendar and social-discovery infrastructure for local arts and music scenes.",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    themes: ["community platforms", "event discovery", "participatory technology"],
    sourceIds: ["SRC-GHFC-JAMIE-JULIA-QA-2017", "SRC-X-WOWLIST-PROFILE-INVENTORY-2026", "SRC-X-WOWLIST-SUNDAY-DINNER-ORIGIN-2014", "SRC-X-WOWLIST-USER-TUTORIAL-2015", "SRC-X-WOWLIST-FULL-POPULATION-AUDIT-2026", "SRC-X-WOWLIST-SUPPORT-FEED-SCOPE-2015", "SRC-X-WOWLIST-SUPPORT-PROFILE-2015", "SRC-X-WOWLIST-SUPPORT-EVENT-SUBMISSION-2015", "SRC-X-WOWLIST-SUPPORT-NYCDIY-IDENTITY-2016", "SRC-X-WOWLIST-SUPPORT-NYCDIY-JOIN-2016", "SRC-X-WOWLIST-SUPPORT-NYCDIY-LINEAGE-2016", "SRC-GRASSTRONAUT-IN-EVERY-TOWN-2015", "SRC-GOOD-TIMES-ZINES-2-2015", "SRC-KQED-GHOST-SHIP-VIGIL-2016", "SRC-MEOW-WOLF-DIY-FUND-2016", "SRC-X-MUSIC-HACKATHON-URBANHERMIT-WOWLIST-2015", "SRC-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026", "SRC-WOWLIST-FACEBOOK-EVENT-RECOVERY-RUN-2026", "SRC-FB-WOWLIST-PAGE-CONTROL-2026", "SRC-FB-WOWLIST-FULL-POPULATION-RUN-2026", "SRC-FB-WOWLIST-PUBLISHER-ATTRIBUTION-RUN-2026", "SRC-FB-WOWLIST-NINE-CITY-CALENDARS-2015", "SRC-FB-WOWLIST-LA-FORTY-ONE-EVENTS-2015", "SRC-FB-WOWLIST-WOMENS-MARCH-ROUTE-2017", "SRC-FB-WOWLIST-PHXDIY-CONTINUITY-2018"],
    claimIds: ["CLM-WOWLIST-PUBLIC-ORIGIN-AND-USE", "CLM-WOWLIST-COMPLETE-SOCIAL-POPULATION", "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE", "CLM-WOWLIST-SCENE-KNOWLEDGE-ROUTING", "CLM-WOWLIST-CIVIC-CARE-CONTINUITY", "CLM-MUSIC-HACKATHON-WOWLIST-ROLE", "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026", "CLM-WOWLIST-FACEBOOK-COMPLETE-POPULATION", "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-USE", "CLM-WOWLIST-FACEBOOK-PUBLISHING-ROLE", "CLM-WOWLIST-FACEBOOK-CIVIC-CARE", "CLM-WOWLIST-FACEBOOK-INTERACTION-SIGNALS"],
    inquiryIds: ["INQ-WOWLIST-PUBLIC-SOURCE-COVERAGE", "INQ-X-PROJECT-ACCOUNT-INVENTORY-2026", "INQ-WOWLIST-FULL-POPULATION-2026", "INQ-URBANHERMIT-FULL-POPULATION-2026", "INQ-WOWLIST-FACEBOOK-EVENTS-2026", "INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"],
    photoBrief: {
      status: "research-needed",
      selectionQuestion: "Which interface or community image best demonstrates organizer use without exposing user data?",
      evidenceNeeds: ["public interface", "organizer context", "date", "data and image rights"],
      rightsNotes: "Use public interface captures or cleared community images; exclude private user records and location data."
    }
  },
  {
    id: "kc-town-hall",
    title: "KC Town Hall",
    aliases: ["KC Town-Hall LLC"],
    period: "2018-2022 public record",
    status: "historical",
    summary: "Adaptive-reuse planning, public-benefit documentation, and a durable participation identity for a historic Kansas City building and neighborhood work.",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    themes: ["adaptive reuse", "public benefit", "participation infrastructure", "long-horizon implementation"],
    sourceIds: ["SRC-KCMO-CCED-ROUND2-MINUTES-2019", "SRC-KCMO-ORDINANCE-190642-2019", "SRC-KCMO-RESOLUTION-190649-2019", "SRC-X-KC-TOWN-HALL-FULL-POPULATION-AUDIT-2026", "SRC-X-KC-TOWN-HALL-LAUNCH-2018"],
    claimIds: ["CLM-KC-TOWN-HALL-COUNCIL-ALLOCATION", "CLM-KC-TOWN-HALL-COMPLETE-SOCIAL-POPULATION", "CLM-KC-TOWN-HALL-DURABLE-PUBLIC-IDENTITY", "CLM-KC-TOWN-HALL-TIRED-OF-TIRES-RECORD", "CLM-KC-TOWN-HALL-CIVIC-EXCHANGE"],
    inquiryIds: ["INQ-KC-TOWN-HALL-AGREEMENT-DISBURSEMENT", "INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION", "INQ-KC-TOWN-HALL-FULL-POPULATION-2026"],
    photoBrief: {
      status: "research-needed",
      selectionQuestion: "Which public-safe building or planning image explains the adaptive-reuse proposition without exposing current legal, financial, or occupancy details?",
      evidenceNeeds: ["historic context", "public-benefit use", "date", "rights"],
      rightsNotes: "Current property, legal, financial, and stakeholder details require separate approval."
    }
  },
  {
    id: "open-house",
    title: "Open House",
    aliases: ["Porter Bridge Gallery Open House"],
    period: "2006",
    status: "historical",
    summary: "A ten-day participatory communal-living and public-art experiment at UC Santa Cruz.",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    themes: ["participation", "facilitation", "collective documentation"],
    sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006"],
    claimIds: ["CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAM"],
    inquiryIds: ["INQ-PARTICIPATORY-PRACTICE-LONGITUDINAL"],
    photoBrief: {
      status: "research-needed",
      selectionQuestion: "Which images show distributed participation and the gallery-as-house without exposing vulnerable participants?",
      evidenceNeeds: ["space use", "participant authorship", "documentation practices", "consent"],
      rightsNotes: "Article images and Jamie's archive require photographer, participant, and vulnerability review."
    }
  },
  {
    id: "great-accommodations",
    title: "Great Accommodations",
    aliases: ["Cities on the Water", "Miss Rockaway Armada raft journey"],
    period: "2007-2009",
    status: "historical",
    summary: "A river-centered body of participatory travel, exhibition, correspondence, software, and public programs.",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    themes: ["waterways", "public engagement", "participatory programs"],
    sourceIds: ["SRC-RAFT-PITCH-2007", "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"],
    claimIds: ["CLM-GREAT-ACCOMMODATIONS-PARTICIPATORY-RIVER-PROGRAM", "CLM-RIVER-RAFT-EXPEDITION"],
    inquiryIds: ["INQ-RIVER-RAFT-EXACT-ROUTE", "INQ-WATERWAYS-PUBLIC-PROGRAMS"],
    photoBrief: {
      status: "candidates-located",
      selectionQuestion: "Which sequence connects raft construction and travel to resident participation and public programming?",
      evidenceNeeds: ["raft and crew", "river-city encounters", "exhibition participation", "captions and route dates"],
      rightsNotes: "Charlotte Street images and Jamie's archive require photographer and participant-rights review."
    }
  },
  {
    id: "claudettes-theatre-on-wheels",
    title: "Claudette's Theatre on Wheels",
    aliases: ["Claudette's Theater on Wheels"],
    period: "2017-2022",
    status: "historical",
    summary: "An augmented-reality collaboration honoring Claudette's women-centered theater practice through short video portraits presented with #MakeUsVisible Munich.",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    themes: ["augmented reality", "public memory", "collaborative media"],
    sourceIds: ["SRC-CLAUDETTE-MICHAEL-REES", "SRC-CLAUDETTE-MAKE-US-VISIBLE"],
    claimIds: ["CLM-CLAUDETTE-AR-COLLABORATION"],
    inquiryIds: [],
    photoBrief: {
      status: "research-needed",
      selectionQuestion: "Which cleared image or interface view shows the augmented-reality work while keeping Claudette's authorship and Jamie's collaboration legible?",
      evidenceNeeds: ["work view", "artist and collaborator credit", "display context", "media rights"],
      rightsNotes: "Do not republish video, portraits, screenshots, or private family photographs without rights and context review."
    }
  },
  {
    id: "career-proof-system",
    title: "Portfolio evidence system",
    aliases: ["job-hunt proof audit"],
    period: "2026-present",
    status: "researching",
    summary: "A private-to-public research process for testing resume and portfolio claims against public sources, protected records, and explicit uncertainty.",
    publicSafety: "public-with-boundary",
    editorialStatus: "hold",
    themes: ["archival production", "evidence quality", "job applications"],
    sourceIds: ["SRC-JOB-HUNT-PROOF-AUDIT-2026", "SRC-X-CALLNYC-PROFILE-INVENTORY-2026", "SRC-X-NYCARTC-PROFILE-INVENTORY-2026", "SRC-X-WOWLIST-PROFILE-INVENTORY-2026", "SRC-JAMIE-SOCIAL-IDENTITY-ESTABLISHMENT-2026", "SRC-X-URBANHERMIT-PROFILE-CONTROL-2026", "SRC-X-URBANHERMIT-FULL-POPULATION-AUDIT-2026", "SRC-X-URBANHERMIT-INBOUND-ENGAGEMENT-AUDIT-2026", "SRC-NPR-HORSE-LORDS-TRUTHERS-2016", "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-CONTROL-2026", "SRC-JAMIE-FACEBOOK-EVENT-ASSOCIATION-RUN-2026"],
    claimIds: ["CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS", "CLM-URBANHERMIT-CURRENT-POPULATION-ACCOUNTING", "CLM-URBANHERMIT-SOURCE-ROUTING", "CLM-HORSE-LORDS-TRUTHERS-VIDEO", "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026"],
    inquiryIds: ["INQ-JOB-HUNT-QUANTIFIED-PROOF-DEBT", "INQ-X-PROJECT-ACCOUNT-INVENTORY-2026", "INQ-PROJECT-SOCIAL-POST-AUTHORSHIP", "INQ-URBANHERMIT-FULL-POPULATION-2026", "INQ-URBANHERMIT-LINK-RESOLUTION-2026", "INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
    photoBrief: {
      status: "not-applicable",
      selectionQuestion: "What evidence diagram would help an editor understand proof maturity without exposing private records?",
      evidenceNeeds: ["public-safe claim lineage"],
      rightsNotes: "Raw resumes, correspondence, transcripts, and private archive screenshots are not publication assets."
    }
  },
  {
    id: "participatory-public-practice",
    title: "Participatory public practice",
    aliases: ["participation systems", "public engagement practice"],
    period: "2003-present",
    status: "researching",
    summary: "A candidate longitudinal frame connecting participatory cultural, civic, and community operating practices.",
    publicSafety: "public-with-boundary",
    editorialStatus: "hold",
    themes: ["participation", "public life", "documentation", "facilitation"],
    sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006", "SRC-RAFT-PITCH-2007", "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009", "SRC-KCUR-8TH-STREET-TUNNEL-2016", "SRC-X-URBANHERMIT-COUNCIL-PUBLIC-ENGAGEMENT-2015", "SRC-X-URBANHERMIT-MEDIA-ARCHAEOLOGY-2020", "SRC-JAMIE-FACEBOOK-HOSTED-EVENT-RUN-2026", "SRC-JAMIE-FACEBOOK-EVENT-SEMANTIC-WEB-2006", "SRC-JAMIE-FACEBOOK-EVENT-PIRATE-TROLLEY-2007", "SRC-JAMIE-FACEBOOK-EVENT-MICROPOP-2007", "SRC-JAMIE-FACEBOOK-EVENT-RIVER-RAFT-2007", "SRC-JAMIE-FACEBOOK-EVENT-NIGHT-WALK-2010", "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-100-2014", "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-NYC-2014", "SRC-JAMIE-FACEBOOK-EVENT-WHY-I-MARCH-2017", "SRC-JAMIE-FACEBOOK-EVENT-HYPERNORMALISATION-2017"],
    claimIds: ["CLM-PARTICIPATORY-SYSTEMS-LONGITUDINAL", "CLM-URBANHERMIT-PRACTICE-THREADS", "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-POPULATION-2026", "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017"],
    inquiryIds: ["INQ-PARTICIPATORY-PRACTICE-LONGITUDINAL", "INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"],
    photoBrief: {
      status: "research-needed",
      selectionQuestion: "What visual sequence demonstrates the recurring practice without flattening distinct communities or decades?",
      evidenceNeeds: ["multiple periods", "Jamie facilitating", "participant agency", "documentation artifacts"],
      rightsNotes: "No longitudinal visual claim should publish until project-level rights and context are reviewed."
    }
  }
] satisfies ProjectRecord[];

export const frameworkSources = [
  {
    id: "SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026",
    title: "Google Drive Shared Drives collection inventory",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-13",
    publicCitation: "Public-safe inventory and focused archival review of Jamie Burkart's Google Drive Shared Drives, July 2026.",
    publicNote: "The public repository retains the collection count, method, selected project categories, and dispositions while withholding the complete drive-name inventory and access metadata.",
    protectedLocatorId: "ARCHIVE-GDRIVE-SHARED-DRIVE-INVENTORY-2026-001",
    supportsGenerally: [
      "110 accessible Shared Drives at the time of review",
      "collection-scale project and collaborator handoff practice",
      "public-safe prioritization and deferred-review lanes"
    ],
    doesNotEstablish: [
      "Jamie created or owned every drive or file",
      "complete review of every file in every drive",
      "public permission for drive names, file names, links, IDs, membership, or contents",
      "project outcome from collection presence alone"
    ]
  },
  {
    id: "SRC-GDRIVE-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026",
    title: "Commercial vacancy and lease-cost public-baseline brief",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2026-03-27",
    accessedAt: "2026-07-13",
    publicCitation: "Public-safe review of Jamie Burkart's March 2026 commercial vacancy and lease-cost open-data brief.",
    publicNote: "The protected brief proposes a privacy-preserving, geography-aggregated indicator pilot without exposing raw filings, tenant identities, parcel-level rent rows, or lease documents.",
    protectedLocatorId: "ARCHIVE-GDRIVE-COMMERCIAL-VACANCY-BRIEF-2026-001",
    supportsGenerally: [
      "Jamie as author",
      "March 27, 2026 version",
      "privacy-preserving geography-aggregated pilot proposal",
      "RPIE-derived vacancy and lease-cost indicators alongside storefront data",
      "coverage, suppression, and methods requirements"
    ],
    doesNotEstablish: [
      "City endorsement or adoption",
      "access to confidential RPIE filings",
      "publication or implementation of the proposed dataset",
      "delivery at a public event",
      "policy outcome"
    ]
  },
  {
    id: "SRC-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023",
    title: "196 Artists Residency acceptance and onboarding record",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-13",
    publicCitation: "Public-safe review of a dated 196 Artists Residency acceptance and onboarding record.",
    publicNote: "The protected record identifies Jamie as the sender and documents proposal review, acceptance, pre-arrival coordination, space configuration, and access handoff without publishing the resident's identity or logistics.",
    protectedLocatorId: "ARCHIVE-GDRIVE-196-ACCEPTANCE-2023-001",
    supportsGenerally: [
      "Jamie as residency host and onboarding contact",
      "proposal review and acceptance",
      "pre-arrival coordination",
      "space configuration",
      "arrival and access handoff"
    ],
    doesNotEstablish: [
      "the 20-plus resident aggregate",
      "every residency followed an identical process",
      "institutional ownership of the resident's work",
      "permission to publish resident identity, dates, contact details, access instructions, or private messages"
    ]
  },
  {
    id: "SRC-GDRIVE-SUNDAY-DINNER-PHOTO-SET-2025",
    title: "Sunday Dinner candidate photo set",
    kind: "photo-metadata",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-13",
    publicCitation: "Metadata-only record of eleven Sunday Dinner candidate images located in a Shared Drive.",
    publicNote: "The source records only that candidate files exist; no image, face, home detail, filename, or participant identity is published.",
    protectedLocatorId: "ARCHIVE-GDRIVE-SUNDAY-DINNER-PHOTOS-2025-001",
    supportsGenerally: ["eleven candidate image files located for future photo editing", "need for image-level rights and consent review"],
    doesNotEstablish: ["event dates", "photographer", "participant consent", "public-display rights", "attendance or gathering totals"]
  },
  {
    id: "SRC-GDRIVE-NYCARTC-MUTUAL-SUPPORT-FAQ-2017",
    title: "NYC Artist Coalition mutual-support Shared Folder FAQ",
    organization: "NYC Artist Coalition",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2017-02-09",
    accessedAt: "2026-07-13",
    publicCitation: "Public-safe review of NYC Artist Coalition's February 2017 mutual-support Shared Folder FAQ.",
    publicNote: "The artifact describes a member-editable resource-sharing space and mutual-support network; it does not identify the document's author.",
    protectedLocatorId: "ARCHIVE-GDRIVE-NYCARTC-SHARED-FOLDER-FAQ-2017-001",
    supportsGenerally: ["2017 mutual-support network framing", "member-editable shared resource space", "coalition meeting and join pathways"],
    doesNotEstablish: ["Jamie as sole author", "Jamie as sole founder", "membership totals", "campaign outcomes", "current access or operation"]
  },
  {
    id: "SRC-GDRIVE-NYCARTC-CURE-PERIODS-DATA-NOTE-2019",
    title: "Cure-periods machine-readable data recommendation",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2019-05-10",
    accessedAt: "2026-07-13",
    publicCitation: "Public-safe review of a 2019 NYC Artist Coalition archive note recommending machine-readable small-business violation reporting.",
    publicNote: "The artifact proposes linking agency, code-section, violation, and fine data across two Council bills; authorship, submission, adoption, and Jamie's role remain open.",
    protectedLocatorId: "ARCHIVE-GDRIVE-NYCARTC-CURE-PERIODS-NOTE-2019-001",
    supportsGenerally: ["existence of a machine-readable reporting proposal", "proposed linkage of violation data with OATH or ECB information", "relationship between two 2019 Council bills"],
    doesNotEstablish: ["Jamie as author", "submission to Council", "Council acceptance", "adoption in enacted language", "implementation or outcome"]
  },
  {
    id: "SRC-GDRIVE-SOURCE-BACKED-SPRINT-PROPOSAL-2026",
    title: "Source-Backed Team Memory Sprint proposal",
    author: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publishedAt: "2026-06-26",
    accessedAt: "2026-07-13",
    publicCitation: "Public-safe method summary derived from Jamie Burkart's June 2026 Source-Backed Team Memory Sprint proposal.",
    publicNote: "The proposal defines one bounded source-to-memory loop, human review, approved non-sensitive or synthetic inputs, and explicit privacy, access, retention, and stop-or-continue decisions.",
    protectedLocatorId: "ARCHIVE-GDRIVE-SOURCE-BACKED-SPRINT-2026-001",
    supportsGenerally: ["bounded sprint design", "human-correctable source-to-memory loop", "approved-source scoping", "privacy and retention boundaries", "continue, revise, or stop recommendation"],
    doesNotEstablish: ["completed client engagement", "production software", "client adoption", "business outcome", "permission to publish collaborator identity, pricing, correspondence, or company context"]
  },
  {
    id: "SRC-CRS-OPERATING-BACKBONE-ARCHIVE-2026",
    title: "Commercial Rent Stabilization operating-backbone archive review",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-13",
    publicCitation: "Public-safe archival review of Commercial Rent Stabilization operating documents, April-May 2026.",
    publicNote: "The protected review covers a 90-day operating plan and subsequent running minutes without exposing raw coalition material.",
    protectedLocatorId: "ARCHIVE-CRS-OPERATING-BACKBONE-2026-001",
    supportsGenerally: [
      "Jamie's operating-system design intent",
      "running minutes used across multiple meetings",
      "decision and action ownership",
      "open-question and source-boundary practices",
      "coordinated city and state work"
    ],
    doesNotEstablish: [
      "Jamie as the whole movement or sole organizer",
      "completion of every planned deliverable",
      "legal authority",
      "public permission for raw notes, participant data, strategy, or correspondence"
    ]
  },
  {
    id: "SRC-JOB-HUNT-PROOF-AUDIT-2026",
    title: "Job-hunt evidence and proof-debt audit",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    accessedAt: "2026-07-13",
    publicCitation: "Public-safe audit of current job-hunt positioning and proof debt, July 2026.",
    publicNote: "The audit treats first-party resume and positioning materials as research maps rather than independent corroboration.",
    protectedLocatorId: "ARCHIVE-JOB-HUNT-PROOF-AUDIT-2026-001",
    supportsGenerally: [
      "technical project management and product operations role frame",
      "priority proof gaps",
      "need for claim-level source mapping"
    ],
    doesNotEstablish: [
      "independent verification of resume metrics",
      "causality for business or policy outcomes",
      "permission to publish private proposals, transcripts, correspondence, or contact data"
    ]
  },
  {
    id: "SRC-CLAUDETTE-MICHAEL-REES",
    title: "Claudette's Theatre on Wheels",
    organization: "Michael Rees",
    author: "Michael Rees",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://michaelrees.org/claudette",
    preferredPublicUrl: "canonical",
    publicCitation: "Michael Rees, 'Claudette's Theatre on Wheels.'",
    publicNote: "The collaborator page identifies Jamie Burkart and Michael Rees as creators of an augmented-reality experience for #MakeUsVisible Munich and credits Jamie with others for producing the source video.",
    supportsGenerally: [
      "Jamie and Michael Rees collaborated on the augmented-reality work",
      "#MakeUsVisible Munich presentation context",
      "Jamie's shared video-production credit"
    ],
    doesNotEstablish: [
      "Jamie as sole author",
      "independent critical assessment",
      "rights to republish the video or portraits",
      "the complete exhibition history"
    ]
  },
  {
    id: "SRC-CLAUDETTE-MAKE-US-VISIBLE",
    title: "#MakeUsVisible Munich city project page",
    organization: "ARORA / Make Us Visible",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "unverified",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://www.makeusvisible.io/events/cities?cityName=Munich%20(English)&cityId=5&page=1",
    publicCitation: "ARORA / Make Us Visible, Munich city project page.",
    publicNote: "A recovered public-page capture lists 'Claudette's Theatre On Wheels' and credits Michael Rees and Jamie Burkart; the current client-rendered route was not durably readable in this pass.",
    supportsGenerally: ["institutional display listing", "Michael Rees and Jamie Burkart artist credit"],
    doesNotEstablish: ["sole authorship", "complete production roles", "current display status", "media-republication rights"]
  },
  {
    id: "SRC-OPEN-HOUSE-GOOD-TIMES-2006",
    title: "Open House",
    organization: "Good Times",
    author: "Laura Mattingly",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2006-06-28",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.goodtimes.sc/archives/metro-santa-cruz/06.28.06/open-house-0626.html",
    preferredPublicUrl: "canonical",
    publicCitation: "Laura Mattingly, 'Open House,' Good Times, June 28, 2006.",
    publicNote: "The reported account documents a ten-day gallery-as-house experiment, communal responsibility, public participation, institutional negotiation, and participant-generated documentation.",
    supportsGenerally: ["Jamie's initiation and tending of Open House", "communal decision-making", "public participation", "collective documentation"],
    doesNotEstablish: ["Jamie as sole author of participants' work", "consent to republish participant images", "a comprehensive participant roster", "a direct causal line to later civic projects"]
  },
  {
    id: "SRC-RAFT-PITCH-2007",
    title: "When Artists Turn Huck Finn",
    organization: "The Pitch",
    author: "Eric Barton",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2007-08-09",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.thepitchkc.com/when-artists-turn-huck-finn/",
    preferredPublicUrl: "canonical",
    publicCitation: "Eric Barton, 'When Artists Turn Huck Finn,' The Pitch, August 9, 2007.",
    publicNote: "The contemporaneous report attributes the expedition idea to Jamie and connects it to Kansas City transportation history and the Missouri River.",
    supportsGenerally: ["Jamie conceived the expedition", "recycled-material raft", "Missouri River and transportation-history context"],
    doesNotEstablish: ["the complete route to the Gulf of Mexico", "the expedition's final endpoint", "solo authorship of the collective voyage", "the complete crew roster"]
  },
  {
    id: "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009",
    title: "Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water",
    organization: "Charlotte Street Foundation",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2009-09-01",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
    preferredPublicUrl: "canonical",
    publicCitation: "Charlotte Street Foundation, 'Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water,' September 1, 2009.",
    publicNote: "The institutional record describes Jamie as spearheading a river-centered participatory project and documents correspondence, installations, software, community projects, public programs, and the prior raft journey.",
    supportsGenerally: ["Jamie spearheaded Great Accommodations", "river-centered public engagement", "multi-component participatory exhibition", "four-month raft journey until salt water"],
    doesNotEstablish: ["an exact Gulf of Mexico endpoint", "solo authorship of collective contributions", "the complete raft route", "rights to republish all event photographs"]
  },
  {
    id: "SRC-NYCARTC-CABARET-GOTHAMIST-2017",
    title: "DIY Venues Demand Repeal Of Widely Reviled Cabaret Law",
    organization: "Gothamist",
    author: "Emma Whitford",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-06-19",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
    preferredPublicUrl: "canonical",
    publicCitation: "Emma Whitford, 'DIY Venues Demand Repeal Of Widely Reviled Cabaret Law,' Gothamist, June 19, 2017.",
    publicNote: "The article identifies Jamie with NYC Artist Coalition, reports that he organized fire-code study groups for DIY venues, and documents his City Hall advocacy for full repeal.",
    supportsGenerally: ["Jamie organized fire-code study groups", "Jamie publicly advocated for full Cabaret Law repeal", "NYC Artist Coalition affiliation"],
    doesNotEstablish: ["Jamie solely caused repeal", "Jamie alone led the coalition", "Jamie authored the repeal legislation", "the full history of the collective campaign"]
  },
  {
    id: "SRC-GHFC-JAMIE-JULIA-QA-2017",
    title: "The Co-op Q&A With Jamie Burkart and Julie Fredenberg",
    organization: "Greene Hill Food Co-op",
    author: "Outreach Committee",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-12-19",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.greenehillfood.coop/master-blog/2017/12/september-2017-newsletter",
    preferredPublicUrl: "canonical",
    publicCitation: "Greene Hill Food Co-op Outreach Committee, 'The Co-op Q&A With Jamie Burkart and Julie Fredenberg,' December 19, 2017.",
    publicNote: "The member interview describes Jamie and a co-host holding weekly Sunday dinners open to the community, publishing community events through WOW List, working with NYC Artist Coalition, and inviting readers to an Office of Nightlife town hall.",
    supportsGenerally: ["weekly Sunday dinners open to the community", "WOW List as a community-event list", "Jamie's active NYC Artist Coalition involvement", "an announced Office of Nightlife town hall"],
    doesNotEstablish: ["300 or more total gatherings", "20 or more resident artists", "NYC Artist Coalition co-founder status", "Jamie as sole organizer of the town hall", "the town hall's attendance or policy effect"]
  },
  {
    id: "SRC-BEDFORD-BOWERY-DIY-SPACES-2017",
    title: "6 Things to Know About Making DIY Spaces Work",
    organization: "Bedford + Bowery",
    author: "Cassidy Dawn Graves",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-02-07",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://bedfordandbowery.com/2017/02/6-things-to-know-about-making-diy-spaces-work/",
    preferredPublicUrl: "canonical",
    publicCitation: "Cassidy Dawn Graves, '6 Things to Know About Making DIY Spaces Work,' Bedford + Bowery, February 7, 2017.",
    publicNote: "The contemporaneous report identifies Jamie as an NYC Artist Coalition organizer and documents a coalition meeting focused on fire safety, mutual aid, and policy proposals for cultural spaces.",
    supportsGenerally: ["Jamie publicly identified as a coalition organizer", "coalition-organized fire-safety and policy meeting", "mutual-aid network activity", "early 2017 coalition operations"],
    doesNotEstablish: ["Jamie as sole founder or leader", "independent verification of the reported signup count", "adoption of every proposal", "complete coalition membership"]
  },
  {
    id: "SRC-VICE-NYCARTC-DCA-2017",
    title: "A Coalition of Advocacy Groups Are Meeting New York's Cultural Commissioner to Talk About DIY Venue Safety",
    organization: "VICE",
    author: "Alexander Iadarola",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-03-21",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.vice.com/en/article/nyc-artist-coalition-dance-liberation-network-diy-spaces/",
    preferredPublicUrl: "canonical",
    publicCitation: "Alexander Iadarola, 'A Coalition of Advocacy Groups Are Meeting New York's Cultural Commissioner to Talk About DIY Venue Safety,' VICE, March 21, 2017.",
    publicNote: "VICE dates NYC Artist Coalition's formation to January 2017 and records its planned meeting with the cultural-affairs commissioner and its affordability and cultural-space policy agenda.",
    supportsGenerally: ["January 2017 coalition formation", "meeting with the cultural-affairs commissioner", "DIY venue-safety advocacy", "affordability and space-policy proposals"],
    doesNotEstablish: ["Jamie's individual founding status", "Jamie as author of every proposal", "government adoption of the agenda", "the full formation history"]
  },
  {
    id: "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
    title: "What Can the Night Mayor Do? The DIY Scene Discusses",
    organization: "Bedford + Bowery",
    author: "Cassidy Dawn Graves",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-10-12",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
    preferredPublicUrl: "canonical",
    publicCitation: "Cassidy Dawn Graves, 'What Can the Night Mayor Do? The DIY Scene Discusses,' Bedford + Bowery, October 12, 2017.",
    publicNote: "The report says NYC Artist Coalition spearheaded the town hall, identifies Jamie and Olympia Kazi as speakers, and records participation by cultural organizations and three Council members.",
    supportsGenerally: ["coalition spearheaded the Office of Nightlife town hall", "Jamie participated as a speaker", "diverse cultural-organization participation", "three Council members spoke"],
    doesNotEstablish: ["Jamie as sole producer", "an exact attendance count", "sole coalition causality for creating the Office of Nightlife", "implementation of every request made at the event"]
  },
  {
    id: "SRC-SAVE-NYC-SPACES-CAMPAIGN",
    title: "Save NYC Spaces: New Nightlife Mayor Must Assist Diverse Cultures",
    organization: "NYC Artist Coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://savenycspaces.nycartc.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "NYC Artist Coalition, 'Save NYC Spaces: New Nightlife Mayor Must Assist Diverse Cultures,' campaign website.",
    publicNote: "The campaign artifact preserves Jamie's public cultural-space framing, named coalition partners, town-hall media resources, and calls for an equitable Office of Nightlife.",
    supportsGenerally: ["Save NYC Spaces campaign goals", "Jamie's public coalition affiliation", "coalition partners", "town-hall media artifacts"],
    doesNotEstablish: ["independent verification of campaign outcomes", "Jamie's individual website authorship", "permission to republish press images", "sole causality for Office of Nightlife policy"]
  },
  {
    id: "SRC-EDGE-OF-SOUND-SAVE-NYC-SPACES-2017",
    title: "#SaveNYCSpaces Means Protecting the City's Most Vulnerable Populations",
    organization: "Edge of Sound",
    author: "Kristine Villanueva",
    kind: "published-article",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-10-14",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://medium.com/edge-of-sound/savenycspaces-means-protecting-the-citys-most-vulnerable-populations-9f7395138bae",
    preferredPublicUrl: "canonical",
    publicCitation: "Kristine Villanueva, '#SaveNYCSpaces Means Protecting the City's Most Vulnerable Populations,' Edge of Sound, October 14, 2017.",
    publicNote: "The report identifies Jamie with the coalition that organized the town hall and records his public explanation of preserving grassroots spaces and maintaining continuing dialogue with the city.",
    supportsGenerally: ["coalition organized the town hall", "Jamie's public role and purpose", "Office of Nightlife dialogue", "cultural-space affordability framing"],
    doesNotEstablish: ["Jamie's sole production role", "the complete participant roster", "sole causality for public policy", "a verified attendance count"]
  },
  {
    id: "SRC-NYC-COUNCIL-CABARET-HEARING-2017",
    title: "Committee on Consumer Affairs Cabaret Law hearing transcript",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2017-09-14",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=E8FF9F52-F802-49FB-92A8-0AF58EE0F37A&ID=5444681&M=F",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council Committee on Consumer Affairs, Cabaret Law hearing transcript, September 14, 2017.",
    publicNote: "The official transcript records Jamie's testimony as an NYC Artist Coalition member calling for repeal and describing community-space safety workshops and fire-guard study groups.",
    supportsGenerally: ["Jamie's Council testimony", "NYC Artist Coalition affiliation", "public request for full repeal", "Jamie's description of safety workshops and study groups"],
    doesNotEstablish: ["independent verification of the self-reported pass rate", "Jamie as sole organizer", "Jamie as author of legislation", "sole causality for repeal"]
  },
  {
    id: "SRC-TALKS-NOT-RAIDS-CAMPAIGN",
    title: "Talks Not Raids: Transparency on M.A.R.C.H.",
    organization: "NYC Artist Coalition and campaign partners",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://talksnotraids.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "Talks Not Raids coalition, 'Transparency on M.A.R.C.H.,' campaign website.",
    publicNote: "The campaign surface explains the enforcement problem, names coalition partners, links a public report and map, tracks Council sponsorship, and directs residents to support Intro 1156.",
    supportsGenerally: ["public Talks Not Raids campaign", "Intro 1156 call to action", "coalition partners", "MARCH map and report artifacts"],
    doesNotEstablish: ["Jamie's individual authorship", "independent verification of every campaign statistic", "legislative causality", "disbandment of MARCH"]
  },
  {
    id: "SRC-NYC-COUNCIL-MARCH-REPORTING-2019",
    title: "Council report and vote on Intro 1156-A MARCH reporting",
    organization: "New York City Council",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-11-14",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://legistar.council.nyc.gov/View.ashx?GUID=0C3B9F69-B958-48E9-9DCD-FB00125A173F&ID=8200738&M=F",
    preferredPublicUrl: "canonical",
    publicCitation: "New York City Council, report and stated-meeting vote on Intro 1156-A, November 14, 2019.",
    publicNote: "The Council report credits NYC Artist Coalition with obtaining MARCH data through a records request, incorporates its district-level graph, and records a 43-4 vote adopting reporting and advance-notice requirements.",
    supportsGenerally: ["NYC Artist Coalition obtained MARCH data", "coalition data entered the Council record", "Intro 1156-A reporting and notice requirements", "43-4 Council adoption"],
    doesNotEstablish: ["Jamie's individual role obtaining or analyzing the data", "sole coalition causality for passage", "disbandment of MARCH", "full implementation or agency compliance"]
  },
  {
    id: "SRC-KCMO-CCED-ROUND2-MINUTES-2019",
    title: "Central City Economic Development Sales Tax Board Round 2 minutes and recommendations",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-07-29",
    accessedAt: "2026-07-12",
    canonicalUrl: "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000",
    preferredPublicUrl: "canonical",
    publicCitation: "Central City Economic Development Sales Tax Board, Round 2 meeting minutes and funding recommendations, June-July 2019.",
    publicNote: "The official minutes identify Jamie as KC Town Hall's presenter and record the board's unanimous recommendation of the $490,539 adaptive-reuse proposal to City Council.",
    supportsGenerally: ["Jamie as KC Town Hall presenter", "$490,539 request", "adaptive reuse for four retail and three residential spaces", "unanimous board recommendation to City Council"],
    doesNotEstablish: ["Council action without the later ordinance and resolution", "contract execution", "receipt or disbursement of funds", "current property status"]
  },
  {
    id: "SRC-KCMO-ORDINANCE-190642-2019",
    title: "Committee Substitute for Ordinance No. 190642",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-09-26",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://clerk.kcmo.gov/LegislationDetail.aspx?FullText=1&GUID=B387009F-F7F7-454D-950A-E44588056314&ID=5515929",
    preferredPublicUrl: "canonical",
    publicCitation: "Kansas City Council, Committee Substitute for Ordinance No. 190642, passed September 26, 2019.",
    publicNote: "The Council passed the ordinance as substituted, appropriating Round Two Central City Economic Development Sales Tax funds and listing $490,539 for KC Town Hall's adaptive-reuse project.",
    supportsGenerally: ["Council passage on September 26, 2019", "$490,539 KC Town Hall appropriation", "adaptive reuse of an abandoned building at Indiana Avenue and 36th Street"],
    doesNotEstablish: ["executed funding agreement", "receipt or disbursement of funds", "project completion", "Jamie's sole causality for the Council vote", "current property status"]
  },
  {
    id: "SRC-KCMO-RESOLUTION-190649-2019",
    title: "Second Committee Substitute for Resolution No. 190649",
    organization: "City of Kansas City, Missouri",
    kind: "government-record",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-09-26",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://clerk.kcmo.gov/LegislationDetail.aspx?FullText=1&GUID=44A50FFC-321A-41C7-9A86-6ADD9083B156&ID=5515936",
    preferredPublicUrl: "canonical",
    publicCitation: "Kansas City Council, Second Committee Substitute for Resolution No. 190649, adopted September 26, 2019.",
    publicNote: "The Council adopted the resolution as substituted, accepting the CCED Board recommendation for up to $490,539 in KC Town Hall project costs and authorizing the City Manager to negotiate a funding agreement.",
    supportsGenerally: ["Council adoption on September 26, 2019", "acceptance of the CCED Board recommendation", "authorization to negotiate a funding agreement not to exceed $490,539"],
    doesNotEstablish: ["executed funding agreement", "receipt or disbursement of funds", "project completion", "Jamie's sole causality for the Council vote", "current property status"]
  },
  ...campaignPressSources,
  ...socialArchiveSources,
  ...nycArtCSocialCorpusSources,
  ...nycartcFacebookEventSources,
  ...nycartcFacebookPostSources,
  ...personalWowlistFacebookEventSources,
  ...wowlistFacebookPostSources,
  ...callNycSocialCorpusSources,
  ...wowlistSocialCorpusSources,
  ...kcTownHallSocialCorpusSources,
  ...urbanHermitSocialCorpusSources
] satisfies SourceRecord[];

export const frameworkClaims = [
  {
    id: "CLM-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026",
    project: "commercial-vacancy-public-data",
    internalClaim: "Jamie authored a March 2026 proposal for a privacy-preserving, geography-aggregated open-data pilot that would place RPIE-derived commercial vacancy and lease-cost indicators alongside existing storefront reporting, with coverage, suppression, and methods documentation.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      {
        key: "case-study",
        text: "Jamie prepared a public-data brief proposing privacy-preserving, geography-aggregated commercial vacancy, occupancy, and lease-cost indicators alongside New York City's existing storefront data.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/fair-rent-nyc"]
      },
      {
        key: "technical-operations",
        text: "Jamie translated administrative-data constraints into a practical proposal for privacy-preserving commercial vacancy and lease-cost indicators, including coverage, suppression, and methods requirements.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/technical-operations"]
      }
    ],
    evidence: [{
      sourceId: "SRC-GDRIVE-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026",
      relationship: "private-support",
      supports: ["Jamie as author", "privacy-preserving geography-aggregated pilot proposal", "RPIE-derived vacancy and lease-cost indicators alongside storefront data", "coverage, suppression, and methods requirements"],
      locator: "Public-safe review of the March 27, 2026 brief",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The artifact establishes a proposal, not City adoption, implementation, endorsement, or access to confidential filings.",
      "Do not expose raw filings, tenant identities, parcel-level rent rows, lease records, or unverified map outputs.",
      "The current Shared Drive file's public access status was not verified, so the underlying URL remains protected."
    ],
    antiClaims: ["New York City adopted Jamie's proposal", "Jamie published an official City dataset", "Jamie had access to confidential RPIE filings", "The proposed pilot was implemented"],
    researchInquiryIds: ["INQ-COMMERCIAL-VACANCY-PUBLICATION-OUTCOME"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-196-RESIDENCY-ONBOARDING-2023",
    project: "sunday-dinner-196",
    internalClaim: "A dated 196 Artists Residency acceptance record signed by Jamie documents his direct proposal-review, acceptance, pre-arrival coordination, space-configuration, and access-handoff role for one 2023 residency.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [{
      key: "case-study",
      text: "For 196 Artists Residency, Jamie supported the path from proposal review and acceptance through pre-arrival coordination, space configuration, and access handoff.",
      status: "active",
      citationRequired: false,
      surfaces: ["/work/196-sunday-dinner"]
    }],
    evidence: [{
      sourceId: "SRC-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023",
      relationship: "private-support",
      supports: ["Jamie as residency host and onboarding contact", "proposal review and acceptance", "pre-arrival coordination", "space configuration", "arrival and access handoff"],
      locator: "Public-safe review of a 2023 acceptance and onboarding record",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "One record demonstrates the workflow but does not independently verify the 20-plus resident aggregate or establish that every residency followed an identical process.",
      "Resident identity, dates, proposal details, contact information, access instructions, and private messages remain protected.",
      "The work supported an artist's process; it does not establish institutional ownership of that work."
    ],
    antiClaims: ["The record verifies 20-plus residents", "Every residency used the same process", "Jamie owned the resident's work", "The private onboarding record is public"],
    researchInquiryIds: ["INQ-SUNDAY-DINNER-AGGREGATE-COUNTS"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-NYCARTC-MUTUAL-SUPPORT-RESOURCE-2017",
    project: "nyc-artist-coalition",
    internalClaim: "A February 2017 NYC Artist Coalition FAQ describes an early mutual-support network and member-editable shared resource space intended to let coalition members contribute useful material for artists in New York.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [{
      key: "archive-note",
      text: "A February 2017 coalition artifact describes NYC Artist Coalition as a mutual-support network with a member-editable shared resource space.",
      status: "active",
      citationRequired: false,
      surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
    }],
    evidence: [{
      sourceId: "SRC-GDRIVE-NYCARTC-MUTUAL-SUPPORT-FAQ-2017",
      relationship: "private-support",
      supports: ["2017 mutual-support network framing", "member-editable shared resource space", "coalition meeting and join pathways"],
      locator: "Public-safe review of the February 2017 FAQ",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: ["This is a collective coalition artifact; the source does not identify Jamie as sole author or sole founder.", "The record does not establish membership totals, current operation, or campaign outcomes.", "The underlying Shared Drive file and access metadata remain protected."],
    antiClaims: ["Jamie alone created the mutual-support network", "Jamie solely authored the FAQ", "The 2017 shared folder is currently active", "The artifact proves campaign outcomes"],
    researchInquiryIds: ["INQ-NYCARTC-COFOUNDING-ROLE"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-CRS-OPERATING-BACKBONE-2026",
    project: "nyc-artist-coalition",
    internalClaim: "Jamie's April 2026 operating plan defined a small set of shared public goods for Commercial Rent Stabilization work, and subsequent running minutes document his maintenance of decisions, action ownership, open questions, source boundaries, and coordinated city/state work across a multi-organization collaboration.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [{
      key: "technical-operations",
      text: "Jamie designed and maintained a lightweight operating backbone for a multi-organization Commercial Rent Stabilization collaboration: running minutes, decision records, action ownership, open questions, source boundaries, and coordinated city/state work.",
      status: "active",
      citationRequired: false,
      surfaces: ["/work/technical-operations"]
    }],
    evidence: [{
      sourceId: "SRC-CRS-OPERATING-BACKBONE-ARCHIVE-2026",
      relationship: "private-support",
      supports: ["operating design", "running-minutes use", "action ownership", "open-question tracking", "source boundaries", "city/state coordination"],
      locator: "Public-safe review of April-May 2026 operating documents",
      confidence: "high",
      renderCitation: false
    }],
    boundaries: [
      "The plan establishes design intent; the running minutes establish subsequent use of selected operating practices, not completion of every proposed deliverable.",
      "This was collective work across multiple organizations; Jamie was not the whole movement, sole organizer, sole spokesperson, or legal authority.",
      "Raw notes, participant details, legal review, strategy, contacts, and correspondence remain protected."
    ],
    antiClaims: [
      "Jamie led the entire Commercial Rent Stabilization movement",
      "Jamie completed every deliverable in the 90-day plan",
      "Jamie provided legal advice",
      "Jamie owned every coalition decision"
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-CLAUDETTE-AR-COLLABORATION",
    project: "claudettes-theatre-on-wheels",
    internalClaim: "Jamie Burkart collaborated with Michael Rees on an augmented-reality experience honoring Claudette's Theatre on Wheels for #MakeUsVisible Munich, using video Jamie produced with Anne Duffy Burkart and Julia Fredenburg with Claudette.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [{
      key: "archive-note",
      text: "Jamie collaborated with Michael Rees on an augmented-reality work honoring Claudette's Theatre on Wheels for #MakeUsVisible Munich, using short video portraits Jamie produced with others.",
      status: "active",
      citationRequired: true,
      surfaces: ["docs/knowledge-bank/projects/participatory-public-programs"]
    }],
    evidence: [
      {
        sourceId: "SRC-CLAUDETTE-MICHAEL-REES",
        relationship: "direct-support",
        supports: ["Jamie and Michael Rees collaboration", "augmented-reality format", "Munich presentation", "shared video-production credit"],
        confidence: "high",
        renderCitation: true
      },
      {
        sourceId: "SRC-CLAUDETTE-MAKE-US-VISIBLE",
        relationship: "corroborating",
        supports: ["institutional display listing", "artist credit"],
        confidence: "moderate",
        renderCitation: true
      }
    ],
    boundaries: [
      "Credit Michael Rees and the additional named video producers; do not turn a collaboration into a solo work.",
      "Do not publish private family context or sensitive biographical details that are unnecessary to explain Jamie's contribution.",
      "Image, video, audio, and interface republication requires a separate rights review."
    ],
    antiClaims: [
      "Jamie solely created Claudette's Theatre on Wheels",
      "Jamie solely produced the augmented-reality work",
      "The archive establishes a complete exhibition history"
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  },
  {
    id: "CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAM",
    project: "open-house",
    internalClaim: "Jamie initiated and tended Open House, a ten-day gallery-as-house experiment organized around communal responsibility, public participation, and distributed documentation.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [{ key: "archive-note", text: "In 2006, Jamie initiated and tended Open House, a ten-day gallery-as-house experiment with communal decision-making, public participation, and participant-generated documentation.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/participatory-public-programs"] }],
    evidence: [{ sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006", relationship: "direct-support", supports: ["Jamie's initiation and tending role", "ten-day experiment", "communal responsibility", "participant-generated documentation"], confidence: "high", renderCitation: true }],
    boundaries: ["The project was explicitly communal; do not attribute participants' work or all decisions to Jamie.", "Do not publish participant images without rights, consent, and vulnerability review."],
    antiClaims: ["Jamie was the sole leader or author of Open House", "All participants consented to future publication"],
    researchInquiryIds: ["INQ-PARTICIPATORY-PRACTICE-LONGITUDINAL"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-GREAT-ACCOMMODATIONS-PARTICIPATORY-RIVER-PROGRAM",
    project: "great-accommodations",
    internalClaim: "Jamie spearheaded Great Accommodations, a river-centered participatory project combining correspondence, immersive installation, software, community projects, facilitation, and public programs.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [{ key: "archive-note", text: "In 2009, Jamie spearheaded Great Accommodations, a river-centered participatory project combining correspondence, immersive installation, software, community projects, facilitation, and public programs.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/participatory-public-programs"] }],
    evidence: [{ sourceId: "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009", relationship: "direct-support", supports: ["Jamie's spearheading role", "river-centered public engagement", "participatory exhibition components", "public programs"], confidence: "high", renderCitation: true }],
    boundaries: ["Use spearheaded for Jamie's role while preserving Suzanne Hogan's named collaboration and participant authorship.", "Image publication requires separate rights review."],
    antiClaims: ["Jamie alone authored every contribution", "The project represented every river city"],
    researchInquiryIds: ["INQ-WATERWAYS-PUBLIC-PROGRAMS"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-RIVER-RAFT-EXPEDITION",
    project: "great-accommodations",
    internalClaim: "Jamie conceived and organized a recycled-material raft expedition that traveled down the Missouri and Mississippi Rivers for four months until the water tasted salt.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "reserve",
    projections: [{ key: "archive-note", text: "Jamie conceived and helped organize a recycled-material raft expedition that traveled down the Missouri and Mississippi Rivers for four months, until the water tasted salt.", status: "active", citationRequired: true, surfaces: ["docs/knowledge-bank/projects/participatory-public-programs"] }],
    evidence: [
      { sourceId: "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009", relationship: "direct-support", supports: ["four-month journey", "Missouri and Mississippi Rivers", "reaching salt water", "Jamie's organizing role"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-RAFT-PITCH-2007", relationship: "corroborating", supports: ["Jamie conceived the expedition", "recycled-material raft", "Missouri River context"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Current sources do not establish an exact Gulf of Mexico endpoint.", "Describe the voyage as collective and do not erase the crew or host communities."],
    antiClaims: ["Jamie traveled alone", "The reviewed sources prove the exact final destination was the Gulf of Mexico"],
    researchInquiryIds: ["INQ-RIVER-RAFT-EXACT-ROUTE"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-NYCARTC-CABARET-ORGANIZING",
    project: "nyc-artist-coalition",
    internalClaim: "In 2017, Jamie organized fire-code study groups for DIY venues and publicly advocated at City Hall for full repeal of the Cabaret Law as part of NYC Artist Coalition.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [
      { key: "case-study", text: "In 2017, Jamie organized fire-code study groups for DIY venues and publicly advocated at City Hall for full repeal of the Cabaret Law as part of NYC Artist Coalition.", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"] },
      { key: "technical-operations", text: "Organized fire-code study groups for DIY venues and supported public advocacy for Cabaret Law repeal.", status: "active", citationRequired: false, surfaces: ["/work/technical-operations"] }
    ],
    evidence: [
      { sourceId: "SRC-NYCARTC-CABARET-GOTHAMIST-2017", relationship: "direct-support", supports: ["fire-code study groups", "City Hall advocacy for full repeal", "NYC Artist Coalition affiliation"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-NYC-COUNCIL-CABARET-HEARING-2017", relationship: "corroborating", supports: ["Jamie's Council testimony", "public request for full repeal", "Jamie's description of safety workshops and study groups"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["This establishes Jamie's documented organizing contribution, not sole causality for the collective repeal outcome."],
    antiClaims: ["Jamie alone repealed the Cabaret Law", "Jamie authored the repeal legislation", "Jamie solely led NYC Artist Coalition"],
    researchInquiryIds: ["INQ-NYCARTC-CABARET-OUTCOME-ROLE", "INQ-NPR-CABARET-SOURCE-CAPTURE"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-NYCARTC-EARLY-MUTUAL-AID-ORGANIZING",
    project: "nyc-artist-coalition",
    internalClaim: "In early 2017, Jamie was publicly identified as an NYC Artist Coalition organizer while the coalition convened fire-safety, mutual-aid, and policy meetings for informal cultural spaces.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [{ key: "case-study", text: "In early 2017, Jamie was publicly identified as an NYC Artist Coalition organizer while the coalition convened fire-safety, mutual-aid, and policy meetings for informal cultural spaces.", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"] }],
    evidence: [
      { sourceId: "SRC-BEDFORD-BOWERY-DIY-SPACES-2017", relationship: "direct-support", supports: ["Jamie publicly identified as a coalition organizer", "coalition-organized fire-safety and policy meeting", "mutual-aid network activity"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-VICE-NYCARTC-DCA-2017", relationship: "context", supports: ["January 2017 coalition formation", "meeting with the cultural-affairs commissioner", "affordability and space-policy proposals"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["This supports an early organizer role, not sole founder or sole leader status.", "The reported mutual-aid signup count remains attributed to Jamie rather than independently audited."],
    antiClaims: ["Jamie alone founded or led NYC Artist Coalition", "Every coalition proposal was adopted"],
    researchInquiryIds: ["INQ-NYCARTC-COFOUNDING-ROLE"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-NYCARTC-NIGHTLIFE-TOWN-HALL",
    project: "nyc-artist-coalition",
    internalClaim: "NYC Artist Coalition spearheaded a 2017 public town hall about what the new Office of Nightlife should do, and Jamie participated as a coalition speaker.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [{ key: "case-study", text: "Later in 2017, NYC Artist Coalition spearheaded a public town hall about what the new Office of Nightlife should do; Jamie participated as a coalition speaker alongside cultural organizations and city officials.", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"] }],
    evidence: [
      { sourceId: "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017", relationship: "direct-support", supports: ["coalition spearheaded the Office of Nightlife town hall", "Jamie participated as a speaker", "diverse cultural-organization participation", "three Council members spoke"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-EDGE-OF-SOUND-SAVE-NYC-SPACES-2017", relationship: "corroborating", supports: ["coalition organized the town hall", "Jamie's public role and purpose", "Office of Nightlife dialogue"], confidence: "high", renderCitation: false },
      { sourceId: "SRC-SAVE-NYC-SPACES-CAMPAIGN", relationship: "context", supports: ["Save NYC Spaces campaign goals", "coalition partners", "town-hall media artifacts"], confidence: "moderate", renderCitation: false },
      { sourceId: "SRC-GHFC-JAMIE-JULIA-QA-2017", relationship: "context", supports: ["an announced Office of Nightlife town hall", "Jamie's active NYC Artist Coalition involvement"], confidence: "moderate", renderCitation: false }
    ],
    boundaries: ["Spearheaded is attributed to the coalition; Jamie's independently documented role is speaker and public advocate.", "Do not convert coalition advocacy into sole causality for establishing the Office of Nightlife."],
    antiClaims: ["Jamie alone produced the town hall", "Jamie alone created the Office of Nightlife", "Every town-hall request became policy"],
    researchInquiryIds: ["INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS", "INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-NYCARTC-MARCH-TRANSPARENCY",
    project: "nyc-artist-coalition",
    internalClaim: "NYC Artist Coalition's records-request data on MARCH raids entered the Council's legislative record; in 2019 the Council adopted Intro 1156-A, requiring recurring MARCH reporting and advance notice subject to law-enforcement exceptions.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [{ key: "case-study", text: "NYC Artist Coalition's records-request data on MARCH raids entered the Council's legislative record; in 2019 the Council adopted a law requiring recurring MARCH reporting and advance notice subject to law-enforcement exceptions.", status: "active", citationRequired: true, surfaces: ["/work/fair-rent-nyc"] }],
    evidence: [
      { sourceId: "SRC-NYC-COUNCIL-MARCH-REPORTING-2019", relationship: "direct-support", supports: ["NYC Artist Coalition obtained MARCH data", "coalition data entered the Council record", "Intro 1156-A reporting and notice requirements", "43-4 Council adoption"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-TALKS-NOT-RAIDS-CAMPAIGN", relationship: "context", supports: ["public Talks Not Raids campaign", "Intro 1156 call to action", "coalition partners", "MARCH map and report artifacts"], confidence: "moderate", renderCitation: false }
    ],
    boundaries: ["The record establishes collective data work, public campaigning, and legislative sequence, not sole causality.", "The reviewed sources do not establish Jamie's individual role in the records request or that MARCH was disbanded."],
    antiClaims: ["Jamie alone passed Intro 1156-A", "NYC Artist Coalition alone caused passage", "Talks Not Raids disbanded MARCH"],
    researchInquiryIds: ["INQ-NYCARTC-TALKS-NOT-RAIDS-MARCH"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-SUNDAY-DINNER-WEEKLY-OPEN",
    project: "sunday-dinner-196",
    internalClaim: "A 2017 Greene Hill Food Co-op interview described Jamie and a co-host as holding Sunday dinner every week in their Brooklyn apartment and opening it to the community.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [{ key: "case-study", text: "By 2017, Sunday Dinner was publicly documented as a weekly gathering Jamie and a co-host opened to the community.", status: "active", citationRequired: true, surfaces: ["/work/196-sunday-dinner"] }],
    evidence: [{ sourceId: "SRC-GHFC-JAMIE-JULIA-QA-2017", relationship: "direct-support", supports: ["weekly Sunday dinners open to the community"], confidence: "high", renderCitation: true }],
    boundaries: ["This source confirms the weekly open practice at that time, not the 300-plus gathering or 20-plus residency totals.", "Do not publish the home address, guest identities, attendance records, or unapproved photographs."],
    antiClaims: ["The public source verifies all aggregate participation counts", "Every gathering was public or identically structured"],
    researchInquiryIds: ["INQ-SUNDAY-DINNER-AGGREGATE-COUNTS"],
    reviewedAt: "2026-07-12",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-KC-TOWN-HALL-COUNCIL-ALLOCATION",
    project: "kc-town-hall",
    internalClaim: "Official records identify Jamie as the presenter of KC Town Hall's $490,539 adaptive-reuse proposal, document the CCED Board's unanimous recommendation, and show that the Kansas City Council allocated the amount and authorized funding-agreement negotiations on September 26, 2019.",
    status: "confirmed-with-boundary",
    publicSafety: "public-with-boundary",
    editorialStatus: "selected",
    projections: [{ key: "case-study", text: "Jamie presented KC Town Hall's adaptive-reuse proposal in Kansas City's public process. After the CCED Board unanimously recommended it, the Council allocated $490,539 on September 26, 2019, and authorized funding-agreement negotiations.", status: "active", citationRequired: true, surfaces: ["/work/kc-town-hall"] }],
    evidence: [
      { sourceId: "SRC-KCMO-CCED-ROUND2-MINUTES-2019", relationship: "direct-support", supports: ["Jamie as KC Town Hall presenter", "$490,539 request", "unanimous board recommendation to City Council"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-KCMO-ORDINANCE-190642-2019", relationship: "direct-support", supports: ["Council passage on September 26, 2019", "$490,539 KC Town Hall appropriation"], confidence: "high", renderCitation: true },
      { sourceId: "SRC-KCMO-RESOLUTION-190649-2019", relationship: "direct-support", supports: ["Council acceptance of the board recommendation", "authorization to negotiate a funding agreement not to exceed $490,539"], confidence: "high", renderCitation: true }
    ],
    boundaries: ["Council allocation and authorization do not establish an executed funding agreement, receipt or disbursement of funds, later implementation, project completion, or current property or operating status.", "The public sequence does not establish that Jamie solely caused the board recommendation or Council vote.", "Do not infer current property, financial, legal, or occupancy status."],
    antiClaims: ["KC Town Hall received or was disbursed $490,539", "Jamie caused the Council vote", "The funding agreement was executed", "The project is complete"],
    researchInquiryIds: ["INQ-KC-TOWN-HALL-AGREEMENT-DISBURSEMENT"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-PARTICIPATORY-SYSTEMS-LONGITUDINAL",
    project: "participatory-public-practice",
    internalClaim: "The reviewed Open House, Great Accommodations, and 8th Street Tunnel sources suggest a recurring practice of creating participatory structures in which strangers develop agency together and leave behind shared records.",
    status: "inference",
    publicSafety: "public-with-boundary",
    editorialStatus: "hold",
    projections: [{ key: "archive-note", text: "Candidate longitudinal frame: Jamie repeatedly creates participatory structures through which strangers can enter complex public situations, develop agency together, and leave behind shared records.", status: "hold", citationRequired: true, surfaces: [] }],
    evidence: [
      { sourceId: "SRC-OPEN-HOUSE-GOOD-TIMES-2006", relationship: "context", supports: ["participatory space", "distributed responsibility", "shared documentation"], confidence: "moderate", renderCitation: false },
      { sourceId: "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009", relationship: "context", supports: ["participatory river programs", "facilitation", "working documentation"], confidence: "moderate", renderCitation: false },
      { sourceId: "SRC-RAFT-PITCH-2007", relationship: "context", supports: ["experiential public project", "river and city context"], confidence: "limited", renderCitation: false },
      { sourceId: "SRC-KCUR-8TH-STREET-TUNNEL-2016", relationship: "context", supports: ["participatory public-history route", "site-specific film program", "public-access rationale"], confidence: "high", renderCitation: false }
    ],
    boundaries: ["This is a research hypothesis, not an approved public throughline.", "Distinct participants, communities, and projects must not be flattened into one story."],
    antiClaims: ["Every Jamie Burkart project follows one identical method", "Later civic outcomes were caused by the early art projects"],
    researchInquiryIds: ["INQ-PARTICIPATORY-PRACTICE-LONGITUDINAL"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  ...socialArchiveClaims,
  ...nycArtCSocialCorpusClaims,
  ...nycartcFacebookEventClaims,
  ...nycartcFacebookPostClaims,
  ...personalWowlistFacebookEventClaims,
  ...wowlistFacebookPostClaims,
  ...callNycSocialCorpusClaims,
  ...wowlistSocialCorpusClaims,
  ...kcTownHallSocialCorpusClaims,
  ...urbanHermitSocialCorpusClaims
] satisfies ClaimRecord[];

const openInquiry = (
  id: string,
  project: string,
  question: string,
  methods: string[],
  limitations: string[],
  sourceIds: string[] = []
) => ({ id, project, question, methods, resultStatus: "open" as const, findings: [], limitations, sourceIds });

export const frameworkInquiries = [
  openInquiry("INQ-NYCARTC-CURE-PERIODS-DATA-NOTE-AUTHORSHIP", "nyc-artist-coalition", "Who authored, submitted, reviewed, or adopted the 2019 recommendation for machine-readable small-business violation reporting, and what was Jamie's role?", ["Compare document revision and correspondence history with Council records for Int. 1466-2019 and Int. 1467-2019.", "Seek a public submission, testimony, bill report, collaborator confirmation, or version history that identifies authorship and reception.", "Compare proposed agency, code-section, violation, and fine fields with adopted reporting language."], ["Shared Drive custody and file content establish that the proposal existed, not Jamie's authorship, submission, Council adoption, implementation, or policy outcome."], ["SRC-GDRIVE-NYCARTC-CURE-PERIODS-DATA-NOTE-2019"]),
  openInquiry("INQ-GDRIVE-DEFERRED-COLLECTION-REVIEW", "career-proof-system", "Which additional Shared Drive collections should be close-read next for role evidence, public outcomes, collaborator context, and cleared visual assets?", ["Prioritize collection roots tied to existing portfolio claims and unresolved proof debt.", "Review media-heavy collections through transcript, metadata, caption, rights, and consent workflows rather than filename inference.", "Preserve a resumable collection map while withholding personal, family, legal, financial, applicant, credential, and contact records."], ["This pass inventoried 110 accessible Shared Drives but close-read a bounded high-value cohort; unreviewed or connector-empty roots are deferred, not evidence of absence."], ["SRC-GDRIVE-SHARED-DRIVE-INVENTORY-2026"]),
  openInquiry("INQ-COMMERCIAL-VACANCY-PUBLICATION-OUTCOME", "commercial-vacancy-public-data", "Was the commercial vacancy and lease-cost public-baseline proposal presented, adopted, piloted, published, or otherwise acted on by a public institution?", ["Locate public event records, agency correspondence approved for use, meeting notes, follow-up documents, public datasets, methods notes, or institutional acknowledgments.", "Distinguish authoring, sharing, discussion, endorsement, adoption, implementation, and publication."], ["The March 2026 brief establishes Jamie's proposal and method; it does not establish external reception or implementation."], ["SRC-GDRIVE-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026"]),
  openInquiry("INQ-JOB-HUNT-QUANTIFIED-PROOF-DEBT", "career-proof-system", "Which quantified or causality-heavy resume claims should be promoted, narrowed, or held after a cross-archive audit?", ["Prioritize the Harry J. Epstein growth contribution, WOW List geographic reach, Sunday Dinner and residency aggregates, and any current-status language.", "Seek public sources, approved aggregate methods, and protected corroboration while keeping raw records private.", "Record not recovered separately from evidence that something did not exist."], ["The current resume and positioning outline are first-party research maps, not independent verification of their metrics or causality."], ["SRC-JOB-HUNT-PROOF-AUDIT-2026"]),
  openInquiry("INQ-NYCARTC-COFOUNDING-ROLE", "nyc-artist-coalition", "What do public formation records, launch materials, websites, correspondence, and collaborators establish about Jamie's role creating NYC Artist Coalition?", ["Recover dated public launch and formation materials.", "Map website authorship and coalition role language.", "Seek collaborator confirmation before broadening public wording."], ["The new sources establish an early organizer role, but not the complete founding group or co-founder wording."], ["SRC-BEDFORD-BOWERY-DIY-SPACES-2017", "SRC-VICE-NYCARTC-DCA-2017"]),
  openInquiry("INQ-NYCARTC-CABARET-OUTCOME-ROLE", "nyc-artist-coalition", "How did Jamie's documented fire-code education and public advocacy relate to the broader collective campaign and legislative repeal outcome?", ["Review remaining bill history and campaign records.", "Map coalition, partner, sponsor, and administration roles.", "Separate contribution, coalition action, sponsor action, and final legislative causality."], ["Press and Council testimony establish Jamie's contribution but not complete causality."], ["SRC-NYCARTC-CABARET-GOTHAMIST-2017", "SRC-NYC-COUNCIL-CABARET-HEARING-2017"]),
  openInquiry("INQ-NYCARTC-OFFICE-NIGHTLIFE-ROLE", "nyc-artist-coalition", "What public records establish Jamie's and NYC Artist Coalition's roles in advocacy surrounding creation of the Office of Nightlife?", ["Review legislation, hearings, testimony, coalition pages, and contemporaneous press.", "Identify Jamie-authored or Jamie-produced public artifacts."], ["Reporting establishes coalition advocacy and Jamie's public participation, not sole causality or every production task."], ["SRC-GHFC-JAMIE-JULIA-QA-2017", "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017", "SRC-SAVE-NYC-SPACES-CAMPAIGN", "SRC-EDGE-OF-SOUND-SAVE-NYC-SPACES-2017", "SRC-DOCUMENT-JOURNAL-NIGHTLIFE-2018", "SRC-NYC-NIGHTLIFE-ADVISORY-REPORT-2021"]),
  openInquiry("INQ-NYCARTC-NIGHTLIFE-TOWN-HALLS", "nyc-artist-coalition", "Which nightlife town halls did Jamie produce, what was his role, who participated, and what public outputs followed?", ["Recover event programs, recordings, photographs, and production records.", "Map production tasks, collaborators, attendance, and outputs."], ["One town hall is now externally documented; exact production ownership and attendance remain open."], ["SRC-GHFC-JAMIE-JULIA-QA-2017", "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017", "SRC-SAVE-NYC-SPACES-CAMPAIGN", "SRC-EDGE-OF-SOUND-SAVE-NYC-SPACES-2017"]),
  openInquiry("INQ-NYCARTC-TALKS-NOT-RAIDS-MARCH", "nyc-artist-coalition", "What did Talks Not Raids do, what role did Jamie play, what transparency was achieved, and what public record establishes changes to MARCH?", ["Map Jamie's individual authorship and operational role.", "Review implementation reports and later agency structure.", "Define what disbanded means in the public record."], ["The campaign and legislative outcome are documented, but Jamie's individual role and any disbandment claim remain unverified."], ["SRC-TALKS-NOT-RAIDS-CAMPAIGN", "SRC-NYC-COUNCIL-MARCH-REPORTING-2019"]),
  openInquiry("INQ-RIVER-RAFT-EXACT-ROUTE", "great-accommodations", "What exact route, dates, crew, host communities, interruptions, and endpoint are documented for the raft expedition?", ["Recover route logs, contemporary press, photographs, correspondence, and collaborator accounts.", "Distinguish reaching salt water from a documented Gulf endpoint."], ["Current sources do not establish the exact final endpoint or complete crew."], ["SRC-RAFT-PITCH-2007", "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"]),
  openInquiry("INQ-WATERWAYS-PUBLIC-PROGRAMS", "great-accommodations", "What participatory programs did Jamie create to connect residents and river cities through shared waterways?", ["Inventory Great Accommodations programs, correspondence, software, walks, screenings, and community contributions.", "Recover dates, collaborators, attendance, artifacts, and public outcomes."], ["One institutional event record is not a complete program inventory."], ["SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"]),
  openInquiry("INQ-PARTICIPATORY-PRACTICE-LONGITUDINAL", "participatory-public-practice", "Does the wider record support a longitudinal professional claim connecting early participatory art, recurring cultural programs, civic systems, and source-backed team memory?", ["Build a dated cross-project source map.", "Test continuities and discontinuities in Jamie's role, methods, outputs, and participant agency.", "Seek counterexamples and collaborator perspectives."], ["A compelling pattern is not yet a confirmed public claim.", "Distinct communities must retain their own context."], ["SRC-OPEN-HOUSE-GOOD-TIMES-2006", "SRC-RAFT-PITCH-2007", "SRC-GREAT-ACCOMMODATIONS-CHARLOTTE-STREET-2009"]),
  openInquiry("INQ-NPR-CABARET-SOURCE-CAPTURE", "nyc-artist-coalition", "What claims and context does the supplied NPR Cabaret Law article support after durable capture and close reading?", ["Recover the article through a stable public or archived copy.", "Record exact attribution, date, supported propositions, and limitations."], ["Canonical metadata and two campaign-index relationships are captured, but the article was not available for close reading in this run."], ["SRC-NPR-CABARET-OFFICE-NIGHTLIFE-2017"]),
  openInquiry("INQ-SUNDAY-DINNER-AGGREGATE-COUNTS", "sunday-dinner-196", "What public-safe records and calculations support the 300-plus gathering and 20-plus resident-artist totals?", ["Reconcile the private RSVP and attendance ledger with public-safe aggregate methods.", "Document the residency count methodology and date range.", "Keep identities and attendance rows protected."], ["The Greene Hill source confirms a weekly open practice, not the aggregate totals."], ["SRC-GHFC-JAMIE-JULIA-QA-2017"]),
  openInquiry("INQ-WOWLIST-PUBLIC-SOURCE-COVERAGE", "wowlist", "Which public sources independently establish WOW List's product function, technical implementation, organizer adoption, and geographic reach?", ["Recover contemporary coverage, public repositories, and preserved interface pages.", "Associate verified archive counts without exposing user records."], ["The Greene Hill source confirms a community-events function but not the platform's architecture, counts, or 35-city reach."], ["SRC-GHFC-JAMIE-JULIA-QA-2017"]),
  openInquiry("INQ-KC-TOWN-HALL-AGREEMENT-DISBURSEMENT", "kc-town-hall", "What later public record establishes whether Kansas City and KC Town Hall executed a funding agreement, whether funds were received or disbursed, and what implementation followed?", ["Search executed agreements, contract records, Council and board updates, and public payment records.", "Distinguish allocation, agreement execution, payment, implementation, and later property or operating status.", "Keep current property, legal, and private financial details outside the public repository unless approved."], ["Council allocation and funding-agreement negotiation authority are documented; execution, receipt or disbursement, project completion, and later property or operating status are not established by these records."], ["SRC-KCMO-CCED-ROUND2-MINUTES-2019", "SRC-KCMO-ORDINANCE-190642-2019", "SRC-KCMO-RESOLUTION-190649-2019"]),
  openInquiry("INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION", "kc-town-hall", "What public-safe handoff record or recipient confirmation establishes Jamie's transition of project stewardship to a mission-aligned organization?", ["Recover a public-safe handoff artifact or receiving-organization confirmation.", "Ask Jamie whether naming the receiving organization would be useful and approved.", "Keep personal circumstances outside the professional record."], ["Jamie's firsthand correction establishes that his involvement is historical; the receiving organization and handoff details are not yet independently corroborated or selected for public projection."], []),
  openInquiry("INQ-NYCARTC-CAMPAIGN-PRESS-CORPUS", "nyc-artist-coalition", "Which claim-level propositions does each article indexed by Let NYC Dance, Talks Not Raids, Save NYC Spaces, and Fair Rent NYC support after close reading and preservation review?", ["Close-read each unique article and record author, date, Jamie mentions, coalition claims, outcomes, contradictions, and boundaries.", "Recover durable article-level captures where publisher links moved or died.", "Preserve campaign membership while deduplicating shared articles."], ["Index membership establishes source selection by the campaign, not Jamie's appearance, article endorsement, authorship, or factual support before review.", `The four indexes contain ${Object.values(campaignPressIndexes).reduce((sum, index) => sum + index.sourceIds.length, 0)} occurrences across ${new Set(campaignPressSourceIds).size} unique articles.`], campaignPressSourceIds),
  openInquiry("INQ-PUBLIC-PROOF-SOURCE-COVERAGE", "participatory-public-practice", "Which canonical public or public-safe sources should be associated with each existing public proof claim?", ["Audit every proof ID against canonical sources.", "Prioritize metric, causality, ownership, and public-outcome claims.", "Create bounded source records and inquiries rather than weakening accurate claims by default."], ["Many claims currently rely on approved resume or public-safe archive summaries rather than canonical source records."]),
  ...socialArchiveInquiries,
  ...nycArtCSocialCorpusInquiries,
  ...nycartcFacebookEventInquiries,
  ...nycartcFacebookPostInquiries,
  ...personalWowlistFacebookEventInquiries,
  ...wowlistFacebookPostInquiries,
  ...callNycSocialCorpusInquiries,
  ...wowlistSocialCorpusInquiries,
  ...kcTownHallSocialCorpusInquiries,
  ...urbanHermitSocialCorpusInquiries
] satisfies ResearchInquiry[];

const publicationDecisionInputs: Array<[
  string,
  string,
  PublicationDecision["decision"],
  string[],
  string
]> = [
  ["PUB-CALLNYC-HACKATHON-DATE-TIME", "CLM-CALLNYC-HACKATHON-DATE-TIME", "selected", ["/work/callnyc"], "Needed for accurate project chronology."],
  ["PUB-CALLNYC-FIRST-COUNCILSTAT", "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", "selected", ["/work/callnyc"], "Useful bounded institutional context."],
  ["PUB-CALLNYC-EVENT-BRANDING", "CLM-CALLNYC-EVENT-BRANDING", "selected", ["/work/callnyc"], "Clarifies the surviving public artifact without expanding the title."],
  ["PUB-CALLNYC-INDEPENDENT-FOLLOW-ON", "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", "selected", ["/work", "/work/callnyc", "/resume"], "Central role and outcome claim."],
  ["PUB-CALLNYC-ARCHIVED-STATUS", "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS", "selected", ["/work/callnyc"], "Necessary current-service boundary."],
  ["PUB-CALLNYC-MEMBER-AMPLIFICATION", "CLM-CALLNYC-COUNCIL-MEMBER-AMPLIFICATION", "selected", ["/work/callnyc", "/resume", "/work/technical-operations"], "Strong bounded external validation."],
  ["PUB-CALLNYC-DIGITAL-DISTRICT", "CLM-CALLNYC-DIGITAL-DISTRICT", "hold", [], "Photo rights and consent remain unresolved."],
  ["PUB-CALLNYC-PAGE-NOT-RECOVERED", "CLM-CALLNYC-CIVIC-HALL-PAGE-NOT-RECOVERED", "reserve", ["docs/knowledge-bank/projects/callnyc"], "Useful research boundary, not primary site copy."],
  ["PUB-OPEN-HOUSE-PARTICIPATORY", "CLM-OPEN-HOUSE-PARTICIPATORY-PROGRAM", "reserve", ["docs/knowledge-bank/projects/participatory-public-programs"], "Strong source-backed depth held outside the current site composition."],
  ["PUB-GREAT-ACCOMMODATIONS-PARTICIPATORY", "CLM-GREAT-ACCOMMODATIONS-PARTICIPATORY-RIVER-PROGRAM", "reserve", ["docs/knowledge-bank/projects/participatory-public-programs"], "Strong source-backed depth held for future audience needs."],
  ["PUB-RIVER-RAFT-EXPEDITION", "CLM-RIVER-RAFT-EXPEDITION", "reserve", ["docs/knowledge-bank/projects/participatory-public-programs"], "Compelling evidence retained with route and collective-work boundaries."],
  ["PUB-NYCARTC-CABARET-ORGANIZING", "CLM-NYCARTC-CABARET-ORGANIZING", "selected", ["/work/fair-rent-nyc", "/work/technical-operations"], "Adds concrete public evidence of Jamie's bounded organizing role."],
  ["PUB-NYCARTC-EARLY-MUTUAL-AID", "CLM-NYCARTC-EARLY-MUTUAL-AID-ORGANIZING", "selected", ["/work/fair-rent-nyc"], "Makes Jamie's early organizer role and the coalition's practical mutual-aid work legible."],
  ["PUB-NYCARTC-NIGHTLIFE-TOWN-HALL", "CLM-NYCARTC-NIGHTLIFE-TOWN-HALL", "selected", ["/work/fair-rent-nyc"], "Shows Jamie participating in a coalition-led public feedback structure for a new city office."],
  ["PUB-NYCARTC-MARCH-TRANSPARENCY", "CLM-NYCARTC-MARCH-TRANSPARENCY", "selected", ["/work/fair-rent-nyc"], "Adds a bounded collective outcome connecting public data, campaigning, and legislation."],
  ["PUB-SUNDAY-DINNER-WEEKLY-OPEN", "CLM-SUNDAY-DINNER-WEEKLY-OPEN", "selected", ["/work/196-sunday-dinner"], "Provides external evidence of the recurring open-community practice without exposing participants."],
  ["PUB-196-RESIDENCY-ONBOARDING-2023", "CLM-196-RESIDENCY-ONBOARDING-2023", "selected", ["/work/196-sunday-dinner"], "Adds concrete role and workflow evidence while protecting the resident and private access logistics."],
  ["PUB-KC-TOWN-HALL-COUNCIL-ALLOCATION", "CLM-KC-TOWN-HALL-COUNCIL-ALLOCATION", "selected", ["/work/kc-town-hall"], "Preserves the complete official public-record sequence while distinguishing allocation from agreement execution and disbursement."],
  ["PUB-CRS-OPERATING-BACKBONE-2026", "CLM-CRS-OPERATING-BACKBONE-2026", "selected", ["/work/technical-operations"], "Adds a concrete product-operations proof while protecting coalition records and collective ownership."],
  ["PUB-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026", "CLM-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026", "selected", ["/work/fair-rent-nyc", "/work/technical-operations"], "Adds a concrete privacy-aware public-data implementation artifact without implying government adoption."],
  ["PUB-NYCARTC-MUTUAL-SUPPORT-RESOURCE-2017", "CLM-NYCARTC-MUTUAL-SUPPORT-RESOURCE-2017", "reserve", ["docs/knowledge-bank/projects/nyc-artist-coalition-nightlife"], "Preserves early collective infrastructure as source-backed depth without crowding the current public composition or assigning solo authorship."],
  ["PUB-CLAUDETTE-AR-COLLABORATION", "CLM-CLAUDETTE-AR-COLLABORATION", "reserve", ["docs/knowledge-bank/projects/participatory-public-programs"], "Preserves a public-source-backed collaboration for future cultural, public-memory, and creative-technology contexts without crowding the current hiring composition."],
  ["PUB-PARTICIPATORY-LONGITUDINAL", "CLM-PARTICIPATORY-SYSTEMS-LONGITUDINAL", "hold", [], "Promising throughline requires broader cross-project research."]
];

export const frameworkPublicationDecisions = publicationDecisionInputs.map(
  ([id, claimId, decision, surfaces, rationale]) => ({
  id,
  claimId,
  decision,
  audiences: ["hiring managers", "public-interest technology peers", "future editors"],
  surfaces,
  rationale,
    decidedAt: [
      "PUB-196-RESIDENCY-ONBOARDING-2023",
      "PUB-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026",
      "PUB-NYCARTC-MUTUAL-SUPPORT-RESOURCE-2017"
    ].includes(id) ? "2026-07-13" : "2026-07-12"
  })
).concat(
  socialArchivePublicationDecisions,
  nycArtCSocialCorpusPublicationDecisions,
  nycartcFacebookEventPublicationDecisions,
  nycartcFacebookPostPublicationDecisions,
  personalWowlistFacebookEventPublicationDecisions,
  wowlistFacebookPostPublicationDecisions,
  callNycSocialCorpusPublicationDecisions,
  wowlistSocialCorpusPublicationDecisions,
  kcTownHallSocialCorpusPublicationDecisions,
  urbanHermitSocialCorpusPublicationDecisions
) satisfies PublicationDecision[];

const coverage = (
  proofId: string,
  status: ProofCoverage["status"],
  note: string,
  sourceIds: string[] = [],
  inquiryIds: string[] = ["INQ-PUBLIC-PROOF-SOURCE-COVERAGE"]
): ProofCoverage => ({ proofId, status, sourceIds, inquiryIds, note, reviewedAt: "2026-07-12" });

export const frameworkProofCoverage = [
  coverage("career-operating-structure-14-years", "research-needed", "Build a dated cross-project source map for the career-duration synthesis."),
  coverage("hje-modernization-stewardship", "research-needed", "Associate public site history and public-safe operational evidence."),
  coverage("hje-revenue-growth-contribution", "research-needed", "Retain careful causality while locating a public or approved corroborating source."),
  coverage("callnyc-civic-data-guidance", "source-backed", "Canonical CallNYC press and repository sources support this proof.", ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"], []),
  coverage("callnyc-council-member-amplification", "source-backed", "Five member-account actions and officeholding context are canonical.", ["SRC-CALLNYC-COUNCIL-MINUTES-2016-09-28", "SRC-CALLNYC-HELEN-ROSENTHAL-780797474277511170", "SRC-CALLNYC-YDANIS-RODRIGUEZ-733089563334299648", "SRC-CALLNYC-ROSIE-MENDEZ-733410096915550208", "SRC-CALLNYC-MATHIEU-EUGENE-783305320508514304", "SRC-CALLNYC-PETER-KOO-RETWEET-725422714807267328"], []),
  coverage("fair-rent-campaign-memory", "partially-backed", "A protected April-May 2026 archive review now supports Jamie's operating design and running-minutes practice; the 30-plus page aggregate and additional public corroboration remain open.", ["SRC-CRS-OPERATING-BACKBONE-ARCHIVE-2026"], ["INQ-PUBLIC-PROOF-SOURCE-COVERAGE"]),
  coverage("fair-rent-source-map", "research-needed", "Identify the public records and approved artifact metadata that support the source-map claim."),
  coverage("nyc-artist-coalition-public-web-infrastructure", "partially-backed", "The Save NYC Spaces and Talks Not Raids campaign sites are canonical public artifacts; individual web authorship still relies on Jamie confirmation and repository research.", ["SRC-SAVE-NYC-SPACES-CAMPAIGN", "SRC-TALKS-NOT-RAIDS-CAMPAIGN"], ["INQ-PUBLIC-PROOF-SOURCE-COVERAGE", "INQ-NYCARTC-COFOUNDING-ROLE"]),
  coverage("nyc-artist-coalition-civic-systems", "partially-backed", "Independent reporting and government records support early organizing, Council testimony, a coalition-led town hall, campaign artifacts, FOIL-derived data, and MARCH reporting legislation; a protected 2017 FAQ adds collective mutual-support infrastructure, while individual systems authorship remains only partly canonical.", ["SRC-BEDFORD-BOWERY-DIY-SPACES-2017", "SRC-VICE-NYCARTC-DCA-2017", "SRC-NYCARTC-CABARET-GOTHAMIST-2017", "SRC-NYC-COUNCIL-CABARET-HEARING-2017", "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017", "SRC-SAVE-NYC-SPACES-CAMPAIGN", "SRC-EDGE-OF-SOUND-SAVE-NYC-SPACES-2017", "SRC-TALKS-NOT-RAIDS-CAMPAIGN", "SRC-NYC-COUNCIL-MARCH-REPORTING-2019", "SRC-GDRIVE-NYCARTC-MUTUAL-SUPPORT-FAQ-2017"], ["INQ-PUBLIC-PROOF-SOURCE-COVERAGE", "INQ-NYCARTC-COFOUNDING-ROLE", "INQ-NYCARTC-TALKS-NOT-RAIDS-MARCH"]),
  coverage("nyc-artist-coalition-cabaret-organizing", "source-backed", "Gothamist reporting and the official Council transcript directly support the bounded organizing and testimony claim.", ["SRC-NYCARTC-CABARET-GOTHAMIST-2017", "SRC-NYC-COUNCIL-CABARET-HEARING-2017"], []),
  coverage("wowlist-community-platform", "partially-backed", "The Greene Hill interview and Music Hackathon record independently support WOW List's community-events function and Jamie's co-organizer role. Selected Facebook records add member-led city calendars, a 41-event Los Angeles contribution, and Phoenix organizer continuity; a protected Page-management audit identifies Jamie as publisher on 51 matching records with six unresolved. Technical architecture and the larger aggregate scale remain archive-backed and need more public-source coverage.", ["SRC-GHFC-JAMIE-JULIA-QA-2017", "SRC-X-MUSIC-HACKATHON-URBANHERMIT-WOWLIST-2015", "SRC-FB-WOWLIST-NINE-CITY-CALENDARS-2015", "SRC-FB-WOWLIST-LA-FORTY-ONE-EVENTS-2015", "SRC-FB-WOWLIST-PHXDIY-CONTINUITY-2018", "SRC-FB-WOWLIST-PUBLISHER-ATTRIBUTION-RUN-2026"], ["INQ-WOWLIST-PUBLIC-SOURCE-COVERAGE", "INQ-WOWLIST-FACEBOOK-FULL-POPULATION-2026"]),
  coverage("sunday-dinner-196-participation-infrastructure", "partially-backed", "The Greene Hill interview confirms a weekly gathering open to the community; public Facebook event pages document the hundredth dinner, a rotating eight-week New York City format, and a civic sign-making potluck; and a protected 2023 record confirms Jamie's proposal-review and onboarding workflow for one residency. Aggregate gathering and residency totals remain separately protected.", ["SRC-GHFC-JAMIE-JULIA-QA-2017", "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-100-2014", "SRC-JAMIE-FACEBOOK-EVENT-SUNDAY-DINNER-NYC-2014", "SRC-JAMIE-FACEBOOK-EVENT-WHY-I-MARCH-2017", "SRC-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023"], ["INQ-SUNDAY-DINNER-AGGREGATE-COUNTS", "INQ-JAMIE-FACEBOOK-HOSTED-EVENTS-2026"]),
  coverage("commercial-vacancy-public-data-brief", "source-backed", "A protected March 2026 artifact directly supports Jamie's authorship of the bounded public-data proposal while external adoption and implementation remain open.", ["SRC-GDRIVE-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026"], ["INQ-COMMERCIAL-VACANCY-PUBLICATION-OUTCOME"]),
  coverage("kc-spaces-fund-digital-infrastructure", "research-needed", "Convert AI-assisted archival review into bounded canonical source metadata where public-safe."),
  coverage("kc-town-hall-public-benefit-documentation", "source-backed", "Official Kansas City records identify Jamie as presenter, record the unanimous recommendation, and show the Council's $490,539 allocation and authorization of funding-agreement negotiations; execution and disbursement remain open.", ["SRC-KCMO-CCED-ROUND2-MINUTES-2019", "SRC-KCMO-ORDINANCE-190642-2019", "SRC-KCMO-RESOLUTION-190649-2019"], ["INQ-KC-TOWN-HALL-AGREEMENT-DISBURSEMENT"]),
  coverage("source-backed-team-memory-method", "partially-backed", "A protected June 2026 proposal supports the bounded method, human-review loop, approved-source scoping, and privacy boundaries; it does not establish a completed client engagement or production product.", ["SRC-GDRIVE-SOURCE-BACKED-SPRINT-PROPOSAL-2026"], ["INQ-PUBLIC-PROOF-SOURCE-COVERAGE"]),
  coverage("technical-operations-operating-backbone", "research-needed", "Treat this as a synthesis and map each operating capability to project evidence."),
  coverage("ai-evals-professional-development", "research-needed", "Associate the public-safe completion credential as a canonical source record."),
  ...socialArchiveProofCoverage,
  ...nycArtCSocialCorpusProofCoverage,
  ...nycartcFacebookEventProofCoverage,
  ...nycartcFacebookPostProofCoverage,
  ...personalWowlistFacebookEventProofCoverage,
  ...wowlistFacebookPostProofCoverage,
  ...callNycSocialCorpusProofCoverage,
  ...wowlistSocialCorpusProofCoverage,
  ...kcTownHallSocialCorpusProofCoverage,
  ...urbanHermitSocialCorpusProofCoverage
] satisfies ProofCoverage[];

export const frameworkPages = [
  {
    id: "fair-rent-nyc",
    surface: "/work/fair-rent-nyc",
    sourceOrder: [
      "SRC-NYCARTC-CABARET-GOTHAMIST-2017",
      "SRC-NYC-COUNCIL-CABARET-HEARING-2017",
      "SRC-BEDFORD-BOWERY-DIY-SPACES-2017",
      "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017",
      "SRC-NYC-COUNCIL-MARCH-REPORTING-2019",
      "SRC-X-NYCARTC-INBOUND-ENGAGEMENT-AUDIT-2026",
      "SRC-NYCAC-FACEBOOK-EVENT-MARCH-MEETING-2017",
      "SRC-NYCAC-FACEBOOK-EVENT-CABARET-PANEL-2017",
      "SRC-NYCAC-FACEBOOK-EVENT-NIGHTLIFE-TOWN-HALL-2017",
      "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
      "SRC-FB-NYCAC-CABARET-REPEAL-EVENT-2017",
      "SRC-FB-NYCAC-MARCH-TRANSPARENCY-2020",
      "SRC-FB-NYCAC-FAIR-RENT-VIRTUAL-HOUSE-2021"
    ],
    occurrences: [
      {
        id: "cabaret-organizing",
        claimId: "CLM-NYCARTC-CABARET-ORGANIZING",
        projection: "case-study",
        sourceIds: ["SRC-NYCARTC-CABARET-GOTHAMIST-2017", "SRC-NYC-COUNCIL-CABARET-HEARING-2017"]
      },
      {
        id: "early-mutual-aid-organizing",
        claimId: "CLM-NYCARTC-EARLY-MUTUAL-AID-ORGANIZING",
        projection: "case-study",
        sourceIds: ["SRC-BEDFORD-BOWERY-DIY-SPACES-2017"]
      },
      {
        id: "nightlife-town-hall",
        claimId: "CLM-NYCARTC-NIGHTLIFE-TOWN-HALL",
        projection: "case-study",
        sourceIds: ["SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017"]
      },
      {
        id: "march-transparency",
        claimId: "CLM-NYCARTC-MARCH-TRANSPARENCY",
        projection: "case-study",
        sourceIds: ["SRC-NYC-COUNCIL-MARCH-REPORTING-2019"]
      },
      {
        id: "council-social-engagement",
        claimId: "CLM-NYCARTC-COUNCIL-SOCIAL-ENGAGEMENT",
        projection: "case-study",
        sourceIds: ["SRC-X-NYCARTC-INBOUND-ENGAGEMENT-AUDIT-2026"]
      },
      {
        id: "participation-system",
        claimId: "CLM-NYCAC-PARTICIPATION-SYSTEM",
        projection: "case-study",
        sourceIds: [
          "SRC-NYCAC-FACEBOOK-EVENT-MARCH-MEETING-2017",
          "SRC-NYCAC-FACEBOOK-EVENT-CABARET-PANEL-2017",
          "SRC-NYCAC-FACEBOOK-EVENT-NIGHTLIFE-TOWN-HALL-2017",
          "SRC-VILLAGE-VOICE-NIGHT-MAYOR-2017",
          "SRC-NYCARTC-CABARET-GOTHAMIST-2017"
        ]
      },
      {
        id: "facebook-publication-system",
        claimId: "CLM-NYCAC-FACEBOOK-PUBLICATION-SYSTEM",
        projection: "case-study",
        sourceIds: [
          "SRC-FB-NYCAC-CABARET-REPEAL-EVENT-2017",
          "SRC-FB-NYCAC-MARCH-TRANSPARENCY-2020",
          "SRC-FB-NYCAC-FAIR-RENT-VIRTUAL-HOUSE-2021"
        ]
      },
      {
        id: "commercial-vacancy-public-data-brief",
        claimId: "CLM-COMMERCIAL-VACANCY-BASELINE-BRIEF-2026",
        projection: "case-study"
      }
    ]
  },
  {
    id: "wowlist",
    surface: "/work/wowlist",
    sourceOrder: ["SRC-X-WOWLIST-SUNDAY-DINNER-ORIGIN-2014", "SRC-X-WOWLIST-USER-TUTORIAL-2015", "SRC-X-WOWLIST-SUPPORT-FEED-SCOPE-2015", "SRC-X-WOWLIST-SUPPORT-PROFILE-2015", "SRC-X-WOWLIST-SUPPORT-EVENT-SUBMISSION-2015", "SRC-X-WOWLIST-SUPPORT-NYCDIY-IDENTITY-2016", "SRC-X-WOWLIST-SUPPORT-NYCDIY-JOIN-2016", "SRC-X-WOWLIST-SUPPORT-NYCDIY-LINEAGE-2016", "SRC-FB-WOWLIST-NINE-CITY-CALENDARS-2015", "SRC-FB-WOWLIST-LA-FORTY-ONE-EVENTS-2015", "SRC-FB-WOWLIST-PHXDIY-CONTINUITY-2018"],
    occurrences: [
      {
        id: "public-origin-and-use",
        claimId: "CLM-WOWLIST-PUBLIC-ORIGIN-AND-USE",
        projection: "case-study",
        sourceIds: ["SRC-X-WOWLIST-SUNDAY-DINNER-ORIGIN-2014", "SRC-X-WOWLIST-USER-TUTORIAL-2015"]
      },
      {
        id: "public-support-surface",
        claimId: "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE",
        projection: "case-study",
        sourceIds: ["SRC-X-WOWLIST-SUPPORT-FEED-SCOPE-2015", "SRC-X-WOWLIST-SUPPORT-PROFILE-2015", "SRC-X-WOWLIST-SUPPORT-EVENT-SUBMISSION-2015", "SRC-X-WOWLIST-SUPPORT-NYCDIY-IDENTITY-2016", "SRC-X-WOWLIST-SUPPORT-NYCDIY-JOIN-2016", "SRC-X-WOWLIST-SUPPORT-NYCDIY-LINEAGE-2016"]
      },
      {
        id: "facebook-distributed-use",
        claimId: "CLM-WOWLIST-FACEBOOK-DISTRIBUTED-USE",
        projection: "case-study",
        sourceIds: ["SRC-FB-WOWLIST-NINE-CITY-CALENDARS-2015", "SRC-FB-WOWLIST-LA-FORTY-ONE-EVENTS-2015", "SRC-FB-WOWLIST-PHXDIY-CONTINUITY-2018"]
      },
      {
        id: "facebook-publishing-role",
        claimId: "CLM-WOWLIST-FACEBOOK-PUBLISHING-ROLE",
        projection: "case-study"
      }
    ]
  },
  {
    id: "196-sunday-dinner",
    surface: "/work/196-sunday-dinner",
    sourceOrder: ["SRC-GHFC-JAMIE-JULIA-QA-2017"],
    occurrences: [
      {
        id: "weekly-open-gathering",
        claimId: "CLM-SUNDAY-DINNER-WEEKLY-OPEN",
        projection: "case-study",
        sourceIds: ["SRC-GHFC-JAMIE-JULIA-QA-2017"]
      },
      {
        id: "residency-onboarding",
        claimId: "CLM-196-RESIDENCY-ONBOARDING-2023",
        projection: "case-study"
      }
    ]
  },
  {
    id: "kc-town-hall",
    surface: "/work/kc-town-hall",
    sourceOrder: [
      "SRC-X-KC-TOWN-HALL-LAUNCH-2018",
      "SRC-X-KC-TOWN-HALL-FULL-POPULATION-AUDIT-2026",
      "SRC-KCMO-CCED-ROUND2-MINUTES-2019",
      "SRC-KCMO-ORDINANCE-190642-2019",
      "SRC-KCMO-RESOLUTION-190649-2019"
    ],
    occurrences: [
      {
        id: "durable-public-identity",
        claimId: "CLM-KC-TOWN-HALL-DURABLE-PUBLIC-IDENTITY",
        projection: "case-study",
        sourceIds: [
          "SRC-X-KC-TOWN-HALL-LAUNCH-2018",
          "SRC-X-KC-TOWN-HALL-FULL-POPULATION-AUDIT-2026"
        ]
      },
      {
        id: "council-allocation",
        claimId: "CLM-KC-TOWN-HALL-COUNCIL-ALLOCATION",
        projection: "case-study",
        sourceIds: ["SRC-KCMO-CCED-ROUND2-MINUTES-2019", "SRC-KCMO-ORDINANCE-190642-2019", "SRC-KCMO-RESOLUTION-190649-2019"]
      }
    ]
  }
] satisfies CitationPage[];
