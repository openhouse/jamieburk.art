import {
  knowledgeBankSchema,
  type ArtifactRecord,
  type CitationGroup,
  type ClaimRecord,
  type CorrectionRecord,
  type EvidenceEdge,
  type KnowledgeBank,
  type PageProjection,
  type ResearchRun,
  type SourceRecord
} from "../schemas.ts";

const review = {
  reviewedBy: ["Jamie Burkart"],
  reviewedAt: "2026-07-11",
  reviewedBasis: "Owner instruction for citational-care composite"
};

const sources = [
  {
    id: "source.callnyc.civic-hall-x-announcement",
    type: "social-post",
    creator: "Civic Hall",
    title: "Civic Hall announcement of the New York City Council hackathon",
    publishedAt: "2016-01-29",
    url: "https://x.com/CivicHall/status/693124020917522433",
    visibility: "public",
    publicLinkable: true,
    publicDescription:
      "Civic Hall announced a January 30, 2016 New York City Council hackathon focused on constituent services and gave the event time as 1-3 p.m.",
    authority: {
      class: "primary",
      relationship: "Public announcement by the host venue account."
    },
    rights: {
      permissionStatus: "public-link-only",
      publicCitationStatus: "link"
    },
    reviewStatus: "approved-public",
    ...review,
    notes:
      "Use for date, time, organizer label, and constituent-services focus. Do not use for participant roster or formal submission status."
  },
  {
    id: "source.callnyc.promotional-graphic",
    type: "image",
    creator: "Civic Hall / New York City Council event promotion",
    title: "New York City Council Hackathon promotional graphic",
    publishedAt: "2016-01-29",
    url: "https://pbs.twimg.com/media/CZ5m-mAWwAA42td.png:large",
    visibility: "public",
    publicLinkable: true,
    publicDescription:
      "The recovered promotional graphic reads 'New York City Council Hackathon' and displays labs.council.nyc.",
    authority: {
      class: "primary",
      relationship: "Recovered public event graphic."
    },
    rights: {
      permissionStatus: "public-link-only",
      publicCitationStatus: "link"
    },
    reviewStatus: "approved-public",
    ...review,
    notes:
      "Link only. Do not reproduce the image in this PR or use it as proof of a formal registration title."
  },
  {
    id: "source.callnyc.nyc-council-x-councilstat",
    type: "social-post",
    creator: "New York City Council",
    title: "New York City Council event-day post from the first CouncilStat hackathon",
    publishedAt: "2016-01-30",
    url: "https://x.com/NYCCouncil/status/693509031768506368",
    visibility: "public",
    publicLinkable: true,
    publicDescription:
      "The New York City Council posted from Civic Hall on January 30, 2016 and described the gathering as its first CouncilStat hackathon.",
    authority: {
      class: "primary",
      relationship: "Event-day statement by the Council account."
    },
    rights: {
      permissionStatus: "public-link-only",
      publicCitationStatus: "link"
    },
    reviewStatus: "approved-public",
    ...review
  },
  {
    id: "source.callnyc.civic-hall-wayback-feed",
    type: "archived-web-page",
    creator: "Internet Archive Wayback Machine",
    title: "Civic Hall events page with embedded social feed",
    capturedAt: "2016-01-31",
    archiveUrl:
      "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
    visibility: "public-archived",
    publicLinkable: true,
    publicDescription:
      "A January 31, 2016 Wayback capture preserves the Civic Hall and Council posts inside Civic Hall's embedded social feed.",
    authority: {
      class: "primary",
      relationship: "Archived capture preserving public source context."
    },
    rights: {
      permissionStatus: "public-link-only",
      publicCitationStatus: "link"
    },
    reviewStatus: "approved-public",
    ...review,
    notes:
      "This is embedded-feed evidence, not a recovered dedicated Civic Hall calendar listing or event-detail page."
  },
  {
    id: "source.callnyc.politico",
    type: "press-article",
    creator: "Miranda Neubauer / Politico New York",
    title: "Website provides new information about council members' focus",
    publishedAt: "2016-03-14",
    url:
      "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf",
    visibility: "public",
    publicLinkable: true,
    publicDescription:
      "Politico New York connected Jamie to the January Civic Hall gathering, the later complete CouncilStat data release, independent CallNYC development, and limits caused by inconsistent office use of the data system.",
    authority: {
      class: "secondary",
      relationship: "Contemporary journalism about the CallNYC prototype."
    },
    rights: {
      permissionStatus: "public-link-only",
      publicCitationStatus: "link"
    },
    reviewStatus: "approved-public",
    ...review
  },
  {
    id: "source.callnyc.github",
    type: "code-repository",
    creator: "openhouse",
    title: "CallNYC source repository",
    url: "https://github.com/openhouse/CallNYC",
    visibility: "public",
    publicLinkable: true,
    publicDescription:
      "The public repository preserves the surviving implementation of the independent archived CallNYC prototype.",
    authority: {
      class: "primary",
      relationship: "Project implementation record."
    },
    rights: {
      permissionStatus: "public-link-only",
      publicCitationStatus: "link"
    },
    reviewStatus: "approved-public",
    ...review
  },
  {
    id: "source.callnyc.participant-photo-source",
    type: "image",
    creator: "Private participant archive",
    title: "Private participant photograph of the Digital District breakout",
    publishedAt: "2016-01-30",
    visibility: "private-primary-evidence",
    publicLinkable: false,
    publicDescription:
      "A participant photograph dated January 30, 2016, made at approximately 2:10 p.m., shows a 'Digital District' placard and the prompt 'Help improve City Council District office operations.'",
    authority: {
      class: "primary",
      relationship: "Private participant primary evidence summarized without publication."
    },
    rights: {
      permissionStatus: "summary-only",
      publicCitationStatus: "describe-without-link"
    },
    reviewStatus: "approved-summary-only",
    ...review,
    notes:
      "Do not publish the image, raw metadata, private locator, or any inferred roster."
  }
] satisfies SourceRecord[];

