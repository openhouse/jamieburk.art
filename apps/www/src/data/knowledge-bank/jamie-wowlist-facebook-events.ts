import type {
  CaptureRecord,
  ClaimRecord,
  ObservationRecord,
  ResearchInquiry,
  ResearchTask,
  SourceRecord,
} from "./schema.ts";

const reviewedAt = "2026-07-15";
const crossProjectId = "cross-project-event-practice";
const sundayDinnerProjectId = "196-sunday-dinner";
const wowListProjectId = "wowlist";

const fixtureSourceId = "SRC-JAMIE-WOWLIST-FACEBOOK-EVENTS-FULL-POPULATION-2026-07-15";
const researchSourceId = "SRC-JAMIE-WOWLIST-FACEBOOK-EVENTS-RESEARCH-2026-07-15";
const fireSafetySourceId = "SRC-JAMIE-FB-EVENT-FIRE-SAFETY-2019-02-24";
const sundayDinner200SourceId = "SRC-JAMIE-FB-EVENT-SUNDAY-DINNER-200-2016-06-26";
const nterchngSourceId = "SRC-JAMIE-FB-EVENT-NTERCHNG-2010-01-08";
const raftLaunchSourceId = "SRC-JAMIE-FB-EVENT-RAFT-LAUNCH-2007-07-14";
const trolleyTunnelSourceId = "SRC-JAMIE-FB-EVENT-TROLLEY-TUNNEL-2007-01-06";
const wowListSurfaceSourceId = "SRC-WOWLIST-FACEBOOK-EVENT-SURFACES-2026-07-15";

const eventPracticeClaimId = "CLM-JAMIE-RECURRING-HOSTED-EVENT-PRACTICE";
const sundayDinnerMilestoneClaimId = "CLM-196-FACEBOOK-MILESTONE-CHRONOLOGY";
const responseSnapshotClaimId = "CLM-JAMIE-FACEBOOK-EVENT-RESPONSE-SNAPSHOT";
const wowListLegacyGapClaimId = "CLM-WOWLIST-FACEBOOK-EVENT-LEGACY-GAP";

export const jamieWowListFacebookEventCaptures = [
  {
    id: "CAP-JAMIE-WOWLIST-FACEBOOK-EVENTS-2026",
    receivedAt: reviewedAt,
    submittedBy: "Jamie Burkart / Codex authenticated archival review",
    kind: "artifact",
    summary:
      "Authenticated full-population review of Jamie Burkart's personal hosted Facebook events and the current WOW List Page event surfaces, followed by a public-safe fixture and bounded claims.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: [
      crossProjectId,
      sundayDinnerProjectId,
      wowListProjectId,
      "nterchng",
      "waterways-and-participatory-art",
    ],
    potentialClaimFamilies: [
      "recurring event infrastructure",
      "participatory art and public-history programming",
      "Sunday Dinner milestones",
      "event-linked source circulation",
      "bounded Facebook response snapshots",
      "WOW List legacy event recovery",
    ],
    sourceIds: [
      fixtureSourceId,
      researchSourceId,
      fireSafetySourceId,
      sundayDinner200SourceId,
      nterchngSourceId,
      raftLaunchSourceId,
      trolleyTunnelSourceId,
      wowListSurfaceSourceId,
    ],
    observationIds: [
      "OBS-JAMIE-FB-HOSTED-EVENT-POPULATION",
      "OBS-JAMIE-FB-HOSTED-EVENT-DETAIL-RECOVERY",
      "OBS-JAMIE-FB-HOSTED-EVENT-GEOGRAPHY-AND-RANGE",
      "OBS-JAMIE-FB-HOSTED-EVENT-MISSION-PATTERN",
      "OBS-JAMIE-FB-SUNDAY-DINNER-CHRONOLOGY",
      "OBS-JAMIE-FB-SUNDAY-DINNER-WOWLIST-BRIDGE",
      "OBS-JAMIE-FB-EVENT-RESPONSE-SNAPSHOT",
      "OBS-JAMIE-FB-EVENT-LINK-INVENTORY",
      "OBS-JAMIE-FB-FIRE-SAFETY-EVENT",
      "OBS-JAMIE-FB-NTERCHNG-EVENT",
      "OBS-JAMIE-FB-RAFT-LAUNCH-EVENT",
      "OBS-JAMIE-FB-TROLLEY-TUNNEL-EVENT",
      "OBS-JAMIE-WOWLIST-FB-RESEARCH-METHOD",
      "OBS-WOWLIST-FB-CURRENT-EVENT-ZERO",
      "OBS-WOWLIST-FB-LEGACY-RECOVERY-BOUNDARY",
    ],
    researchTaskIds: [
      "RT-JAMIE-FB-EVENT-DETAIL-RECOVERY",
      "RT-JAMIE-FB-EVENT-OUTCOME-CORROBORATION",
      "RT-JAMIE-FB-EVENT-LINK-CLOSE-READ",
      "RT-WOWLIST-FB-LEGACY-EVENT-RECOVERY",
    ],
    disposition:
      "Integrated all 21 materialized personal hosted-event records, 17 recovered detail pages, four index-only gaps, six Sunday Dinner records, 16 event-linked public URLs, bounded response metadata, and a separate zero-with-legacy-gap record for WOW List. Raw descriptions and private identities remain outside the public repository.",
  },
] satisfies CaptureRecord[];

