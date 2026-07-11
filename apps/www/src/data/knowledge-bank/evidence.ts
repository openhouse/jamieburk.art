import {
  evidenceRelationshipSchema,
  type EvidenceRelationship
} from "./schema.ts";

const evidenceInput: EvidenceRelationship[] = [
  {
    id: "evidence-callnyc-event-announcement",
    claimId: "callnyc-event-date-time",
    sourceId: "civic-hall-hackathon-announcement-2016",
    relation: "supports",
    supports: "The announced January 30 date, constituent-services focus, and 1-3 p.m. hours.",
    doesNotSupport: "A complete agenda, participant list, or formal registration title."
  },
  {
    id: "evidence-callnyc-event-wayback",
    claimId: "callnyc-event-date-time",
    sourceId: "civic-hall-embedded-feed-wayback-2016-01-31",
    relation: "corroborates",
    supports: "Preservation of the relevant event posts in Civic Hall's embedded social feed.",
    doesNotSupport: "A recovered Civic Hall calendar listing."
  },
  {
    id: "evidence-callnyc-branding-graphic",
    claimId: "callnyc-event-branding",
    sourceId: "civic-hall-hackathon-promotional-graphic-2016",
    relation: "supports",
    supports: "The visible wording 'New York City Council Hackathon.'",
    doesNotSupport: "A longer formal registration title."
  },
  {
    id: "evidence-callnyc-councilstat-post",
    claimId: "callnyc-councilstat-context",
    sourceId: "nyc-council-councilstat-hackathon-post-2016",
    relation: "supports",
    supports: "The Council's event-day description of the gathering as its first CouncilStat hackathon.",
    doesNotSupport: "Jamie's role as organizer or official representative."
  },
  {
    id: "evidence-callnyc-digital-district-photo",
    claimId: "callnyc-digital-district-breakout",
    sourceId: "participant-archive-digital-district-2016",
    relation: "supports",
    supports: "The breakout-table placard and approximately 2:10 p.m. participant-photo timestamp.",
    doesNotSupport: "The event's overall title, event start time, facilitator, or full breakout roster."
  },
  {
    id: "evidence-callnyc-participation-politico",
    claimId: "callnyc-jamie-participation",
    sourceId: "politico-callnyc-2016-03-14",
    relation: "supports",
    supports: "Jamie's participation in the January Civic Hall event.",
    doesNotSupport: "That Jamie organized or officially represented the event."
  },
  {
    id: "evidence-callnyc-follow-on-politico",
    claimId: "callnyc-independent-follow-on",
    sourceId: "politico-callnyc-2016-03-14",
    relation: "supports",
    supports: "The dataset release chronology and Jamie's subsequent independent development of CallNYC.",
    doesNotSupport: "Official Council ownership, commissioning, causation, or hackathon-award status."
  },
  {
    id: "evidence-callnyc-method-politico",
    claimId: "callnyc-product-method",
    sourceId: "politico-callnyc-2016-03-14",
    relation: "supports",
    supports: "Issue-oriented organization and the exclusion of records lacking borough data as one spam/out-of-city filter.",
    doesNotSupport: "Measured service outcomes or a claim that filtered records were definitively invalid."
  },
  {
    id: "evidence-callnyc-method-repository",
    claimId: "callnyc-product-method",
    sourceId: "callnyc-source-repository",
    relation: "corroborates",
    supports: "The surviving implementation and public interface structure.",
    doesNotSupport: "Contemporary usage levels or current-service accuracy."
  },
  {
    id: "evidence-callnyc-iteration-politico",
    claimId: "callnyc-use-and-iteration",
    sourceId: "politico-callnyc-2016-03-14",
    relation: "supports",
    supports: "Search/share optimization and expanded contact options after prospective-user conversations.",
    doesNotSupport: "Broad adoption, satisfaction, or improved case-resolution outcomes."
  },
  {
    id: "evidence-callnyc-limits-politico",
    claimId: "callnyc-data-limitations",
    sourceId: "politico-callnyc-2016-03-14",
    relation: "supports",
    supports: "The documented limitations and interpretive cautions surrounding CouncilStat totals.",
    doesNotSupport: "Simple rankings of office quality, effectiveness, specialization, or resident need."
  },
  {
    id: "evidence-callnyc-archive-repository",
    claimId: "callnyc-archived-unofficial-status",
    sourceId: "callnyc-source-repository",
    relation: "supports",
    supports: "The surviving independent project implementation.",
    doesNotSupport: "Official Council ownership or present-day service status."
  }
];

export const evidenceRelationships = evidenceInput.map((evidence) =>
  evidenceRelationshipSchema.parse(evidence)
);