const artifacts = [
  {
    id: "artifact.callnyc.digital-district-photo",
    sourceId: "source.callnyc.participant-photo-source",
    type: "photograph",
    publicDescription:
      "Private participant photograph showing the Digital District breakout placard and prompt at approximately 2:10 p.m. on January 30, 2016.",
    rights: {
      permissionStatus: "summary-only"
    },
    consent: {
      status: "permission-required",
      notes: "The image is not approved for publication in this PR."
    },
    publicLinkable: false,
    allowedPages: ["work.callnyc"],
    supports: ["claim.callnyc.digital-district-breakout"],
    doesNotSupport: [
      "event start time",
      "official event title",
      "complete attendee roster"
    ],
    ...review
  }
] satisfies ArtifactRecord[];

const claims = [
  {
    id: "claim.callnyc.hackathon-date-time",
    subject: "CallNYC event chronology",
    approvedPublicText:
      "Civic Hall announced a New York City Council constituent-services hackathon for January 30, 2016 from 1-3 p.m.",
    status: "confirmed",
    confidence: "high",
    risk: "low",
    citationRequired: true,
    allowedPages: ["work.callnyc"],
    guardrails: ["Do not treat the archived embedded feed as a recovered calendar listing."],
    antiClaims: [
      "A recovered Civic Hall calendar listing proves the full event agenda.",
      "The participant photograph timestamp was the event start time."
    ],
    evidenceEdgeIds: [
      "edge.callnyc.hackathon-date-time.civic-hall",
      "edge.callnyc.hackathon-date-time.wayback-preserves-feed"
    ],
    correctionIds: ["correction.callnyc.time-distinction"],
    reviewStatus: "approved-public",
    ...review
  },
  {
    id: "claim.callnyc.first-councilstat-hackathon",
    subject: "CallNYC event characterization",
    approvedPublicText:
      "The New York City Council described the January 30, 2016 Civic Hall gathering as its first CouncilStat hackathon.",
    status: "confirmed",
    confidence: "high",
    risk: "medium",
    citationRequired: true,
    allowedPages: ["work.callnyc"],
    guardrails: [
      "Use the narrower CouncilStat wording supported by the Council source.",
      "Do not call it the first civic-data hackathon."
    ],
    antiClaims: [
      "Jamie organized, led, or officially represented the New York City Council event.",
      "The event was the first civic-data hackathon in New York City.",
      "The promotional graphic proves a formal submission process or final project roster."
    ],
    evidenceEdgeIds: [
      "edge.callnyc.first-councilstat.nyc-council",
      "edge.callnyc.first-councilstat.promotional-graphic"
    ],
    correctionIds: ["correction.callnyc.event-characterization"],
    reviewStatus: "approved-public",
    ...review
  },
  {
    id: "claim.callnyc.wayback-not-recovered-listing",
    subject: "CallNYC event-source limitations",
    approvedPublicText:
      "No dedicated Civic Hall calendar listing or event-detail page was recovered within the documented Wayback/CDX search.",
    status: "not-recovered",
    confidence: "medium",
    risk: "medium",
    citationRequired: true,
    allowedPages: ["work.callnyc"],
    guardrails: [
      "Say not recovered within this search, not never existed.",
      "Do not make nonexistence claims from a bounded negative search."
    ],
    antiClaims: [
      "No dedicated listing ever existed.",
      "The Wayback capture is a recovered event-detail page.",
      "The embedded social feed establishes the full event agenda."
    ],
    evidenceEdgeIds: [
      "edge.callnyc.wayback-feed.preserves",
      "edge.callnyc.wayback-search.not-recovered"
    ],
    reviewStatus: "approved-public",
    ...review
  },
  {
    id: "claim.callnyc.digital-district-breakout",
    subject: "Digital District breakout",
    approvedPublicText:
      "A private participant photograph documents a Digital District breakout focused on improving City Council district-office operations.",
    status: "participant-archive-supported",
    confidence: "high",
    risk: "medium",
    citationRequired: true,
    allowedPages: ["work.callnyc"],
    guardrails: [
      "Describe the source as private participant evidence.",
      "Publish no image, raw metadata, private path, or public URL."
    ],
    antiClaims: [
      "Digital District was the event's official title.",
      "2:10 p.m. was the event start time.",
      "The photograph establishes a complete attendee roster.",
      "The photograph establishes facilitation credit."
    ],
    evidenceEdgeIds: [
      "edge.callnyc.digital-district.photo-supports",
      "edge.callnyc.digital-district.photo-does-not-support-title",
      "edge.callnyc.digital-district.photo-does-not-support-start-time",
      "edge.callnyc.digital-district.photo-does-not-support-roster"
    ],
    correctionIds: ["correction.callnyc.time-distinction"],
    reviewStatus: "approved-public",
    ...review
  },
  {
    id: "claim.callnyc.independent-follow-on",
    subject: "CallNYC project sequence",
    approvedPublicText:
      "After the complete CouncilStat dataset became available, Jamie independently developed CallNYC.org as a resident-facing interpretation of the records.",
    status: "corroborated",
    confidence: "high",
    risk: "medium",
    citationRequired: true,
    allowedPages: ["work.callnyc"],
    guardrails: [
      "Frame CallNYC as independent follow-on work.",
      "Do not present it as an official Council service, commissioned project, or formal hackathon submission."
    ],
    antiClaims: [
      "Jamie caused the CouncilStat release.",
      "CallNYC was an official NYC Council service.",
      "CallNYC was a commissioned Council product.",
      "CallNYC was a formal hackathon submission."
    ],
    evidenceEdgeIds: [
      "edge.callnyc.follow-on.politico",
      "edge.callnyc.follow-on.github"
    ],
    correctionIds: ["correction.callnyc.years"],
    reviewStatus: "approved-public",
    ...review
  },
  {
    id: "claim.callnyc.data-limitations",
    subject: "CouncilStat interpretive limits",
    approvedPublicText:
      "CallNYC preserved limits around inconsistent office recording practices and did not treat CouncilStat counts as simple performance measures.",
    status: "confirmed",
    confidence: "high",
    risk: "medium",
    citationRequired: true,
    allowedPages: ["work.callnyc"],
    guardrails: [
      "Counts may contextualize recorded cases, but they are not rankings of office quality, effectiveness, specialization, or resident need."
    ],
    antiClaims: [
      "CouncilStat counts were simple measures of office quality.",
      "CouncilStat counts showed which offices were best or worst.",
      "CallNYC measured improvements in constituent-service outcomes."
    ],
    evidenceEdgeIds: ["edge.callnyc.data-limitations.politico"],
    reviewStatus: "approved-public",
    ...review
  },
  {
    id: "claim.callnyc.archived-independent-prototype",
    subject: "CallNYC current status",
    approvedPublicText:
      "CallNYC is an archived independent civic-data prototype and should not be used as current resident guidance.",
    status: "corroborated",
    confidence: "high",
    risk: "low",
    citationRequired: true,
    allowedPages: ["work.callnyc"],
    guardrails: [
      "Keep archived and unofficial status visible near project summaries and disclaimers."
    ],
    antiClaims: [
      "CallNYC is a current city service.",
      "CallNYC provides current legal, emergency, or comprehensive civic guidance.",
      "CallNYC is an official NYC Council service."
    ],
    evidenceEdgeIds: [
      "edge.callnyc.archive-status.politico",
      "edge.callnyc.archive-status.github"
    ],
    reviewStatus: "approved-public",
    ...review
  }
] satisfies ClaimRecord[];