export const jamieWowListFacebookEventSources = [
  {
    id: fixtureSourceId,
    title: "Jamie Burkart and WOW List Facebook event full-population inventory",
    organization: "Jamie Burkart portfolio knowledge bank",
    author: "Codex authenticated archival review",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    capturedAt: reviewedAt,
    accessedAt: reviewedAt,
    canonicalUrl:
      "https://github.com/openhouse/jamieburk.art/blob/27f72be5157371b1073c04b8d36d2c6858903849/apps/www/src/data/knowledge-bank/fixtures/jamie-wowlist-facebook-events-full-population.json",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Public-safe full-population inventory of Jamie Burkart's personal hosted Facebook events and the current WOW List Page event surfaces, July 15, 2026.",
    publicNote:
      "The fixture publishes event IDs, normalized titles, dates, public organizational host displays, generalized locations, response totals, themes, and public links. It excludes raw descriptions, residential addresses, attendee identities, contacts, credentials, and authenticated-session state.",
    supportsGenerally: [
      "21 of 21 personal hosted-event records materialized after terminal no-growth scrolling",
      "17 recovered detail pages and four index-only records",
      "a December 2006 through February 2019 chronology across Kansas City, Santa Cruz, and New York City",
      "six explicitly titled Sunday Dinner records, including the 100th and 200th gatherings",
      "17 displayed response totals summing to 608 point-in-time platform actions",
      "16 external links across seven event descriptions",
      "zero events exposed by two current WOW List Page surfaces",
    ],
    doesNotEstablish: [
      "attendance, unique people, reach, conversion, endorsement, or impact",
      "Jamie's sole production of cohosted events",
      "authorship of every description or external source",
      "a complete owner export or deleted-event history",
      "that the current WOW List zero means no historical Facebook event existed",
    ],
  },
  {
    id: researchSourceId,
    title: "Authenticated Jamie Burkart and WOW List Facebook event research run",
    kind: "research-run",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: reviewedAt,
    publicCitation:
      "Authenticated archival-production pass over Jamie Burkart's and WOW List's Facebook hosted-event surfaces, July 15, 2026.",
    publicNote:
      "The protected capture preserves event descriptions and traversal provenance for audit while withholding residential addresses, friend and attendee identities, contacts, access details, private groups, and authenticated-session state.",
    protectedLocatorId: "PTR-JAMIE-WOWLIST-FACEBOOK-EVENTS-2026-07-15",
    supportsGenerally: [
      "repeated-scroll terminal-state method",
      "event-detail traversal and link extraction",
      "private source-body close reading used to classify event themes",
      "profile switching and two-surface WOW List reconciliation",
    ],
    doesNotEstablish: [
      "permission to publish raw descriptions or personal identities",
      "a complete Meta owner export",
      "deleted-event recovery",
      "off-platform outcomes",
    ],
  },
  {
    id: fireSafetySourceId,
    title: "Free Venue Fire Safety Course",
    organization: "Tre Mc Manus, Jamie Burkart, and Combustion Inc.",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2019-02-24",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/events/314671892724189/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Facebook event record, 'Free Venue Fire Safety Course,' February 24, 2019.",
    publicNote:
      "The event names Jamie among three public hosts, presents free safety education for people who produce, work at, or attend events, and displays 103 people responded.",
    supportsGenerally: [
      "Jamie's displayed cohost role",
      "public cultural-space safety education",
      "a displayed 103-response snapshot",
    ],
    doesNotEstablish: [
      "Jamie's sole design or delivery of the course",
      "attendance",
      "training outcomes or compliance effects",
    ],
  },
  {
    id: sundayDinner200SourceId,
    title: "200th Sunday Dinner! Special! Wow! Amazing! Interesting!",
    organization: "Sunday Dinner",
    author: "Julia Fredenburg and Jamie Burkart",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2016-06-26",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/events/551536301637994/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Facebook event record, '200th Sunday Dinner! Special! Wow! Amazing! Interesting!,' June 26, 2016.",
    publicNote:
      "The event publicly identifies Julia Fredenburg and Jamie Burkart as hosts, marks the 200th Sunday Dinner, and links to a corresponding WOW List event record. The residential address is withheld from the public fixture.",
    supportsGenerally: [
      "the June 2016 200th Sunday Dinner milestone",
      "Julia Fredenburg and Jamie Burkart's displayed cohost relation",
      "a direct link from the Facebook event to a WOW List event record",
    ],
    doesNotEstablish: [
      "the complete project population",
      "attendance",
      "Jamie's sole production of Sunday Dinner",
    ],
  },
  {
    id: nterchngSourceId,
    title: "NTER CHNG Facebook event record",
    organization: "Cocoon Gallery / First Floor Arts Incubator",
    author: "Drew Bolton, Jamie Burkart, and Garrett Fuselier",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2010-01-08",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/events/10153298280050561/",
    preferredPublicUrl: "canonical",
    publicCitation: "Facebook event record, 'NTER CHNG,' January 8, 2010.",
    publicNote:
      "The record names Drew Bolton, Jamie Burkart, and Garrett Fuselier as hosts, describes a text-message-driven participatory communication installation, and displays 177 people responded.",
    supportsGenerally: [
      "the NTER CHNG participatory communication installation",
      "Jamie's displayed cohost relation",
      "a displayed 177-response snapshot",
    ],
    doesNotEstablish: [
      "the collaborators' precise division of labor",
      "attendance",
      "later exhibition inclusion",
    ],
  },
  {
    id: raftLaunchSourceId,
    title: "Release Yourself onto the Water Until it Tastes of Salt",
    author: "Jamie Burkart",
    kind: "firsthand-statement",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2007-07-14",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/events/10153218027900549/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "Facebook event record, 'Release Yourself onto the Water Until it Tastes of Salt,' July 14, 2007.",
    publicNote:
      "The public event invitation describes a collaboratively built, bicycle-paddle-wheel raft and invites people to the Kansas City launch. Contact and location details are not reproduced in the public fixture.",
    supportsGenerally: [
      "Jamie's displayed host relation",
      "a public participatory invitation around the raft launch",
      "collaborative construction language",
    ],
    doesNotEstablish: [
      "Jamie's sole construction of the raft",
      "the expedition distance or final destination reached",
      "attendance",
    ],
  },
  {
    id: trolleyTunnelSourceId,
    title: "Pirate Trolley-In!! Facebook event record",
    author: "Jamie Burkart",
    kind: "firsthand-statement",
    visibility: "public",
    preservationStatus: "live",
    publishedAt: "2007-01-06",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/events/10155459481930035/",
    preferredPublicUrl: "canonical",
    publicCitation: "Facebook event record, 'Pirate Trolley-In!!,' January 6, 2007.",
    publicNote:
      "The event describes site-specific film screenings and discussion in Kansas City's 8th Street Trolley Tunnel and displays Jamie as host.",
    supportsGenerally: [
      "Jamie's displayed host relation",
      "site-specific public-history and media programming",
      "the 8th Street Trolley Tunnel setting",
    ],
    doesNotEstablish: [
      "attendance",
      "official permission or sponsorship",
      "the complete film program or participant list",
    ],
  },
  {
    id: wowListSurfaceSourceId,
    title: "WOW List Facebook Events surface",
    organization: "WOW List",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: reviewedAt,
    canonicalUrl: "https://www.facebook.com/wowlist/events/",
    preferredPublicUrl: "canonical",
    publicCitation:
      "WOW List Facebook Events surface, reviewed in an authenticated session on July 15, 2026.",
    publicNote:
      "The current migrated Page Events tab displays 'No events to show.' The authenticated hosted-past surface also materialized zero records while switched into WOW List.",
    supportsGenerally: [
      "zero events exposed by the current WOW List Page Events tab",
      "the need to treat legacy event recovery as unresolved",
    ],
    doesNotEstablish: [
      "that WOW List never created a Facebook event",
      "deleted-event history",
      "a complete Meta owner export",
    ],
  },
] satisfies SourceRecord[];

