import type {
  CaptureRecord,
  ClaimRecord,
  ObservationRecord,
  ResearchInquiry,
  ResearchTask,
  SourceRecord,
} from "./schema.ts";

const projectId = "kc-town-hall";
const reviewedAt = "2026-07-15";

const packetSourceId = "SRC-KCTH-CCED-PHASE-ONE-PACKET-2019";
const roleSourceId = "SRC-KCTH-JAMIE-PHASE-ONE-CLARIFICATION-2026";
const tireLogSourceId = "SRC-KCTH-TIRE-PICKUP-CALCULATOR-2019-2022";

const completionClaimId = "CLM-KCTH-PHASE-ONE-COLD-SHELL-COMPLETION";
const contractorClaimId = "CLM-KCTH-PHASE-ONE-GENERAL-CONTRACTOR-ROLE";
const surveyClaimId = "CLM-KCTH-SURVEY-DESIGN-AND-DECISION-INPUT";
const tireClaimId = "CLM-KCTH-TIRED-OF-TIRES-DESIGN-AND-OPERATIONS";
const clevelandClaimId = "CLM-KCTH-CLEVELAND-UNIFY-DESIGN-STUDIO-SEED";

export const kcTownHallPhaseOneCaptures = [
  {
    id: "CAP-KCTH-PHASE-ONE-PACKET-2026",
    receivedAt: reviewedAt,
    submittedBy: "Jamie Burkart",
    kind: "artifact",
    summary:
      "A 2019 CCED proposal and support-letter packet documents KC Town Hall's team, neighborhood process, Phase One cold-shell scope, and planned Phase Two work.",
    status: "integrated",
    publicSafety: "protected-pointer",
    potentialProjectIds: [projectId],
    potentialClaimFamilies: [
      "Phase One completion",
      "construction coordination",
      "historic preservation",
      "resident survey",
      "listening-driven development",
    ],
    sourceIds: [packetSourceId],
    observationIds: [
      "OBS-KCTH-PACKET-FOUNDER-PROJECT-MANAGER-TEAM",
      "OBS-KCTH-PACKET-PHASE-ONE-SCOPE",
      "OBS-KCTH-PACKET-SURVEY-DECISION-INPUT",
      "OBS-KCTH-PACKET-LISTENING-SUPPORT",
    ],
    researchTaskIds: [
      "RT-KCTH-PHASE-ONE-ROLE-CORROBORATION",
      "RT-SOCIAL-KCTH-SURVEY-AND-SITE-RECOVERY",
    ],
    disposition:
      "Integrated public-safe observations and claims without publishing the packet, its contact information, financing detail, or raw resident fields.",
  },
  {
    id: "CAP-KCTH-PHASE-ONE-ROLE-CLARIFICATION-2026",
    receivedAt: reviewedAt,
    submittedBy: "Jamie Burkart",
    kind: "memory",
    summary:
      "Jamie supplied a first-hand account of his Phase One general-contractor and site-coordination role, the resident survey system, TiredOfTires operations, and Cleveland Avenue coalition design work.",
    status: "integrated",
    publicSafety: "public-safe",
    potentialProjectIds: [projectId],
    potentialClaimFamilies: [
      "general contractor role",
      "participatory site practice",
      "survey design",
      "neighborhood service operations",
      "coalition design studio",
    ],
    sourceIds: [roleSourceId, tireLogSourceId],
    observationIds: [
      "OBS-KCTH-JAMIE-PHASE-ONE-ROLE",
      "OBS-KCTH-JAMIE-NEIGHBORHOOD-PRACTICE",
      "OBS-KCTH-TIRE-OPERATING-LOG",
    ],
    researchTaskIds: [
      "RT-KCTH-PHASE-ONE-ROLE-CORROBORATION",
      "RT-SOCIAL-KCTH-TIRE-OUTCOME-CORROBORATION",
      "RT-KCTH-CLEVELAND-UNIFY-ARCHIVE-RECOVERY",
    ],
    disposition:
      "Preserved the strongest public-safe role language with attribution and explicit corroboration boundaries; family-crisis context and private records remain outside the repository.",
  },
] satisfies CaptureRecord[];