const evidenceEdges = [
  {
    id: "edge.callnyc.hackathon-date-time.civic-hall",
    claimId: "claim.callnyc.hackathon-date-time",
    target: { kind: "source", id: "source.callnyc.civic-hall-x-announcement" },
    relation: "supports",
    publicExplanation:
      "Supports the January 30, 2016 date, 1-3 p.m. time, New York City Council label, and constituent-services focus."
  },
  {
    id: "edge.callnyc.hackathon-date-time.wayback-preserves-feed",
    claimId: "claim.callnyc.hackathon-date-time",
    target: { kind: "source", id: "source.callnyc.civic-hall-wayback-feed" },
    relation: "preserves",
    publicExplanation:
      "Preserves the public announcement context inside an embedded Civic Hall social feed."
  },
  {
    id: "edge.callnyc.first-councilstat.nyc-council",
    claimId: "claim.callnyc.first-councilstat-hackathon",
    target: { kind: "source", id: "source.callnyc.nyc-council-x-councilstat" },
    relation: "supports",
    publicExplanation:
      "Supports the narrower phrase 'first CouncilStat hackathon' from the Council's event-day post."
  },
  {
    id: "edge.callnyc.first-councilstat.promotional-graphic",
    claimId: "claim.callnyc.first-councilstat-hackathon",
    target: { kind: "source", id: "source.callnyc.promotional-graphic" },
    relation: "contextualizes",
    publicExplanation:
      "Contextualizes recovered event branding as 'New York City Council Hackathon.'"
  },
  {
    id: "edge.callnyc.wayback-feed.preserves",
    claimId: "claim.callnyc.wayback-not-recovered-listing",
    target: { kind: "source", id: "source.callnyc.civic-hall-wayback-feed" },
    relation: "preserves",
    publicExplanation:
      "Preserves embedded social-feed evidence, not a dedicated calendar listing."
  },
  {
    id: "edge.callnyc.wayback-search.not-recovered",
    claimId: "claim.callnyc.wayback-not-recovered-listing",
    target: { kind: "research-run", id: "research.callnyc.wayback-cdx.2026-07-11" },
    relation: "qualifies",
    publicExplanation:
      "Documents that a dedicated Civic Hall calendar listing or event-detail page was not recovered within the bounded search."
  },
  {
    id: "edge.callnyc.digital-district.photo-supports",
    claimId: "claim.callnyc.digital-district-breakout",
    target: { kind: "artifact", id: "artifact.callnyc.digital-district-photo" },
    relation: "supports",
    publicExplanation:
      "Supports the Digital District breakout placard, district-office-operations prompt, and approximate image timestamp."
  },
  {
    id: "edge.callnyc.digital-district.photo-does-not-support-title",
    claimId: "claim.callnyc.digital-district-breakout",
    target: { kind: "artifact", id: "artifact.callnyc.digital-district-photo" },
    relation: "does-not-support",
    publicExplanation:
      "Does not support treating Digital District as the official event title."
  },
  {
    id: "edge.callnyc.digital-district.photo-does-not-support-start-time",
    claimId: "claim.callnyc.digital-district-breakout",
    target: { kind: "artifact", id: "artifact.callnyc.digital-district-photo" },
    relation: "does-not-support",
    publicExplanation:
      "Does not support treating approximately 2:10 p.m. as the event start time."
  },
  {
    id: "edge.callnyc.digital-district.photo-does-not-support-roster",
    claimId: "claim.callnyc.digital-district-breakout",
    target: { kind: "artifact", id: "artifact.callnyc.digital-district-photo" },
    relation: "does-not-support",
    publicExplanation:
      "Does not support a complete attendee roster or facilitation credit."
  },
  {
    id: "edge.callnyc.follow-on.politico",
    claimId: "claim.callnyc.independent-follow-on",
    target: { kind: "source", id: "source.callnyc.politico" },
    relation: "supports",
    publicExplanation:
      "Supports the sequence from Civic Hall gathering to complete data release to independent CallNYC development."
  },
  {
    id: "edge.callnyc.follow-on.github",
    claimId: "claim.callnyc.independent-follow-on",
    target: { kind: "source", id: "source.callnyc.github" },
    relation: "corroborates",
    publicExplanation:
      "Corroborates surviving implementation of the archived prototype."
  },
  {
    id: "edge.callnyc.data-limitations.politico",
    claimId: "claim.callnyc.data-limitations",
    target: { kind: "source", id: "source.callnyc.politico" },
    relation: "supports",
    publicExplanation:
      "Supports Jamie's filtering approach and Council staff cautions about variation in office recording practices."
  },
  {
    id: "edge.callnyc.archive-status.politico",
    claimId: "claim.callnyc.archived-independent-prototype",
    target: { kind: "source", id: "source.callnyc.politico" },
    relation: "contextualizes",
    publicExplanation:
      "Provides the 2016 public context for the prototype."
  },
  {
    id: "edge.callnyc.archive-status.github",
    claimId: "claim.callnyc.archived-independent-prototype",
    target: { kind: "source", id: "source.callnyc.github" },
    relation: "contextualizes",
    publicExplanation:
      "Preserves the historical project implementation."
  }
] satisfies EvidenceEdge[];