export const jamieWowListFacebookEventObservations = [
  {
    id: "OBS-JAMIE-WOWLIST-FB-RESEARCH-METHOD",
    sourceId: researchSourceId,
    project: crossProjectId,
    statement:
      "The authenticated review isolated hosted-past surfaces, scrolled to a repeated no-growth terminal state, opened every materialized personal event detail, reconciled two current WOW List surfaces, and restored Jamie's personal profile after review.",
    observationType: "metadata",
    locator: "Protected traversal log and capture summary",
    confidence: "high",
    limitations: [
      "The method establishes completeness only for the materialized current surfaces, not deleted events or a Meta owner export.",
      "Authenticated-session details and raw source bodies remain protected.",
    ],
    supportsClaimIds: [eventPracticeClaimId, wowListLegacyGapClaimId],
    reviewedAt,
  },
  {
    id: "OBS-JAMIE-FB-HOSTED-EVENT-POPULATION",
    sourceId: fixtureSourceId,
    project: crossProjectId,
    statement:
      "Facebook's personal hosted-past surface materialized 21 unique Jamie Burkart event records after six terminal no-growth passes.",
    observationType: "metadata",
    locator: "accounts.jamieBurkart.displayedEventCount; accounts.jamieBurkart.events",
    confidence: "high",
    limitations: [
      "The surface is not a Meta owner export and cannot recover deleted records.",
      "Hosted-index membership does not establish sole production.",
    ],
    supportsClaimIds: [eventPracticeClaimId],
    reviewedAt,
  },
  {
    id: "OBS-JAMIE-FB-HOSTED-EVENT-DETAIL-RECOVERY",
    sourceId: fixtureSourceId,
    project: crossProjectId,
    statement:
      "Seventeen event detail pages were recovered and four records remained index-only.",
    observationType: "metadata",
    locator: "accounts.jamieBurkart.detailRecoveredCount; accounts.jamieBurkart.indexOnlyCount",
    confidence: "high",
    limitations: [
      "Index-only records preserve titles and dates but not complete public organizer displays or descriptions.",
    ],
    supportsClaimIds: [eventPracticeClaimId, responseSnapshotClaimId],
    reviewedAt,
  },
  {
    id: "OBS-JAMIE-FB-HOSTED-EVENT-GEOGRAPHY-AND-RANGE",
    sourceId: fixtureSourceId,
    project: crossProjectId,
    statement:
      "The recovered chronology runs from December 2006 through February 2019 and includes events in Kansas City, Santa Cruz, and New York City.",
    observationType: "metadata",
    locator: "accounts.jamieBurkart.dateRange; accounts.jamieBurkart.events[*].cityOrRegion",
    confidence: "high",
    limitations: ["Generalized locations intentionally omit residential street addresses."],
    supportsClaimIds: [eventPracticeClaimId],
    reviewedAt,
  },
  {
    id: "OBS-JAMIE-FB-HOSTED-EVENT-MISSION-PATTERN",
    sourceId: fixtureSourceId,
    project: crossProjectId,
    statement:
      "The event record spans participatory art, waterways, public history, recurring hospitality, DIY cultural spaces, civic participation, and cultural-space safety.",
    observationType: "attributed",
    locator: "accounts.jamieBurkart.events[*].themes; crossAccountFindings[3]",
    confidence: "moderate",
    limitations: [
      "Themes are an archival classification informed by private description review, not Facebook-authored categories.",
      "The pattern does not assign Jamie sole authorship of cohosted events.",
    ],
    supportsClaimIds: [eventPracticeClaimId],
    reviewedAt,
  },
  {
    id: "OBS-JAMIE-FB-SUNDAY-DINNER-CHRONOLOGY",
    sourceId: fixtureSourceId,
    project: sundayDinnerProjectId,
    statement:
      "Six titles explicitly identify Sunday Dinner, including the 100th gathering on March 9, 2014, and the 200th on June 26, 2016.",
    observationType: "explicit",
    locator: "accounts.jamieBurkart.events[2,4,6,7,8,9]",
    confidence: "high",
    limitations: [
      "The six records are the Sunday Dinner events exposed in Jamie's current Facebook hosted archive, not the complete project population.",
    ],
    supportsClaimIds: [sundayDinnerMilestoneClaimId],
    reviewedAt,
  },
  {
    id: "OBS-JAMIE-FB-SUNDAY-DINNER-WOWLIST-BRIDGE",
    sourceId: sundayDinner200SourceId,
    project: sundayDinnerProjectId,
    statement:
      "The 200th Sunday Dinner Facebook event linked to a corresponding WOW List event record.",
    observationType: "explicit",
    locator: "Event description link to https://wowlist.org/events/22791/sunday-dinner-200",
    confidence: "high",
    limitations: [
      "The link documents cross-surface event distribution, not WOW List ownership or production of Sunday Dinner.",
    ],
    supportsClaimIds: [sundayDinnerMilestoneClaimId],
    reviewedAt,
  },
  {
    id: "OBS-JAMIE-FB-EVENT-RESPONSE-SNAPSHOT",
    sourceId: fixtureSourceId,
    project: crossProjectId,
    statement:
      "Seventeen recovered detail pages display 608 aggregate response actions; eight display at least 20 and three at least 100.",
    observationType: "metadata",
    locator: "accounts.jamieBurkart.responseSnapshot",
    confidence: "high",
    limitations: [
      "Response actions are point-in-time platform displays, not unique people, attendance, reach, conversion, endorsement, or impact.",
      "Four index-only events are excluded from the aggregate.",
    ],
    supportsClaimIds: [responseSnapshotClaimId],
    reviewedAt,
  },
  {
    id: "OBS-JAMIE-FB-EVENT-LINK-INVENTORY",
    sourceId: fixtureSourceId,
    project: crossProjectId,
    statement:
      "Seven event descriptions contain 16 public external links spanning artist pages, project sites, media, and reference sources.",
    observationType: "metadata",
    locator: "accounts.jamieBurkart.eventLinkedSources; accounts.jamieBurkart.events[*].sourceLinks",
    confidence: "high",
    limitations: [
      "A posted link does not establish authorship, endorsement, preservation, or the truth of its destination.",
    ],
    supportsClaimIds: [eventPracticeClaimId],
    reviewedAt,
  },
  {
    id: "OBS-JAMIE-FB-FIRE-SAFETY-EVENT",
    sourceId: fireSafetySourceId,
    project: crossProjectId,
    statement:
      "The 2019 Free Venue Fire Safety Course names Jamie among three hosts and frames free safety education for people who produce, work at, and attend events.",
    observationType: "explicit",
    locator: "Details; Event by; public description",
    confidence: "high",
    limitations: ["The record does not establish Jamie's sole design or delivery of the course."],
    supportsClaimIds: [eventPracticeClaimId],
    reviewedAt,
  },
  {
    id: "OBS-JAMIE-FB-NTERCHNG-EVENT",
    sourceId: nterchngSourceId,
    project: "nterchng",
    statement:
      "The 2010 NTER CHNG event names Drew Bolton, Jamie Burkart, and Garrett Fuselier as hosts and describes a text-message-driven participatory installation.",
    observationType: "explicit",
    locator: "Details; Event by; public description",
    confidence: "high",
    limitations: ["The event does not establish the collaborators' precise division of labor."],
    supportsClaimIds: [eventPracticeClaimId],
    reviewedAt,
  },
  {
    id: "OBS-JAMIE-FB-RAFT-LAUNCH-EVENT",
    sourceId: raftLaunchSourceId,
    project: "waterways-and-participatory-art",
    statement:
      "Jamie's 2007 raft-launch event invited public participation and described collaborative construction of a bicycle-paddle-wheel raft.",
    observationType: "explicit",
    locator: "Details; Event by; public description",
    confidence: "high",
    limitations: ["The event does not establish sole construction, distance traveled, or final destination."],
    supportsClaimIds: [eventPracticeClaimId],
    reviewedAt,
  },
  {
    id: "OBS-JAMIE-FB-TROLLEY-TUNNEL-EVENT",
    sourceId: trolleyTunnelSourceId,
    project: crossProjectId,
    statement:
      "Jamie's 2007 Pirate Trolley-In event describes site-specific film screenings and discussion in Kansas City's 8th Street Trolley Tunnel.",
    observationType: "explicit",
    locator: "Details; Event by; public description",
    confidence: "high",
    limitations: ["The record does not establish official permission, attendance, or the complete program."],
    supportsClaimIds: [eventPracticeClaimId],
    reviewedAt,
  },
  {
    id: "OBS-WOWLIST-FB-CURRENT-EVENT-ZERO",
    sourceId: wowListSurfaceSourceId,
    project: wowListProjectId,
    statement:
      "The current WOW List Page Events tab and authenticated hosted-past surface each materialized zero event records.",
    observationType: "explicit",
    locator: "Page Events: No events to show; Hosted Past: Events you've hosted will appear here",
    confidence: "high",
    limitations: ["The current migrated surfaces are not a legacy owner export."],
    supportsClaimIds: [wowListLegacyGapClaimId],
    reviewedAt,
  },
  {
    id: "OBS-WOWLIST-FB-LEGACY-RECOVERY-BOUNDARY",
    sourceId: fixtureSourceId,
    project: wowListProjectId,
    statement:
      "The WOW List zero is classified as complete only for the two current materialized surfaces; historical Facebook event existence remains unresolved.",
    observationType: "attributed",
    locator: "accounts.wowList.coverageState; accounts.wowList.boundary",
    confidence: "high",
    limitations: ["Deleted, hidden, or legacy Page events may not appear on the current migrated surfaces."],
    supportsClaimIds: [wowListLegacyGapClaimId],
    reviewedAt,
  },
] satisfies ObservationRecord[];