export const kcTownHallPhaseOneSources = [
  {
    id: packetSourceId,
    title: "KC Town Hall CCED proposal and support-letter packet",
    author: "KC Town Hall LLC and supporters",
    kind: "project-archive",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2019-03-25",
    publicCitation:
      "KC Town Hall LLC, 2019 CCED proposal and support-letter packet, public-safe archival review completed July 15, 2026.",
    publicNote:
      "The packet is not checked into the public repository because it includes historical contact, financing, and other context that does not need to be published.",
    protectedLocatorId: "KCTH-CCED-PHASE-ONE-PACKET-2019-001",
    supportsGenerally: [
      "Jamie Burkart and Julia Fredenburg were identified as founders and project managers",
      "the named team included architecture, historic masonry, roofing, concrete, electrical, and legal roles",
      "the packet records roof and facade work and itemizes a $189,629 Phase One cold-shell scope under a completed-2019 heading",
      "the packet reproduces the resident survey card and says the ongoing survey directly shaped the proposal",
      "support letters describe the process as listening-driven and say resident input influenced proposed retail uses",
    ],
    doesNotEstablish: [
      "that Jamie's formal title in every contract was general contractor",
      "that Jamie alone managed, performed, or authored the work",
      "that every Phase One line item was complete on the packet's March 2019 creation date",
      "that the separately proposed Phase Two was completed",
      "a survey response count or adoption of every resident suggestion",
      "current property, financing, or project status",
    ],
  },
  {
    id: roleSourceId,
    title: "Jamie Burkart public-safe KC Town Hall Phase One and neighborhood-practice clarification",
    author: "Jamie Burkart",
    kind: "firsthand-statement",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: reviewedAt,
    publicCitation:
      "Jamie Burkart, public-safe first-hand KC Town Hall Phase One and neighborhood-practice clarification, July 15, 2026.",
    publicNote:
      "The underlying conversation is not published. The knowledge bank retains only bounded professional claims and research leads.",
    protectedLocatorId: "KCTH-JAMIE-PHASE-ONE-CLARIFICATION-2026-001",
    supportsGenerally: [
      "Jamie's first-hand account that he served as general contractor and daily site coordinator for Phase One",
      "Jamie's first-hand account that he designed the 4-by-6-inch survey handbill and its backing data-collection system",
      "Jamie's first-hand account that he designed, coordinated with the City, and operated recurring TiredOfTires pickups for Oak Park Neighborhood Association",
      "Jamie's first-hand account of pro bono identity, mapping, photography, social, and print support for Cleveland Avenue Unify to Beautify",
    ],
    doesNotEstablish: [
      "independent corroboration of every role detail",
      "sole authorship, sole ownership, or sole operation of any collective program",
      "audited tire, savings, participation, or survey-response totals",
      "that Jamie originated Pastor Lee's Cleveland Avenue corridor vision",
      "that Jamie caused elected-official participation or capital funding decisions",
    ],
  },
  {
    id: tireLogSourceId,
    title: "KC Town Hall TiredOfTires operating calculator",
    author: "KC Town Hall project archive",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    capturedAt: "Reviewed July 15, 2026",
    publicCitation:
      "KC Town Hall project archive, TiredOfTires monthly operating calculator covering May 2019 through September 2022.",
    publicNote:
      "The protected worksheet preserves a multi-year monthly operating log. Exact aggregate quantity and savings figures remain held pending reconciliation with receipts, public posts, and collaborator records.",
    protectedLocatorId: "KCTH-TIRED-OF-TIRES-CALCULATOR-2019-2022-001",
    supportsGenerally: [
      "a recurring monthly operating record spanning May 2019 through September 2022",
      "dated tire-count fields and a resident-savings calculation method",
      "multi-year continuity beyond a single pickup shift",
    ],
    doesNotEstablish: [
      "independently audited aggregate quantities or savings",
      "Jamie's sole authorship or operation",
      "City receipt or disposal-center reconciliation",
      "the complete route, household, collaborator, or expansion history",
    ],
  },
] satisfies SourceRecord[];