const citationGroups = [
  {
    id: "citation.callnyc.hackathon-date-time",
    claimIds: ["claim.callnyc.hackathon-date-time"],
    evidenceEdgeIds: [
      "edge.callnyc.hackathon-date-time.civic-hall",
      "edge.callnyc.hackathon-date-time.wayback-preserves-feed"
    ],
    shortLabel: "Civic Hall announcement",
    publicNote:
      "Civic Hall announced the January 30, 2016 New York City Council hackathon for 1-3 p.m.; a Wayback capture preserves the announcement in Civic Hall's embedded social feed.",
    publicCaveat:
      "The archive supports the social-feed record. It is not treated as a recovered dedicated calendar listing."
  },
  {
    id: "citation.callnyc.first-councilstat-hackathon",
    claimIds: ["claim.callnyc.first-councilstat-hackathon"],
    evidenceEdgeIds: [
      "edge.callnyc.first-councilstat.nyc-council",
      "edge.callnyc.first-councilstat.promotional-graphic"
    ],
    shortLabel: "First CouncilStat hackathon",
    publicNote:
      "The New York City Council described the January 30, 2016 Civic Hall gathering as its first CouncilStat hackathon; recovered event branding reads 'New York City Council Hackathon.'",
    publicCaveat:
      "This supports event context and branding, not a broader claim that Jamie organized or officially represented the Council."
  },
  {
    id: "citation.callnyc.wayback-not-recovered-listing",
    claimIds: ["claim.callnyc.wayback-not-recovered-listing"],
    evidenceEdgeIds: [
      "edge.callnyc.wayback-feed.preserves",
      "edge.callnyc.wayback-search.not-recovered"
    ],
    shortLabel: "Wayback embedded-feed limit",
    publicNote:
      "The Wayback capture preserves embedded social-feed evidence. A documented Wayback/CDX search did not recover a dedicated Civic Hall calendar listing or event-detail page.",
    publicCaveat:
      "This supports 'not recovered within this search,' not 'never existed.'"
  },
  {
    id: "citation.callnyc.digital-district-breakout",
    claimIds: ["claim.callnyc.digital-district-breakout"],
    evidenceEdgeIds: [
      "edge.callnyc.digital-district.photo-supports",
      "edge.callnyc.digital-district.photo-does-not-support-title",
      "edge.callnyc.digital-district.photo-does-not-support-start-time",
      "edge.callnyc.digital-district.photo-does-not-support-roster"
    ],
    shortLabel: "Digital District breakout",
    publicNote:
      "A private participant photograph documents a Digital District breakout focused on improving City Council district-office operations.",
    publicCaveat:
      "No image, raw metadata, private path, or public URL is published. The photograph does not establish the overall event title, event start time, complete roster, or facilitation credit."
  },
  {
    id: "citation.callnyc.independent-follow-on",
    claimIds: ["claim.callnyc.independent-follow-on"],
    evidenceEdgeIds: [
      "edge.callnyc.follow-on.politico",
      "edge.callnyc.follow-on.github"
    ],
    shortLabel: "Independent CallNYC follow-on",
    publicNote:
      "Politico New York reported the sequence from Civic Hall gathering to complete CouncilStat data release to Jamie's independent development of CallNYC; the public repository preserves the prototype implementation.",
    publicCaveat:
      "This supports independent follow-on work, not an official Council service, commissioned project, or formal hackathon submission."
  },
  {
    id: "citation.callnyc.data-limitations",
    claimIds: ["claim.callnyc.data-limitations"],
    evidenceEdgeIds: ["edge.callnyc.data-limitations.politico"],
    shortLabel: "CouncilStat data limits",
    publicNote:
      "Politico New York reported Jamie's filtering approach and Council staff cautions about inconsistent office recording practices.",
    publicCaveat:
      "CouncilStat counts should not be read as simple rankings of office quality, effectiveness, specialization, or resident need."
  },
  {
    id: "citation.callnyc.archived-independent-prototype",
    claimIds: ["claim.callnyc.archived-independent-prototype"],
    evidenceEdgeIds: [
      "edge.callnyc.archive-status.politico",
      "edge.callnyc.archive-status.github"
    ],
    shortLabel: "Archived independent prototype",
    publicNote:
      "The public record supports CallNYC as a 2016 independent civic-data prototype, now presented as historical portfolio evidence.",
    publicCaveat:
      "Do not use archived CallNYC pages, statistics, categories, or contact guidance as present-day resident guidance."
  }
] satisfies CitationGroup[];

