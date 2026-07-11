import {
  citationRecordSchema,
  claimRecordSchema,
  pageCitationPlanSchema,
  researchRunSchema,
  sourceRecordSchema,
  type CitationRecord,
  type ClaimRecord,
  type PageCitationPlan,
  type ResearchRun,
  type SourceRecord
} from "./schemas.ts";

const sourceRecordsInput = [
  {
    id: "source.callnyc.civic-hall-hackathon-announcement",
    title: "Civic Hall announcement of the New York City Council hackathon",
    shortLabel: "Civic Hall announcement",
    authorOrAccount: "Civic Hall",
    publisher: "X",
    datePublished: "2016-01-29",
    kind: "official-organizational-social",
    media: "social-post",
    access: "public-with-caveat",
    publicLinkable: true,
    url: "https://x.com/CivicHall/status/693124020917522433",
    linkStatus: "live",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    publicNote:
      "Civic Hall announced a January 30, 2016 New York City Council hackathon focused on constituent services and gave the event hours as 1-3 p.m.",
    internalNote:
      "Use for announced date, time, and constituent-services focus, not for a participant roster, full agenda, or formal submission list."
  },
  {
    id: "source.callnyc.nyc-council-councilstat-post",
    title: "New York City Council post from the first CouncilStat hackathon",
    shortLabel: "CouncilStat event-day post",
    authorOrAccount: "New York City Council",
    publisher: "X",
    datePublished: "2016-01-30",
    kind: "official-organizational-social",
    media: "social-post",
    access: "public-with-caveat",
    publicLinkable: true,
    url: "https://x.com/NYCCouncil/status/693509031768506368",
    linkStatus: "live",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    publicNote:
      "The New York City Council posted from Civic Hall on January 30, 2016 and described the gathering as its first CouncilStat hackathon."
  },
  {
    id: "source.callnyc.promotional-graphic",
    title: "New York City Council Hackathon promotional graphic",
    shortLabel: "Council hackathon graphic",
    authorOrAccount: "Civic Hall",
    datePublished: "2016-01-29",
    kind: "official-organizational-social",
    media: "image",
    access: "public-with-caveat",
    publicLinkable: true,
    url: "https://pbs.twimg.com/media/CZ5m-mAWwAA42td.png:large",
    linkStatus: "live",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    rightsNote: "Publicly viewable; reproduction rights not asserted in this repo.",
    publicNote:
      "The Council-branded graphic reads 'New York City Council Hackathon' and displays labs.council.nyc.",
    internalNote:
      "Treat as recovered event branding, not proof of a longer formal registration title."
  },
  {
    id: "source.callnyc.civic-hall-wayback-embedded-feed",
    title: "Civic Hall events page with embedded social feed",
    shortLabel: "Civic Hall embedded-feed capture",
    publisher: "Internet Archive Wayback Machine",
    datePublished: "2016-01-31",
    kind: "web-archive",
    media: "web-page",
    access: "public-with-caveat",
    publicLinkable: true,
    archiveUrl:
      "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
    originalUrl: "http://civichall.org/events/page/2/",
    linkStatus: "archived",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    publicNote:
      "A January 31, 2016 Wayback capture preserves the Civic Hall and Council posts inside Civic Hall's embedded social feed.",
    internalNote:
      "This is embedded-feed evidence, not a recovered dedicated Civic Hall calendar listing."
  },
  {
    id: "source.callnyc.digital-district-photo",
    title: "Participant photograph of the Digital District breakout",
    shortLabel: "Participant photograph",
    datePublished: "2016-01-30",
    kind: "participant-archive",
    media: "photograph",
    access: "private",
    publicLinkable: false,
    linkStatus: "unavailable",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    rightsNote: "Private participant archive; not cleared for public reproduction.",
    publicNote:
      "A private participant photograph shows a 'Digital District' placard, the prompt 'Help improve City Council District office operations,' and a breakout underway at approximately 2:10 p.m.",
    internalNote:
      "The image supports the breakout-table title and approximate image timestamp, not the overall event title, event start time, participant roster, facilitation credit, or publication permission."
  },
  {
    id: "source.callnyc.politico",
    title: "Website provides new information about council members' focus",
    shortLabel: "Politico New York coverage",
    authorOrAccount: "Miranda Neubauer",
    publisher: "Politico New York",
    datePublished: "2016-03-14",
    kind: "independent-journalism",
    media: "pdf",
    access: "public",
    publicLinkable: true,
    url:
      "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf",
    linkStatus: "live",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    publicNote:
      "Politico New York connected Jamie to the January Civic Hall gathering, the later full CouncilStat data release, his independent development of CallNYC, and limitations created by inconsistent office use of the data system."
  },
  {
    id: "source.callnyc.github",
    title: "CallNYC source repository",
    shortLabel: "CallNYC repository",
    authorOrAccount: "openhouse",
    publisher: "GitHub",
    kind: "primary-project",
    media: "repository",
    access: "public",
    publicLinkable: true,
    url: "https://github.com/openhouse/CallNYC",
    linkStatus: "live",
    accessedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-11",
    publicNote:
      "The public repository documents the surviving implementation of the independent, archived CallNYC prototype."
  }
] satisfies SourceRecord[];