export const kcTownHallPhaseOneObservations = [
  {
    id: "OBS-KCTH-PACKET-FOUNDER-PROJECT-MANAGER-TEAM",
    sourceId: packetSourceId,
    project: projectId,
    statement:
      "The 2019 packet identifies Jamie Burkart and Julia Fredenburg as founders and project managers and names a team covering architecture, historic masonry, roofing, concrete, electrical work, and legal support.",
    observationType: "explicit",
    locator: "Packet page 2, team and project-manager profiles.",
    confidence: "high",
    limitations: [
      "The packet does not label Jamie general contractor or define each person's complete contractual scope.",
    ],
    supportsClaimIds: [contractorClaimId],
    reviewedAt,
  },
  {
    id: "OBS-KCTH-PACKET-PHASE-ONE-SCOPE",
    sourceId: packetSourceId,
    project: projectId,
    statement:
      "The packet documents roof and facade completion, describes Phase One as a cold-shell effort, and itemizes a $189,629 scope including roof-deck repair, insulation and TPO membrane, masonry, floor framing, water connection, egress, safety, cleanup, access, and related site work under a completed-2019 heading.",
    observationType: "explicit",
    locator: "Packet pages 7 and 11-12, timeline, phase description, and Phase One cost table.",
    confidence: "high",
    limitations: [
      "The packet also says Phase One was 66 percent complete and slated for full completion in 2019; Jamie's later first-hand account supplies the year-end completion confirmation.",
      "This Phase One record does not establish completion of the separately proposed Phase Two.",
    ],
    supportsClaimIds: [completionClaimId, contractorClaimId],
    reviewedAt,
  },
  {
    id: "OBS-KCTH-PACKET-SURVEY-DECISION-INPUT",
    sourceId: packetSourceId,
    project: projectId,
    statement:
      "The packet reproduces the 4-by-6-inch resident survey card, names Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as process partners, and says the ongoing survey directly shaped the proposal.",
    observationType: "visual",
    locator: "Packet page 4, survey-card reproduction and neighborhood-process text.",
    confidence: "high",
    limitations: [
      "The packet does not publish a response count, raw response set, or complete decision log.",
      "The artifact does not independently identify its designer or data-system author.",
    ],
    supportsClaimIds: [surveyClaimId],
    reviewedAt,
  },
  {
    id: "OBS-KCTH-PACKET-LISTENING-SUPPORT",
    sourceId: packetSourceId,
    project: projectId,
    statement:
      "Support letters describe the development process as listening-driven and say neighborhood survey input influenced the proposed retail uses.",
    observationType: "attributed",
    locator:
      "Packet support letters from Council Member Scott Taylor and neighborhood supporter Julia Cole.",
    confidence: "high",
    limitations: [
      "Support letters are advocacy records, not independent evaluations of participation quality or project impact.",
    ],
    supportsClaimIds: [surveyClaimId],
    reviewedAt,
  },
  {
    id: "OBS-KCTH-JAMIE-PHASE-ONE-ROLE",
    sourceId: roleSourceId,
    project: projectId,
    statement:
      "Jamie states that he served as Phase One general contractor and daily site coordinator, hiring and coordinating restoration and construction teams from the basement through scaffolding and roof work while maintaining measured drawings and sequencing roof-membrane and restored-parapet work.",
    observationType: "attributed",
    locator: "Public-safe first-hand clarification supplied July 15, 2026.",
    confidence: "high",
    limitations: [
      "The general-contractor title and detailed division of labor remain first-hand pending contracts, permits, invoices, or collaborator confirmation.",
      "The account should always be presented with Julia Fredenburg and the named professional team rather than as solo work.",
    ],
    supportsClaimIds: [completionClaimId, contractorClaimId],
    reviewedAt,
  },
  {
    id: "OBS-KCTH-JAMIE-NEIGHBORHOOD-PRACTICE",
    sourceId: roleSourceId,
    project: projectId,
    statement:
      "Jamie states that he designed the survey handbill and data system; used daily site presence to gather neighborhood histories and ideas; designed, coordinated, and operated Oak Park's recurring TiredOfTires workflow with the City; and provided pro bono identity, mapping, photography, social, and print support for Pastor Lee's Cleveland Avenue Unify to Beautify vision through the Historic East Neighborhoods Coalition.",
    observationType: "attributed",
    locator: "Public-safe first-hand clarification supplied July 15, 2026.",
    confidence: "high",
    limitations: [
      "The survey artifact and parts of the tire workflow are independently corroborated, but the Cleveland Avenue role and every program-origin detail remain first-hand.",
      "The account does not establish sole authorship, measured participation impact, or individual causality for public funding decisions.",
    ],
    supportsClaimIds: [surveyClaimId, tireClaimId, clevelandClaimId],
    reviewedAt,
  },
  {
    id: "OBS-KCTH-TIRE-OPERATING-LOG",
    sourceId: tireLogSourceId,
    project: projectId,
    statement:
      "The protected project worksheet contains 26 monthly columns from May 2019 through September 2022, with dated tire-count fields and a resident-savings calculation row.",
    observationType: "explicit",
    locator: "Calculator header and monthly total-count and savings rows.",
    confidence: "high",
    limitations: [
      "Exact totals are not promoted because the worksheet has not been reconciled to receipts, City records, and all public posts.",
      "The worksheet does not by itself assign design, authorship, or every operating shift to Jamie.",
    ],
    supportsClaimIds: [tireClaimId],
    reviewedAt,
  },
] satisfies ObservationRecord[];