const researchRuns = [
  {
    id: "research.callnyc.wayback-cdx.2026-07-11",
    type: "Wayback/CDX bounded source recovery",
    visibility: "private",
    publicSummary:
      "A documented Wayback/CDX review was used to separate recovered embedded social-feed evidence from unrecovered dedicated listing evidence.",
    scope: {
      reviewedYear: "2016",
      reviewedDomain: "civichall.org",
      sourceCountRepresented: 7
    },
    finding:
      "No dedicated Civic Hall calendar listing or event-detail page was recovered within the documented search.",
    limitation:
      "This supports 'not recovered within this search,' not 'never existed.'",
    ...review
  }
] satisfies ResearchRun[];

const corrections = [
  {
    id: "correction.callnyc.years",
    targetClaimId: "claim.callnyc.independent-follow-on",
    correctedAt: "2026-07-11",
    priorPublicText: "CallNYC project years: 2014-2015",
    revisedPublicText: "CallNYC project years: 2016",
    reason: "Newly consolidated chronology and public-source review.",
    evidenceEdgeIds: [
      "edge.callnyc.follow-on.politico",
      "edge.callnyc.follow-on.github"
    ],
    status: "applied",
    reviewedBy: ["Jamie Burkart"]
  },
  {
    id: "correction.callnyc.event-characterization",
    targetClaimId: "claim.callnyc.first-councilstat-hackathon",
    correctedAt: "2026-07-11",
    priorPublicText: "generic / unsupported first civic-data hackathon",
    revisedPublicText: "New York City Council's first CouncilStat hackathon",
    reason: "NYC Council event-day source supports the narrower wording.",
    evidenceEdgeIds: ["edge.callnyc.first-councilstat.nyc-council"],
    status: "applied",
    reviewedBy: ["Jamie Burkart"]
  },
  {
    id: "correction.callnyc.time-distinction",
    targetClaimId: "claim.callnyc.hackathon-date-time",
    correctedAt: "2026-07-11",
    priorPublicText: "2:10 p.m. could be read as the event start time",
    revisedPublicText:
      "Participant photograph was made at approximately 2:10 p.m.; the event was announced for 1-3 p.m.",
    reason:
      "Civic Hall announcement and private image metadata establish different facts.",
    evidenceEdgeIds: [
      "edge.callnyc.hackathon-date-time.civic-hall",
      "edge.callnyc.digital-district.photo-supports"
    ],
    status: "applied",
    reviewedBy: ["Jamie Burkart"]
  }
] satisfies CorrectionRecord[];