export const jamieWowListFacebookEventClaims = [
  {
    id: eventPracticeClaimId,
    project: crossProjectId,
    claimType: "method",
    internalClaim:
      "Facebook's live hosted archive preserves 21 Jamie-hosted or cohosted event records from 2006 through 2019 across Kansas City, Santa Cruz, and New York City, with 17 recovered detail pages documenting a practice spanning participatory art, public history, recurring hospitality, DIY cultural spaces, civic participation, and cultural-space safety.",
    epistemicState: "corroborated",
    publicationState: "public-safe",
    selectionState: "candidate",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-JAMIE-FB-HOSTED-EVENT-POPULATION",
      "OBS-JAMIE-FB-HOSTED-EVENT-DETAIL-RECOVERY",
      "OBS-JAMIE-FB-HOSTED-EVENT-GEOGRAPHY-AND-RANGE",
      "OBS-JAMIE-FB-HOSTED-EVENT-MISSION-PATTERN",
      "OBS-JAMIE-FB-EVENT-LINK-INVENTORY",
      "OBS-JAMIE-FB-FIRE-SAFETY-EVENT",
      "OBS-JAMIE-FB-NTERCHNG-EVENT",
      "OBS-JAMIE-FB-RAFT-LAUNCH-EVENT",
      "OBS-JAMIE-FB-TROLLEY-TUNNEL-EVENT",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "A 21-event hosted chronology from 2006 through 2019 preserves Jamie's recurring practice of turning participatory art, public history, hospitality, cultural-space work, civic participation, and safety education into concrete gatherings.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/jamie-wowlist-facebook-events.md"],
      },
      {
        key: "homepage",
        text:
          "Built recurring public occasions across participatory art, community hospitality, cultural operations, and civic practice.",
        status: "hold",
        citationRequired: true,
        surfaces: ["/"],
      },
    ],
    evidence: [
      {
        sourceId: fixtureSourceId,
        relationship: "direct-support",
        supports: ["21-event denominator", "date range", "geography", "theme pattern", "detail-recovery boundary"],
        locator: "accounts.jamieBurkart",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: fireSafetySourceId,
        relationship: "corroborating",
        supports: ["later cultural-space safety education and Jamie's displayed cohost relation"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: nterchngSourceId,
        relationship: "corroborating",
        supports: ["participatory digital installation and Jamie's displayed cohost relation"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: raftLaunchSourceId,
        relationship: "corroborating",
        supports: ["participatory waterways invitation and collaborative construction language"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: trolleyTunnelSourceId,
        relationship: "corroborating",
        supports: ["site-specific public-history programming"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Use hosted or cohosted, not sole producer, for the 21-event population.",
      "Four events remain index-only.",
      "Do not publish raw descriptions, residential addresses, attendee identities, contacts, or private group details.",
    ],
    antiClaims: [
      "Do not say Jamie solely produced all 21 events.",
      "Do not infer attendance or impact from event creation or Facebook response displays.",
      "Do not treat the current hosted archive as a complete deleted-event history.",
    ],
    researchTaskIds: [
      "RT-JAMIE-FB-EVENT-DETAIL-RECOVERY",
      "RT-JAMIE-FB-EVENT-OUTCOME-CORROBORATION",
      "RT-JAMIE-FB-EVENT-LINK-CLOSE-READ",
    ],
    researchInquiryIds: ["INQ-JAMIE-WOWLIST-FACEBOOK-EVENTS-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Codex archival production", "public-safety review"],
  },
  {
    id: sundayDinnerMilestoneClaimId,
    project: sundayDinnerProjectId,
    claimType: "scale",
    internalClaim:
      "Jamie's current Facebook hosted archive preserves six explicitly titled Sunday Dinner events, including the 100th gathering in March 2014 and the 200th in June 2016; the 200th event linked to its corresponding WOW List event record.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-JAMIE-FB-SUNDAY-DINNER-CHRONOLOGY",
      "OBS-JAMIE-FB-SUNDAY-DINNER-WOWLIST-BRIDGE",
    ],
    projections: [
      {
        key: "case-study",
        text:
          "The live hosted archive preserves six Sunday Dinner event records, including the 100th gathering in March 2014 and the 200th in June 2016. The 200th event linked directly to its WOW List record, one concrete bridge between recurring community practice and the event-distribution product.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/196-sunday-dinner"],
      },
      {
        key: "resume-html",
        text:
          "Sustained recurring event infrastructure through at least 200 Sunday Dinner gatherings.",
        status: "hold",
        citationRequired: true,
        surfaces: ["/resume"],
      },
    ],
    evidence: [
      {
        sourceId: fixtureSourceId,
        relationship: "direct-support",
        supports: ["six exposed Sunday Dinner records", "100th and 200th dates"],
        locator: "accounts.jamieBurkart.events with Sunday Dinner theme",
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: sundayDinner200SourceId,
        relationship: "direct-support",
        supports: ["200th milestone", "Julia and Jamie cohost relation", "WOW List event-record link"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "The six records are the Sunday Dinner subset in Jamie's current hosted archive, not the full project population.",
      "The 200th record is collective work by Julia Fredenburg and Jamie Burkart.",
      "Do not reproduce residential addresses or attendee identities.",
    ],
    antiClaims: [
      "Do not say six was the total number of Sunday Dinner gatherings.",
      "Do not assign sole production to Jamie.",
      "Do not treat Facebook response actions as attendance.",
    ],
    researchTaskIds: ["RT-JAMIE-FB-EVENT-OUTCOME-CORROBORATION"],
    researchInquiryIds: ["INQ-JAMIE-WOWLIST-FACEBOOK-EVENTS-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Codex archival production", "public-safety review"],
  },
  {
    id: responseSnapshotClaimId,
    project: crossProjectId,
    claimType: "scale",
    internalClaim:
      "Seventeen recovered Facebook event detail pages display 608 point-in-time response actions; eight events display at least 20 and three at least 100.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "use-with-care",
    observationIds: ["OBS-JAMIE-FB-EVENT-RESPONSE-SNAPSHOT"],
    projections: [
      {
        key: "archive-note",
        text:
          "Seventeen recovered detail pages display 608 aggregate Facebook response actions; this is a bounded platform snapshot, not attendance or impact.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/jamie-wowlist-facebook-events.md"],
      },
    ],
    evidence: [
      {
        sourceId: fixtureSourceId,
        relationship: "direct-support",
        supports: ["17 response totals", "608 aggregate actions", "threshold counts"],
        locator: "accounts.jamieBurkart.responseSnapshot",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Always call these displayed response actions.",
      "Facebook response actions are not unique people, attendance, or impact.",
      "Exclude the four index-only events from the aggregate.",
    ],
    antiClaims: [
      "Do not say 608 people attended.",
      "Do not call response actions attendance, unique people, reach, conversion, endorsement, or impact.",
      "Do not add Went and Interested labels where a detail-page response total is unavailable.",
    ],
    researchTaskIds: ["RT-JAMIE-FB-EVENT-OUTCOME-CORROBORATION"],
    researchInquiryIds: ["INQ-JAMIE-WOWLIST-FACEBOOK-EVENTS-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Codex archival production"],
  },
  {
    id: wowListLegacyGapClaimId,
    project: wowListProjectId,
    claimType: "context",
    internalClaim:
      "The current WOW List Page Events tab and authenticated hosted-past surface each materialize zero records; historical WOW List Facebook event existence remains unresolved pending a legacy owner export or stable archive.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "not-recovered",
    observationIds: [
      "OBS-WOWLIST-FB-CURRENT-EVENT-ZERO",
      "OBS-WOWLIST-FB-LEGACY-RECOVERY-BOUNDARY",
    ],
    projections: [
      {
        key: "archive-note",
        text:
          "The current migrated WOW List Page surfaces expose no hosted events; legacy Facebook event recovery remains open.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/jamie-wowlist-facebook-events.md"],
      },
    ],
    evidence: [
      {
        sourceId: wowListSurfaceSourceId,
        relationship: "direct-support",
        supports: ["current Page Events zero", "current hosted-past zero"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: fixtureSourceId,
        relationship: "supports-boundary",
        supports: ["complete-as-materialized classification", "legacy-gap boundary"],
        locator: "accounts.wowList",
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Use no events exposed by the current surfaces, not no events existed.",
      "Keep migrated Page identity and deleted-event uncertainty attached.",
    ],
    antiClaims: [
      "Do not say WOW List never created Facebook events.",
      "Do not treat the current zero as a complete historical owner export.",
    ],
    researchTaskIds: ["RT-WOWLIST-FB-LEGACY-EVENT-RECOVERY"],
    researchInquiryIds: ["INQ-JAMIE-WOWLIST-FACEBOOK-EVENTS-2026-07-15"],
    reviewedAt,
    reviewedBy: ["Codex archival production"],
  },
] satisfies ClaimRecord[];

export const jamieWowListFacebookEventResearchTasks = [
  {
    id: "RT-JAMIE-FB-EVENT-DETAIL-RECOVERY",
    project: crossProjectId,
    question:
      "Can the four index-only event records be recovered from a Meta owner export, Wayback capture, collaborator archive, or dated project material?",
    priority: "medium",
    status: "open",
    captureIds: ["CAP-JAMIE-WOWLIST-FACEBOOK-EVENTS-2026"],
    sourceIds: [fixtureSourceId, researchSourceId],
    claimIds: [eventPracticeClaimId, responseSnapshotClaimId],
    successCriteria: [
      "Recover stable organizer, description, response, and source-link fields for each of the four event IDs.",
      "Preserve unavailable or deleted states when recovery fails.",
      "Keep residential addresses and personal identities out of the public fixture.",
    ],
    nextActions: [
      "Request Jamie's Meta account export if available.",
      "Search project archives by event ID, exact title, and date.",
      "Use Wayback or collaborator records only when provenance is explicit.",
    ],
    publicNote:
      "The live index is complete as exposed; four event cards remain detail-incomplete.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
  {
    id: "RT-JAMIE-FB-EVENT-OUTCOME-CORROBORATION",
    project: crossProjectId,
    question:
      "Which hosted events have independent public evidence of attendance, participant composition, outcomes, later use, or collaborator-specific production roles?",
    priority: "high",
    status: "in-progress",
    captureIds: ["CAP-JAMIE-WOWLIST-FACEBOOK-EVENTS-2026"],
    sourceIds: [
      fixtureSourceId,
      fireSafetySourceId,
      sundayDinner200SourceId,
      nterchngSourceId,
      raftLaunchSourceId,
      trolleyTunnelSourceId,
    ],
    claimIds: [eventPracticeClaimId, sundayDinnerMilestoneClaimId, responseSnapshotClaimId],
    successCriteria: [
      "Distinguish Facebook response actions from attendance and outcomes.",
      "Recover representative collaborator confirmation or task-level artifacts for Jamie's role.",
      "Associate public press, institutional records, photographs, or project artifacts with exact event IDs and dates.",
      "Review rights, consent, and caption provenance before selecting photographs.",
    ],
    nextActions: [
      "Prioritize the fire-safety course, Sunday Dinner milestones, NTER CHNG, raft launch, and Trolley Tunnel screening.",
      "Cross-reference the existing knowledge bank and Jamie's photo archive by date and venue.",
      "Invite relevant collaborators to confirm, refine, or contest role language.",
    ],
    publicNote:
      "The event chronology and displayed host relations are established. Attendance, outcomes, and individual production detail require independent corroboration.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
  {
    id: "RT-JAMIE-FB-EVENT-LINK-CLOSE-READ",
    project: crossProjectId,
    question:
      "What additional claims and source relationships can be responsibly developed from the 16 external URLs posted across seven event descriptions?",
    priority: "medium",
    status: "in-progress",
    captureIds: ["CAP-JAMIE-WOWLIST-FACEBOOK-EVENTS-2026"],
    sourceIds: [fixtureSourceId, researchSourceId],
    claimIds: [eventPracticeClaimId],
    successCriteria: [
      "Check each destination or stable archive and classify its source role.",
      "Associate claims only after close reading; do not treat posting as endorsement or authorship.",
      "Preserve dead links as historical source pointers rather than deleting them.",
    ],
    nextActions: [
      "Prioritize the WOW List Sunday Dinner record, Sunday Dinner project site, KCDIY, and media links.",
      "Record archive URLs and dead-link states.",
      "Promote only sources that materially strengthen a defensible claim.",
    ],
    publicNote:
      "The public fixture preserves 16 event-linked URLs. Their claim affordances remain under close reading.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
  {
    id: "RT-WOWLIST-FB-LEGACY-EVENT-RECOVERY",
    project: wowListProjectId,
    question:
      "Did the legacy WOW List Facebook Page create or cohost events that are no longer exposed by the current migrated Page surfaces?",
    priority: "high",
    status: "open",
    captureIds: ["CAP-JAMIE-WOWLIST-FACEBOOK-EVENTS-2026"],
    sourceIds: [fixtureSourceId, researchSourceId, wowListSurfaceSourceId],
    claimIds: [wowListLegacyGapClaimId],
    successCriteria: [
      "Acquire a Meta Page owner export, stable archive, or historical event-ID inventory.",
      "Separate Page-hosted events from website events merely shared by WOW List.",
      "Retain zero-as-current-surface and not-recovered-as-history until the denominator is independently established.",
    ],
    nextActions: [
      "Request the available WOW List Page owner data export.",
      "Search archived Page posts and existing project archives for Facebook event IDs.",
      "Crosswalk any recovered event with WOW List's website and social-media fixtures.",
    ],
    publicNote:
      "The current Page surfaces expose zero events. Historical Page-hosted events remain unresolved rather than disproven.",
    owner: "Jamie Burkart / archival reviewer",
    reviewedAt,
  },
] satisfies ResearchTask[];

export const jamieWowListFacebookEventInquiries = [
  {
    id: "INQ-JAMIE-WOWLIST-FACEBOOK-EVENTS-2026-07-15",
    project: crossProjectId,
    question:
      "Can the complete event populations exposed by Jamie Burkart's personal hosted archive and WOW List's current Facebook surfaces be preserved as public-safe knowledge without publishing private identities or converting platform actions into attendance and impact?",
    methods: [
      "Use Jamie's authenticated Facebook session and isolate the personal Events > Your hosted events > Past surface.",
      "Scroll until six consecutive no-growth passes establish a stable 21-event terminal state.",
      "Open every materialized event detail page and retain unavailable detail states.",
      "Extract dates, normalized titles, displayed public hosts, generalized locations, response totals, and outbound links.",
      "Close-read descriptions privately to classify mission themes while excluding raw descriptions, residential addresses, attendee identities, contacts, access details, and private group data from the public repository.",
      "Switch into the WOW List Page and reconcile the Page Events tab with the authenticated hosted-past surface.",
      "Restore Jamie's personal Facebook profile after the authenticated review.",
      "Separate current-surface completeness from legacy owner-export completeness.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The personal hosted-past surface materialized 21 unique records from December 2006 through February 2019.",
      "Seventeen detail pages were recovered and four remained index-only.",
      "Six records explicitly identify Sunday Dinner, including the 100th and 200th gatherings.",
      "The 200th Sunday Dinner linked directly to a WOW List event record.",
      "Seventeen detail pages display 608 aggregate response actions; eight display at least 20 and three at least 100.",
      "Seven descriptions contain 16 public external links.",
      "The current WOW List Page Events tab and authenticated hosted-past surface each materialized zero records.",
      "The personal chronology spans participatory art, waterways, public history, recurring hospitality, DIY culture, civic participation, and cultural-space safety.",
    ],
    limitations: [
      "The surfaces are not Meta owner exports and cannot establish deleted-event history.",
      "Four personal event details were not recovered.",
      "The WOW List zero applies only to the two current migrated Page surfaces.",
      "Facebook response actions are not unique people, attendance, reach, conversion, endorsement, or impact.",
      "Hosted-index membership does not establish sole production.",
      "Raw descriptions and private identities remain protected.",
    ],
    sourceIds: [
      fixtureSourceId,
      researchSourceId,
      fireSafetySourceId,
      sundayDinner200SourceId,
      nterchngSourceId,
      raftLaunchSourceId,
      trolleyTunnelSourceId,
      wowListSurfaceSourceId,
    ],
    publicSummary:
      "The personal live hosted archive is fully reviewed as exposed: 21 records, 17 recovered details, and four index-only gaps. The current WOW List Page surfaces expose zero records, with legacy recovery explicitly left open.",
    protectedLocatorId: "PTR-JAMIE-WOWLIST-FACEBOOK-EVENTS-2026-07-15",
  },
] satisfies ResearchInquiry[];

export const jamieWowListFacebookEventReviewSummary = {
  personalHostedEvents: 21,
  personalDetailsRecovered: 17,
  personalIndexOnly: 4,
  sundayDinnerRecords: 6,
  eventLinkedUrls: 16,
  eventsWithResponseTotals: 17,
  displayedResponseActions: 608,
  wowListCurrentMaterializedEvents: 0,
  criterion:
    "The two materialized populations are fully reconciled, every personal record is represented, private details are excluded, response metrics remain bounded, and the WOW List historical gap is explicit.",
} as const;