export const kcTownHallPhaseOneClaims = [
  {
    id: completionClaimId,
    project: projectId,
    claimType: "outcome",
    internalClaim:
      "KC Town Hall completed its $189,629 Phase One cold-shell restoration in 2019. The 2019 packet documents the scope and labels it completed in 2019; Jamie's first-hand account confirms completion that year. This outcome is separate from the later, uncompleted Phase Two proposal and unused City appropriation.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-KCTH-PACKET-PHASE-ONE-SCOPE",
      "OBS-KCTH-JAMIE-PHASE-ONE-ROLE",
    ],
    projections: [
      {
        key: "case-study",
        text:
          "Phase One was completed in 2019: a $189,629 cold-shell restoration spanning roof-deck repair, insulation and TPO membrane, historic masonry, floor framing, water connection, egress, safety, cleanup, access, and related site work.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/kc-town-hall"],
      },
      {
        key: "work-card",
        text:
          "Completed a $189,629 Phase One cold-shell restoration in 2019, separate from the later uncompleted Phase Two proposal.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work", "/work/kc-town-hall"],
      },
    ],
    evidence: [
      {
        sourceId: packetSourceId,
        relationship: "direct-support",
        supports: [
          "the $189,629 Phase One scope",
          "the cold-shell work categories",
          "the packet's completed-2019 labeling",
        ],
        locator: "Pages 7 and 11-12.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: roleSourceId,
        relationship: "corroborating",
        supports: ["Jamie's first-hand confirmation that Phase One was completed in 2019"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Phase One completion refers to the cold-shell scope, not a completed mixed-use buildout or permanent public opening.",
      "The packet's March 2019 narrative says Phase One was 66 percent complete and slated for completion that year; its cost table labels the phase completed in 2019, and Jamie later confirms the year-end outcome.",
      "Do not attach the later $490,539 City appropriation to Phase One; official records say that separate amount remained unused.",
      "Treat construction as collective work by Jamie, Julia Fredenburg, and the named professional and trade team.",
    ],
    antiClaims: [
      "KC Town Hall's Phase Two was completed",
      "The $490,539 City appropriation paid for Phase One",
      "Jamie alone completed the restoration",
      "The building opened as the full proposed mixed-use program",
    ],
    researchTaskIds: ["RT-KCTH-PHASE-ONE-ROLE-CORROBORATION"],
    researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ARCHIVAL-REVIEW-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
  {
    id: contractorClaimId,
    project: projectId,
    claimType: "role",
    internalClaim:
      "Jamie states that, in addition to serving as founder and project manager, he acted as general contractor and daily site coordinator for KC Town Hall Phase One, hiring and coordinating the professional and trade teams that delivered the 2019 cold-shell work.",
    epistemicState: "sourced",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-KCTH-PACKET-FOUNDER-PROJECT-MANAGER-TEAM",
      "OBS-KCTH-PACKET-PHASE-ONE-SCOPE",
      "OBS-KCTH-JAMIE-PHASE-ONE-ROLE",
    ],
    projections: [
      {
        key: "case-study",
        text:
          "Jamie states that he served as Phase One general contractor and daily site coordinator. The project packet independently identifies him as founder/project manager, names the architecture and trade team, and documents the completed cold-shell scope.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/kc-town-hall"],
      },
      {
        key: "resume-html",
        text:
          "Served as founder/project manager and, in Jamie's first-hand account, general contractor for a $189,629 historic-building cold-shell phase completed in 2019; coordinated architecture, preservation, roofing, masonry, framing, water, safety, access, and site workflows.",
        status: "hold",
        citationRequired: false,
        surfaces: ["future tailored resume"],
      },
    ],
    evidence: [
      {
        sourceId: roleSourceId,
        relationship: "direct-support",
        supports: ["the general-contractor role", "daily site coordination", "trade-team coordination"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: packetSourceId,
        relationship: "corroborating",
        supports: [
          "founder/project-manager designation",
          "named professional and trade team",
          "Phase One scope and completion record",
        ],
        locator: "Pages 2, 7, and 11-12.",
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Attribute the general-contractor title to Jamie until a contract, permit, invoice set, or collaborator statement independently confirms it.",
      "The packet's own role label is founder/project manager, not general contractor.",
      "Credit Julia Fredenburg and the named professional and trade team; do not imply that Jamie performed licensed trade work himself.",
      "Do not publish private contracts, permits, invoices, contact details, or financing records without a separate public-safety review.",
    ],
    antiClaims: [
      "The CCED packet formally titles Jamie general contractor",
      "Jamie personally performed every trade",
      "Jamie alone managed or completed Phase One",
      "Jamie's site coordination establishes Phase Two completion",
    ],
    researchTaskIds: ["RT-KCTH-PHASE-ONE-ROLE-CORROBORATION"],
    researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ARCHIVAL-REVIEW-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
  {
    id: surveyClaimId,
    project: projectId,
    claimType: "method",
    internalClaim:
      "Jamie states that he designed KC Town Hall's 4-by-6-inch resident survey handbill and backing data-collection system and used daily site presence as a listening surface. The 2019 packet reproduces the card, names neighborhood partners, says the survey directly shaped the proposal, and includes support letters describing the process as listening-driven and influential on proposed retail uses.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-KCTH-PACKET-SURVEY-DECISION-INPUT",
      "OBS-KCTH-PACKET-LISTENING-SUPPORT",
      "OBS-KCTH-JAMIE-NEIGHBORHOOD-PRACTICE",
    ],
    projections: [
      {
        key: "case-study",
        text:
          "Jamie states that he designed a 4-by-6-inch resident survey handbill and backing data-collection system. The 2019 packet reproduces the card, names Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as process partners, says resident input directly shaped the proposal, and preserves support letters describing the process as listening-driven.",
        status: "active",
        citationRequired: false,
        surfaces: ["/work/kc-town-hall"],
      },
      {
        key: "technical-operations",
        text:
          "Paired a low-friction neighborhood survey handbill with a backing data system and on-site listening practice so resident input could enter a redevelopment proposal and decision process.",
        status: "hold",
        citationRequired: false,
        surfaces: ["/work/technical-operations"],
      },
    ],
    evidence: [
      {
        sourceId: roleSourceId,
        relationship: "direct-support",
        supports: ["Jamie's design of the handbill and data system", "the daily on-site listening method"],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: packetSourceId,
        relationship: "corroborating",
        supports: [
          "the survey artifact",
          "the named neighborhood partners",
          "the statement that input shaped the proposal",
          "the listening-driven process and influence on proposed uses",
        ],
        locator: "Page 4 and support letters.",
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-KCTH-NEIGHBORHOOD-PROCESS-2018-07-02",
        relationship: "context",
        supports: ["the public resident-input invitation"],
        confidence: "high",
        renderCitation: true,
      },
    ],
    boundaries: [
      "Jamie's authorship of the handbill and data system is first-hand; the packet independently preserves the artifact and its documented use.",
      "Do not publish raw survey names, emails, phone numbers, responses, or an unsupported response count.",
      "Say that input shaped the proposal and influenced proposed uses, not that every suggestion was adopted or the final program was completed.",
      "Credit Oak Park Neighborhood Association and New Horizon Missionary Baptist Church as process partners.",
    ],
    antiClaims: [
      "Every resident response was adopted",
      "The survey has a verified public response count",
      "Jamie alone conducted the neighborhood process",
      "The survey proves measured community impact",
    ],
    researchTaskIds: ["RT-SOCIAL-KCTH-SURVEY-AND-SITE-RECOVERY"],
    researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ARCHIVAL-REVIEW-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
  {
    id: tireClaimId,
    project: projectId,
    claimType: "role",
    internalClaim:
      "Jamie states that he designed and coordinated Oak Park Neighborhood Association's recurring TiredOfTires pickup with the City and performed monthly pickup, distribution, intake, delivery, and tracking work. Public project and participant records corroborate his direct operations; a protected calculator preserves a multi-year monthly log.",
    epistemicState: "corroborated",
    publicationState: "approved",
    selectionState: "selected",
    status: "confirmed-with-boundary",
    observationIds: [
      "OBS-KCTH-JAMIE-NEIGHBORHOOD-PRACTICE",
      "OBS-KCTH-TIRE-OPERATING-LOG",
      "OBS-KCTH-TIRED-OF-TIRES-WORKFLOW",
      "OBS-KCTH-BTG-TIRE-DROPOFF",
      "OBS-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION",
      "OBS-URBANHERM-KCTH-TIRE-OPERATING-CORROBORATION",
    ],
    projections: [
      {
        key: "case-study",
        text:
          "Jamie states that he designed and coordinated Oak Park Neighborhood Association's recurring TiredOfTires pickup with the City and performed monthly field operations. Public project, participant, and environmental-collaborator records corroborate his direct pickup and drop-off work; a protected log preserves activity from May 2019 through September 2022.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"],
      },
    ],
    evidence: [
      {
        sourceId: roleSourceId,
        relationship: "direct-support",
        supports: [
          "Jamie's first-hand design and coordination role",
          "monthly pickup, delivery, outreach, and tracking work",
          "the reported expansion to Indian Mound",
        ],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-KCTH-TIRED-OF-TIRES-WORKFLOW-2021-11-06",
        relationship: "corroborating",
        supports: ["the recurring public intake and pickup workflow"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: "SRC-KCTH-BTG-TIRE-DROPOFF-2019-07-08",
        relationship: "corroborating",
        supports: ["an external collaborator's public report of a KC Town Hall tire drop-off"],
        confidence: "high",
        renderCitation: true,
      },
      {
        sourceId: "SRC-URBANHERM-JIMMY-TIRES-2022-04-01",
        relationship: "corroborating",
        supports: [
          "a participant's first-hand public account of a tire-pickup shift with Jamie",
        ],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: "SRC-URBANHERM-KCTH-TIRES-2019-06-02",
        relationship: "corroborating",
        supports: [
          "a project-account operating update naming Jamie among participants",
        ],
        confidence: "high",
        renderCitation: false,
      },
      {
        sourceId: tireLogSourceId,
        relationship: "private-support",
        supports: ["multi-year monthly operating continuity", "dated count and savings fields"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Attribute the program-design and City-coordination role to Jamie pending a collaborator or public operating record that independently assigns it.",
      "Treat TiredOfTires as Oak Park Neighborhood Association and collective neighborhood work, not a solo Jamie program.",
      "The reported Indian Mound expansion remains first-hand pending a dated public or collaborator record.",
      "Keep exact aggregate tire and savings totals held until the calculator, public posts, receipts, and City or disposal-center records reconcile.",
      "Do not publish household addresses, contact details, routes, or raw intake records.",
    ],
    antiClaims: [
      "Jamie alone operated TiredOfTires",
      "Every pickup or tire is individually attributed to Jamie",
      "The aggregate tire and savings totals are independently audited",
      "The program's health or funding impact is causally established",
    ],
    researchTaskIds: ["RT-SOCIAL-KCTH-TIRE-OUTCOME-CORROBORATION"],
    researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ARCHIVAL-REVIEW-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
  {
    id: clevelandClaimId,
    project: projectId,
    claimType: "role",
    internalClaim:
      "Jamie states that he was a co-founding member of Historic East Neighborhoods Coalition's Cleveland Avenue Unify to Beautify program and served as a pro bono design and print studio for Pastor Lee's corridor vision, producing identity, logo, photography, social media, public-meeting maps, reporting affordances, and handbill packets.",
    epistemicState: "sourced",
    publicationState: "public-safe",
    selectionState: "dormant",
    status: "use-with-care",
    observationIds: ["OBS-KCTH-JAMIE-NEIGHBORHOOD-PRACTICE"],
    projections: [
      {
        key: "archive-note",
        text:
          "Jamie describes a pro bono design-and-print role in Pastor Lee's Cleveland Avenue Unify to Beautify corridor initiative through the Historic East Neighborhoods Coalition; independent program and decision records remain to be recovered.",
        status: "active",
        citationRequired: false,
        surfaces: ["docs/knowledge-bank/projects/kc-town-hall-phase-one"],
      },
      {
        key: "case-study",
        text:
          "Co-founded Cleveland Avenue Unify to Beautify and provided identity, mapping, photography, social, reporting, and print support for corridor listening sessions.",
        status: "hold",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"],
      },
    ],
    evidence: [
      {
        sourceId: roleSourceId,
        relationship: "direct-support",
        supports: ["Jamie's first-hand role account and artifact inventory"],
        confidence: "high",
        renderCitation: false,
      },
    ],
    boundaries: [
      "Credit Pastor Lee with the corridor vision and HENC and neighborhood associations with the collective program.",
      "Do not claim that Jamie caused elected-official participation, discretionary funding, or capital-improvement decisions.",
      "The co-founding role, dates, artifact set, meeting participation, and decision trail require independent corroboration before site promotion.",
    ],
    antiClaims: [
      "Jamie originated Pastor Lee's Cleveland Avenue vision",
      "Jamie alone founded or ran the program",
      "Jamie's design work caused a specific capital allocation",
      "The connected-Drive search recovered the complete program archive",
    ],
    researchTaskIds: ["RT-KCTH-CLEVELAND-UNIFY-ARCHIVE-RECOVERY"],
    researchInquiryIds: ["INQ-KCTH-PHASE-ONE-ARCHIVAL-REVIEW-2026"],
    reviewedAt,
    reviewedBy: ["Jamie Burkart", "Codex archival review"],
  },
] satisfies ClaimRecord[];

export const kcTownHallPhaseOneResearchTasks = [
  {
    id: "RT-KCTH-PHASE-ONE-ROLE-CORROBORATION",
    project: projectId,
    question:
      "Which contracts, permits, invoices, schedules, correspondence, or collaborator statements can independently corroborate Jamie's Phase One general-contractor title and division of work?",
    priority: "high",
    status: "open",
    captureIds: [
      "CAP-KCTH-PHASE-ONE-PACKET-2026",
      "CAP-KCTH-PHASE-ONE-ROLE-CLARIFICATION-2026",
    ],
    sourceIds: [packetSourceId, roleSourceId],
    claimIds: [completionClaimId, contractorClaimId],
    successCriteria: [
      "Recover at least one dated project record or collaborator statement that explicitly assigns Jamie general-contractor or equivalent owner-builder coordination responsibility.",
      "Reconcile the packet's March 2019 66-percent status with the final 2019 completion date and Phase One closeout record.",
      "Document division of work with Julia Fredenburg and the named professional and trade team without exposing private contact or financial details.",
    ],
    nextActions: [
      "Review the Earl Brown, Jack Rees, KC Town Hall, permit, invoice, roofing, and construction correspondence archives for role-bearing records.",
      "Invite Julia Fredenburg and relevant team members to supply a bounded public-safe proof note.",
      "Locate public permit or inspection records that identify owner, contractor, scope, and closeout dates.",
    ],
    publicNote:
      "The completed Phase One scope is documented. Jamie's general-contractor title remains explicitly attributed pending an independent role-bearing record.",
    owner: "Jamie Burkart",
    reviewedAt,
  },
  {
    id: "RT-KCTH-CLEVELAND-UNIFY-ARCHIVE-RECOVERY",
    project: projectId,
    question:
      "What public-safe records can substantiate Cleveland Avenue Unify to Beautify's founding, Jamie's design role, resident-listening methods, elected-official participation, and relationship to corridor capital decisions?",
    priority: "high",
    status: "open",
    captureIds: ["CAP-KCTH-PHASE-ONE-ROLE-CLARIFICATION-2026"],
    sourceIds: [roleSourceId],
    claimIds: [clevelandClaimId],
    successCriteria: [
      "Recover a dated HENC, neighborhood-association, Pastor Lee, meeting, social, or City record naming the initiative and participants.",
      "Recover public-safe examples of the logo, corridor map, listening-session materials, reporting affordance, photography, social account, or handbill packet with authorship context.",
      "Identify any official capital-decision record and describe contribution without individual causal overclaim.",
    ],
    nextActions: [
      "Search the Historic East Neighborhoods Coalition, Oak Park, Indian Mound, Chestnut Street Resource Center, and City archives using Cleveland Avenue spelling variants.",
      "Ask Pastor Lee and neighborhood collaborators for a bounded proof note and permission-cleared artifacts.",
      "Keep the claim dormant until at least one independent program record and one role-bearing source are recovered.",
    ],
    publicNote:
      "Jamie's first-hand account is preserved as a research seed; the corridor-program role and decision lineage remain held from the public site.",
    owner: "Jamie Burkart",
    reviewedAt,
  },
] satisfies ResearchTask[];

export const kcTownHallPhaseOneInquiries = [
  {
    id: "INQ-KCTH-PHASE-ONE-ARCHIVAL-REVIEW-2026",
    project: projectId,
    question:
      "What does the 2019 CCED packet establish about Phase One, Jamie's documented role, and resident input, and which parts of Jamie's later neighborhood-practice account remain open for corroboration?",
    methods: [
      "Rendered and visually reviewed all 24 pages of the supplied packet.",
      "Compared OCR text with page images for the team, survey, timeline, scope, cost, and support-letter sections.",
      "Reviewed the protected TiredOfTires operating calculator and existing public project, participant, and collaborator social records.",
      "Ran bounded local and connected-Drive filename searches for KC Town Hall, TiredOfTires, Cleveland Avenue, Unify to Beautify, survey, and CCED materials.",
    ],
    runAt: reviewedAt,
    resultStatus: "partially-recovered",
    findings: [
      "The packet identifies Jamie and Julia Fredenburg as founders/project managers and names a multi-disciplinary project team.",
      "The packet documents the Phase One cold-shell scope, a $189,629 cost, roof and facade milestones, and completed-2019 labeling; Jamie confirms year-end completion.",
      "The packet reproduces the resident survey card and states that the survey directly shaped the proposal; support letters describe a listening-driven process and influence on proposed retail uses.",
      "Public and protected records corroborate Jamie's direct TiredOfTires operations and multi-year continuity, while program-design attribution, Indian Mound expansion, and exact totals remain open.",
      "A connected-Drive folder titled TiredOfTires was recovered, but no title-level Cleveland Avenue or Unify to Beautify program record was recovered in this bounded pass.",
    ],
    limitations: [
      "The packet contains private or unnecessary contact and financing details and is therefore represented only by public-safe metadata and observations.",
      "The packet calls Jamie founder/project manager, not general contractor; the latter remains his attributed first-hand account.",
      "Filename searches do not establish that unrecovered Cleveland Avenue materials never existed.",
      "The tire calculator has not been reconciled against every public post, receipt, collaborator record, or City record.",
    ],
    sourceIds: [packetSourceId, roleSourceId, tireLogSourceId],
    publicSummary:
      "The review recovers a completed $189,629 Phase One cold-shell scope, Jamie and Julia Fredenburg's founder/project-manager roles, a survey-to-proposal input loop, and multi-year neighborhood-service operations while keeping role-title, exact-total, and Cleveland Avenue research gaps explicit.",
    protectedLocatorId: "RESEARCH-KCTH-PHASE-ONE-2026-001",
  },
] satisfies ResearchInquiry[];