const pageProjections = [
  {
    id: "work.callnyc",
    path: "/work/callnyc",
    occurrences: [
      {
        occurrenceId: "callnyc-context-date-time",
        citationGroupId: "citation.callnyc.hackathon-date-time"
      },
      {
        occurrenceId: "callnyc-context-councilstat",
        citationGroupId: "citation.callnyc.first-councilstat-hackathon"
      },
      {
        occurrenceId: "callnyc-context-wayback-limit",
        citationGroupId: "citation.callnyc.wayback-not-recovered-listing"
      },
      {
        occurrenceId: "callnyc-work-digital-district",
        citationGroupId: "citation.callnyc.digital-district-breakout"
      },
      {
        occurrenceId: "callnyc-outcome-follow-on",
        citationGroupId: "citation.callnyc.independent-follow-on"
      },
      {
        occurrenceId: "callnyc-outcome-data-limits",
        citationGroupId: "citation.callnyc.data-limitations"
      },
      {
        occurrenceId: "callnyc-disclaimer-archive",
        citationGroupId: "citation.callnyc.archived-independent-prototype"
      },
      {
        occurrenceId: "callnyc-transfer-archive-repeat",
        citationGroupId: "citation.callnyc.archived-independent-prototype"
      }
    ]
  }
] satisfies PageProjection[];

export const callNYCKnowledgeBank = knowledgeBankSchema.parse({
  sources,
  artifacts,
  claims,
  evidenceEdges,
  citationGroups,
  researchRuns,
  corrections,
  pageProjections
}) satisfies KnowledgeBank;