const claimRecordsInput = [
  {
    id: "claim.callnyc.hackathon.date-time",
    projectId: "project.callnyc",
    publicText:
      "Civic Hall announced a New York City Council constituent-services hackathon for January 30, 2016 from 1-3 p.m.",
    status: "approved",
    supportLevel: "direct",
    mustCite: true,
    publicSurfaces: ["work.callnyc"],
    evidence: [
      {
        sourceId: "source.callnyc.civic-hall-hackathon-announcement",
        relation: "supports",
        supports: "Announced event date, time, organizer label, and constituent-services focus."
      },
      {
        sourceId: "source.callnyc.civic-hall-wayback-embedded-feed",
        relation: "corroborates",
        supports: "Preserves the Civic Hall announcement in an archived embedded feed."
      }
    ],
    guardrail: "Do not treat the embedded feed as a recovered dedicated calendar page.",
    antiClaims: [
      "A recovered Civic Hall calendar listing proves the full event agenda.",
      "The event ran outside the announced 1-3 p.m. window."
    ],
    reviewedBy: ["Jamie", "Codex"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "claim.callnyc.hackathon.councilstat",
    projectId: "project.callnyc",
    publicText:
      "The New York City Council described the January 30, 2016 gathering at Civic Hall as its first CouncilStat hackathon.",
    status: "approved",
    supportLevel: "direct",
    mustCite: true,
    publicSurfaces: ["work.callnyc"],
    evidence: [
      {
        sourceId: "source.callnyc.nyc-council-councilstat-post",
        relation: "supports",
        supports: "Council event-day language names Civic Hall and the first CouncilStat hackathon."
      },
      {
        sourceId: "source.callnyc.promotional-graphic",
        relation: "contextualizes",
        supports: "Recovered event branding reads 'New York City Council Hackathon.'",
        doesNotSupport: "The graphic does not establish a longer formal registration title."
      }
    ],
    guardrail:
      "Use 'first CouncilStat hackathon' and 'New York City Council Hackathon' branding carefully; do not invent a fuller official title.",
    antiClaims: [
      "Jamie organized, led, or officially represented the New York City Council event.",
      "The promotional graphic proves a formal submission process or final project roster."
    ],
    reviewedBy: ["Jamie", "Codex"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "claim.callnyc.digital-district",
    projectId: "project.callnyc",
    publicText:
      "A private participant photograph documents a 'Digital District' breakout focused on improving City Council district-office operations.",
    status: "approved",
    supportLevel: "direct",
    mustCite: true,
    publicSurfaces: ["work.callnyc"],
    evidence: [
      {
        sourceId: "source.callnyc.digital-district-photo",
        relation: "supports",
        supports:
          "Shows the breakout placard, district-office-operations prompt, and approximate photo timestamp."
      }
    ],
    guardrail:
      "Describe the source as private participant evidence; provide no image, raw metadata, private path, or public URL.",
    antiClaims: [
      "Digital District was the event's official title.",
      "2:10 p.m. was the event's start time.",
      "The photograph establishes a full participant list or facilitation credit."
    ],
    reviewedBy: ["Jamie", "Codex"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "claim.callnyc.follow-on",
    projectId: "project.callnyc",
    publicText:
      "After the full CouncilStat dataset was released, Jamie independently developed CallNYC.org as a resident-facing interpretation of the records.",
    status: "approved",
    supportLevel: "corroborated",
    mustCite: true,
    publicSurfaces: ["work.callnyc"],
    evidence: [
      {
        sourceId: "source.callnyc.politico",
        relation: "supports",
        supports:
          "Politico reports the sequence from Civic Hall gathering to full data release to Jamie's independent CallNYC development."
      },
      {
        sourceId: "source.callnyc.github",
        relation: "corroborates",
        supports: "The public repository preserves implementation evidence for the archived prototype."
      }
    ],
    guardrail:
      "Frame CallNYC as an independent archived prototype, not an official Council service, commissioned project, or formal hackathon submission.",
    antiClaims: [
      "Jamie caused the CouncilStat release.",
      "CallNYC was an official Council product or commissioned Council service.",
      "CallNYC was a formal hackathon submission."
    ],
    reviewedBy: ["Jamie", "Codex"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "claim.callnyc.data-limitations",
    projectId: "project.callnyc",
    publicText:
      "CallNYC documented limitations created by inconsistent office recording practices and did not treat CouncilStat counts as simple performance measures.",
    status: "approved",
    supportLevel: "direct",
    mustCite: true,
    publicSurfaces: ["work.callnyc"],
    evidence: [
      {
        sourceId: "source.callnyc.politico",
        relation: "supports",
        supports:
          "Politico quotes Jamie on filtering records and reports Council staff caution about variation in office use of the data system."
      }
    ],
    guardrail:
      "Counts may contextualize recorded cases; they must not be written as rankings of office quality, effectiveness, specialization, or resident need.",
    antiClaims: [
      "CouncilStat counts were simple measures of office quality.",
      "CouncilStat counts showed which offices were best or worst.",
      "CallNYC measured improvements in constituent-service outcomes."
    ],
    reviewedBy: ["Jamie", "Codex"],
    reviewedAt: "2026-07-11"
  },
  {
    id: "claim.callnyc.archive-disclaimer",
    projectId: "project.callnyc",
    publicText:
      "CallNYC is an archived independent civic-data prototype and should not be used as current resident guidance.",
    status: "approved",
    supportLevel: "corroborated",
    mustCite: true,
    publicSurfaces: ["work.callnyc"],
    evidence: [
      {
        sourceId: "source.callnyc.politico",
        relation: "contextualizes",
        supports: "Provides historical 2016 coverage and civic-data context."
      },
      {
        sourceId: "source.callnyc.github",
        relation: "contextualizes",
        supports: "Preserves the historical project implementation."
      }
    ],
    guardrail:
      "Keep the archived and unofficial status visible near project summaries and disclaimers.",
    antiClaims: [
      "CallNYC is a current city service.",
      "CallNYC provides current legal, emergency, or comprehensive civic guidance.",
      "Speaker Melissa Mark-Viverito attended."
    ],
    reviewedBy: ["Jamie", "Codex"],
    reviewedAt: "2026-07-11"
  }
] satisfies ClaimRecord[];

const citationRecordsInput = [
  {
    id: "citation.callnyc.hackathon.date-time",
    shortLabel: "January 30 Civic Hall announcement",
    claimIds: ["claim.callnyc.hackathon.date-time"],
    sourceIds: [
      "source.callnyc.civic-hall-hackathon-announcement",
      "source.callnyc.civic-hall-wayback-embedded-feed"
    ],
    publicNote:
      "Civic Hall announced the January 30, 2016 New York City Council hackathon for 1-3 p.m.; a Wayback capture preserves the announcement in Civic Hall's embedded social feed.",
    publicCaveat:
      "The archive supports the social-feed record. It is not treated as a recovered dedicated calendar listing."
  },
  {
    id: "citation.callnyc.hackathon.councilstat",
    shortLabel: "First CouncilStat hackathon",
    claimIds: ["claim.callnyc.hackathon.councilstat"],
    sourceIds: [
      "source.callnyc.nyc-council-councilstat-post",
      "source.callnyc.promotional-graphic"
    ],
    publicNote:
      "The New York City Council described the January 30, 2016 Civic Hall gathering as its first CouncilStat hackathon; recovered event branding reads 'New York City Council Hackathon.'",
    publicCaveat:
      "This supports the event context and recovered branding, not a broader claim that Jamie organized or officially represented the Council."
  },
  {
    id: "citation.callnyc.digital-district",
    shortLabel: "Digital District breakout",
    claimIds: ["claim.callnyc.digital-district"],
    sourceIds: ["source.callnyc.digital-district-photo"],
    publicNote:
      "A private participant photograph documents a 'Digital District' breakout focused on improving City Council district-office operations.",
    publicCaveat:
      "No image, raw metadata, private path, or public URL is published. The source does not establish the overall event title or event start time."
  },
  {
    id: "citation.callnyc.follow-on",
    shortLabel: "Independent CallNYC follow-on",
    claimIds: ["claim.callnyc.follow-on"],
    sourceIds: ["source.callnyc.politico", "source.callnyc.github"],
    publicNote:
      "Politico New York reported the sequence from Civic Hall gathering to full CouncilStat data release to Jamie's independent development of CallNYC; the public repository preserves the prototype implementation.",
    publicCaveat:
      "This supports independent follow-on work, not an official Council service, commissioned project, or formal hackathon submission."
  },
  {
    id: "citation.callnyc.data-limitations",
    shortLabel: "CouncilStat data limits",
    claimIds: ["claim.callnyc.data-limitations"],
    sourceIds: ["source.callnyc.politico"],
    publicNote:
      "Politico New York reported Jamie's filtering approach and Council staff cautions about inconsistent office recording practices.",
    publicCaveat:
      "CouncilStat counts should not be read as simple rankings of office quality, effectiveness, specialization, or resident need."
  },
  {
    id: "citation.callnyc.archive-disclaimer",
    shortLabel: "Archived independent prototype",
    claimIds: ["claim.callnyc.archive-disclaimer"],
    sourceIds: ["source.callnyc.politico", "source.callnyc.github"],
    publicNote:
      "The public record supports CallNYC as a 2016 independent civic-data prototype, now presented as historical portfolio evidence.",
    publicCaveat:
      "Do not use archived CallNYC pages, statistics, categories, or contact guidance as present-day resident guidance."
  }
] satisfies CitationRecord[];

const researchRunsInput = [
  {
    id: "research.callnyc.civic-hall-wayback.2026-07-11",
    topic: "CallNYC event chronology and public-safe citation basis",
    conductedAt: "2026-07-11",
    conductedBy: "Codex with Jamie Burkart",
    sourcesConsulted: [
      "source.callnyc.civic-hall-hackathon-announcement",
      "source.callnyc.nyc-council-councilstat-post",
      "source.callnyc.promotional-graphic",
      "source.callnyc.civic-hall-wayback-embedded-feed",
      "source.callnyc.digital-district-photo",
      "source.callnyc.politico",
      "source.callnyc.github"
    ],
    findings: [
      "The defensible public chronology is January 2016 Civic Hall / CouncilStat event context, March 2016 full data release and coverage, and independent CallNYC follow-on work.",
      "The 'Digital District' language is defensible as a breakout title supported by private participant evidence, not as the title of the overall event.",
      "The strongest public claim is independent resident-facing interpretation of CouncilStat records, with archived and unofficial status explicit."
    ],
    negativeFindings: [
      "No recovered source in this record establishes a formal hackathon submission by Jamie.",
      "No recovered source in this record establishes a full participant roster, facilitator roster, official winners, or measured service outcomes.",
      "No recovered source in this record establishes that CouncilStat counts are simple performance measures."
    ],
    publicSummary:
      "Public-safe research supports a narrower, stronger CallNYC claim: Jamie participated in the January 2016 Civic Hall / CouncilStat context, then independently built an archived resident-facing interpretation of released constituent-services records.",
    publicUseBoundary:
      "Publish only source summaries and public links. Do not publish private participant images, private paths, raw metadata, or speculative attendance and credit claims."
  }
] satisfies ResearchRun[];

const pageCitationPlansInput = [
  {
    pageId: "work.callnyc",
    path: "/work/callnyc",
    citationIds: [
      "citation.callnyc.hackathon.date-time",
      "citation.callnyc.hackathon.councilstat",
      "citation.callnyc.digital-district",
      "citation.callnyc.follow-on",
      "citation.callnyc.data-limitations",
      "citation.callnyc.archive-disclaimer"
    ]
  }
] satisfies PageCitationPlan[];

export const sourceRecords = sourceRecordSchema.array().parse(sourceRecordsInput);
export const claimRecords = claimRecordSchema.array().parse(claimRecordsInput);
export const citationRecords = citationRecordSchema.array().parse(citationRecordsInput);
export const researchRuns = researchRunSchema.array().parse(researchRunsInput);
export const pageCitationPlans = pageCitationPlanSchema.array().parse(pageCitationPlansInput);
