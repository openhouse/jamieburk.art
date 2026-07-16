import type { KnowledgeLifecycle } from "./lifecycle-schema.ts";

const reviewedAt = "2026-07-16";

export const portfolioBlindSpotLifecycle = {
  researchTasks: [
    {
      id: "TASK-PORTFOLIO-COLLABORATOR-CORROBORATION",
      candidateClaimIds: [],
      question:
        "Which job-critical role and outcome claims can direct collaborators confirm, refine, or contest in a public-safe and permission-scoped form?",
      status: "open",
      priority: "urgent",
      methods: [
        "Request bounded notes from people with direct project knowledge",
        "Separate first-hand observation from interpretation and hearsay",
        "Ask what Jamie did, what became usable, what remained collective, and what may be reused",
        "Route corrections through the existing candidate and canonical-claim lifecycle"
      ],
      actions: ["corroboration", "claim-decomposition"],
      sourceIds: [],
      observationIds: [],
      findings: [
        "No qualifying collaborator confirmation has been added through this blind-spot pass."
      ],
      limitations: [
        "A request template is not testimony, and an AI archival review is not a collaborator confirmation."
      ],
      nextActions: [
        "Invite confirmations for HJE, NYC Artist Coalition, WOW List, KC Town Hall, and one recent technical collaboration",
        "Store only public-safe summaries and explicit reuse boundaries in the public repository"
      ],
      openedAt: reviewedAt
    },
    {
      id: "TASK-PORTFOLIO-CONTEMPORARY-IMPLEMENTATION",
      candidateClaimIds: [],
      question:
        "Which 2022-2026 technical, product-operations, implementation, commercial, or AI-workflow records can support current-role proof rather than professional-development or proposal-only claims?",
      status: "in-progress",
      priority: "urgent",
      methods: [
        "Inventory recent work separately from historical civic depth",
        "Require a shipped or operating artifact, Jamie's bounded action, observed use or outcome, and an application approval decision",
        "Seek independent or collaborator corroboration before promoting outcome language"
      ],
      actions: ["metadata-review", "source-close-read", "corroboration"],
      sourceIds: [],
      observationIds: [],
      findings: [
        "Current candidates include HJE operations, Claudette AR handoff, AI-evals completion, CRS operating work, and Source-Backed Team Memory design; the evidence classes and delivery states differ materially."
      ],
      limitations: [
        "A certificate, proposal, or protected handoff is not by itself evidence of a delivered client outcome."
      ],
      nextActions: [
        "Prioritize recent paid implementation records and bounded collaborator confirmation",
        "Keep design, delivery, use, and outcome as distinct states"
      ],
      openedAt: reviewedAt
    },
    {
      id: "TASK-PORTFOLIO-HUMAN-AUDIENCE-VALIDATION",
      candidateClaimIds: [],
      question:
        "Can unfamiliar hiring readers identify Jamie's target role, strongest proof, and next action without coaching?",
      status: "open",
      priority: "urgent",
      methods: [
        "Run the five-minute unfamiliar-reader protocol",
        "Record comprehension, proof recall, navigation, hesitation, and interview intent without collecting unnecessary personal data",
        "Compare at least two target reader groups"
      ],
      sourceIds: [],
      observationIds: [],
      findings: [
        "No qualifying unfamiliar-reader session has been recorded in the repository."
      ],
      limitations: [
        "LLM evaluation is a useful proxy but cannot satisfy the human-reader criterion."
      ],
      nextActions: [
        "Run five sessions across public-sector and product-operations hiring readers",
        "Repair repeated comprehension or navigation failures before changing secondary content"
      ],
      openedAt: reviewedAt
    },
    {
      id: "TASK-PORTFOLIO-VISUAL-PROOF-CLEARANCE",
      candidateClaimIds: [],
      question:
        "Which visual artifacts can show Jamie's work with factual captions, source lineage, contextual consent, and cleared display rights?",
      status: "in-progress",
      priority: "high",
      methods: [
        "Separate evidentiary value from publication rights",
        "Resolve authorship, depicted identities, consent, date, place, and project meaning",
        "Prefer redacted authored artifacts and public interface captures when participant-image consent is unresolved"
      ],
      actions: ["metadata-review"],
      sourceIds: [],
      observationIds: [],
      findings: [
        "The lifecycle contains 20 media leads, but none currently satisfies the blind-spot closure definition for approved public display."
      ],
      limitations: [
        "Possession, public availability, or evidentiary relevance does not establish display permission."
      ],
      nextActions: [
        "Clear one high-value artifact each for a private-sector, civic-technology, and community-operations project",
        "Keep protected or unresolved media out of public application surfaces"
      ],
      openedAt: reviewedAt
    },
    {
      id: "TASK-PORTFOLIO-SOURCE-MATURATION",
      candidateClaimIds: [],
      question:
        "Which sources supporting front-door claims still require explicit close reading, stronger replacement, or a visible evidence boundary?",
      status: "in-progress",
      priority: "high",
      methods: [
        "Inventory sources by public consequence rather than archive volume",
        "Prioritize homepage, resume, technical-operations, and downloadable-resume claims",
        "Record a disposition and next action for every priority source"
      ],
      actions: ["metadata-review", "source-close-read", "corroboration"],
      sourceIds: [],
      observationIds: [],
      findings: [
        "The first inventory identifies 21 sources behind front-door canonical claims; seven are explicitly close-read in the current structured record."
      ],
      limitations: [
        "An unmarked review field does not prove a source was never read, but it cannot support an auditable close-read coverage claim."
      ],
      nextActions: [
        "Close-read or replace the highest-consequence unmarked sources",
        "Recompute coverage after every front-door claim change"
      ],
      openedAt: reviewedAt
    },
    {
      id: "TASK-PORTFOLIO-OUTCOME-EVIDENCE",
      candidateClaimIds: [],
      question:
        "For each major case study, what is the output, observed use, outcome, and bounded causal contribution?",
      status: "in-progress",
      priority: "high",
      methods: [
        "Separate output, observed use, outcome, and causal contribution",
        "Preserve non-equivalence rules between publication, engagement, adoption, and impact",
        "Seek corroboration for the outcome layer without weakening collective credit"
      ],
      actions: ["claim-decomposition", "corroboration"],
      sourceIds: [],
      observationIds: [],
      findings: [
        "The initial inventory distinguishes seven major projects and identifies only two with a currently corroborated bounded outcome."
      ],
      limitations: [
        "A shipped artifact, social counter, public hearing appearance, or appropriated budget is not automatically evidence of downstream impact."
      ],
      nextActions: [
        "Prioritize outcome corroboration for HJE, WOW List, CallNYC, and recent implementation work",
        "Keep unknown outcomes explicit instead of filling them with process metrics"
      ],
      openedAt: reviewedAt
    },
    {
      id: "TASK-PORTFOLIO-AUDIENCE-COMPOSITIONS",
      candidateClaimIds: [],
      question:
        "Can the knowledge bank produce bounded application arguments for distinct audiences without changing the underlying facts or widening public approval?",
      status: "completed",
      priority: "high",
      methods: [
        "Define audience, goal, selection criteria, evidence palette, exclusions, and next action for each composition",
        "Keep application briefs internal and route-less",
        "Reuse canonical claims rather than duplicating or strengthening them"
      ],
      sourceIds: [],
      observationIds: [],
      findings: [
        "Four internal briefs now cover OTI and public-sector delivery, private-sector implementation, source-backed team memory, and civic-cultural infrastructure."
      ],
      limitations: [
        "An internal brief is not an approved resume, cover letter, website variant, or evidence that its audience will respond positively."
      ],
      nextActions: [
        "Use the relevant brief when a real opportunity is known",
        "Require exact-surface review before publishing or submitting any generated composition"
      ],
      openedAt: reviewedAt,
      completedAt: reviewedAt
    }
  ] satisfies KnowledgeLifecycle["researchTasks"],

  editorialBriefs: [
    {
      id: "BRIEF-APPLICATION-OTI-2026",
      title: "OTI and public-sector delivery application palette",
      audience: "Public-sector technical project management and implementation reviewers",
      audienceTags: ["oti", "public-sector", "technical-project-management"],
      goal:
        "Lead with requirements translation, public-data delivery, cross-stakeholder coordination, implementation records, and responsible public communication.",
      purposeTags: ["job-application", "public-sector-delivery"],
      status: "research",
      publicationIntent: "internal-brief",
      targetSurfaces: [],
      selectionCriteria: [
        "Lead with current technical project management positioning",
        "Use CallNYC for public-data product translation",
        "Use NYC Artist Coalition and KC Town Hall for bounded government-facing implementation",
        "Use AI-evals completion as professional development, not delivery impact"
      ],
      projectIds: [
        "PRJ-HARRY-J-EPSTEIN",
        "PRJ-CALLNYC",
        "PRJ-NYC-ARTIST-COALITION",
        "PRJ-KC-TOWN-HALL",
        "PRJ-AI-EVALS-PROFESSIONAL-DEVELOPMENT"
      ],
      canonicalClaimIds: [
        "CLM-HJE-REVENUE-GROWTH-CONTRIBUTION",
        "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
        "CLM-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-2017",
        "CLM-KC-TOWN-HALL-PUBLIC-RECORD-2019",
        "CLM-AI-EVALS-COMPLETION-2026"
      ],
      candidateClaimIds: [],
      exclusions: [
        "Private coalition context",
        "Sole policy causality",
        "Proposal-only work presented as delivered implementation"
      ],
      citationPosture:
        "Use official records for public-sector claims and retain self-reported qualifiers for private business outcomes.",
      chadLensQuestion:
        "Can an OTI reviewer see Jamie translating ambiguity into usable public delivery without decoding an arts archive?",
      mediaLeadIds: [],
      pageClaimExclusions: []
    },
    {
      id: "BRIEF-APPLICATION-BUSINESS-IMPLEMENTATION-2026",
      title: "Private-sector implementation application palette",
      audience: "Product operations, implementation, and technical project management hiring teams",
      audienceTags: ["private-sector", "product-operations", "implementation"],
      goal:
        "Make current business systems, implementation stewardship, technical handoffs, and reusable operating documentation lead the argument.",
      purposeTags: ["job-application", "implementation"],
      status: "research",
      publicationIntent: "internal-brief",
      targetSurfaces: [],
      selectionCriteria: [
        "Lead with HJE's long-term operational modernization",
        "Use Source-Backed Team Memory as a bounded method and offer",
        "Use Claudette AR only for the documented technical handoff",
        "Translate civic projects into delivery capabilities rather than issue identity"
      ],
      projectIds: [
        "PRJ-HARRY-J-EPSTEIN",
        "PRJ-SOURCE-BACKED-TEAM-MEMORY",
        "PRJ-CLAUDETTE-THEATRE-AR",
        "PRJ-CALLNYC"
      ],
      canonicalClaimIds: [
        "CLM-HJE-REVENUE-GROWTH-CONTRIBUTION",
        "CLM-SOURCE-BACKED-TEAM-MEMORY-SPRINT-DESIGN-2026",
        "CLM-CLAUDETTE-AR-COLLABORATION-2017",
        "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON"
      ],
      candidateClaimIds: [],
      exclusions: [
        "Private business records",
        "Unverified client delivery or adoption",
        "Creative collaboration presented as sole implementation"
      ],
      citationPosture:
        "Keep private operating evidence summarized and distinguish design, handoff, use, and outcome.",
      chadLensQuestion:
        "Can an implementation lead see Jamie shipping, stabilizing, documenting, and handing off work in an operating organization?",
      mediaLeadIds: [],
      pageClaimExclusions: []
    },
    {
      id: "BRIEF-APPLICATION-SOURCE-BACKED-TEAM-MEMORY-2026",
      title: "Source-backed team memory application palette",
      audience: "AI workflow, knowledge operations, research, and implementation collaborators",
      audienceTags: ["ai-workflow", "knowledge-operations", "implementation-research"],
      goal:
        "Show how Jamie turns approved source material into inspectable operating memory, decisions, prototypes, and human-reviewable handoffs.",
      purposeTags: ["job-application", "source-backed-team-memory"],
      status: "research",
      publicationIntent: "internal-brief",
      targetSurfaces: [],
      selectionCriteria: [
        "Lead with the bounded sprint design and human-review contract",
        "Use CRS provenance and operating-plan work as adjacent method evidence",
        "Name AI-evals completion as training",
        "Keep client delivery and adoption claims out until corroborated"
      ],
      projectIds: [
        "PRJ-SOURCE-BACKED-TEAM-MEMORY",
        "PRJ-FAIR-RENT-CRS",
        "PRJ-AI-EVALS-PROFESSIONAL-DEVELOPMENT"
      ],
      canonicalClaimIds: [
        "CLM-SOURCE-BACKED-TEAM-MEMORY-SPRINT-DESIGN-2026",
        "CLM-CRS-SHARED-PUBLIC-GOODS-OPERATING-PLAN-2026",
        "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026",
        "CLM-AI-EVALS-COMPLETION-2026"
      ],
      candidateClaimIds: [],
      exclusions: [
        "Proposal treated as completed engagement",
        "Protected source bundles",
        "AI output represented as human-approved fact"
      ],
      citationPosture:
        "Use source-positioned method claims and keep delivery, adoption, and outcomes pending until separately evidenced.",
      chadLensQuestion:
        "Can a collaborator see the smallest useful engagement, its controls, and the usable handoff it is designed to produce?",
      mediaLeadIds: [],
      pageClaimExclusions: []
    },
    {
      id: "BRIEF-APPLICATION-CIVIC-CULTURAL-2026",
      title: "Civic and cultural infrastructure application palette",
      audience: "Civic technology, cultural policy, public-interest operations, and community implementation teams",
      audienceTags: ["civic-technology", "cultural-infrastructure", "public-interest-operations"],
      goal:
        "Show Jamie's participatory systems, public identities, documentation, policy translation, and long-horizon stewardship inside collective work.",
      purposeTags: ["job-application", "civic-cultural-infrastructure"],
      status: "research",
      publicationIntent: "internal-brief",
      targetSurfaces: [],
      selectionCriteria: [
        "Lead with Jamie's bounded operating contribution",
        "Use NYC Artist Coalition for institutional translation",
        "Use WOW List for community-platform operations",
        "Use KC Town Hall for neighborhood and municipal implementation",
        "Preserve collaborators and communities as co-authors"
      ],
      projectIds: [
        "PRJ-NYC-ARTIST-COALITION",
        "PRJ-WOWLIST",
        "PRJ-KC-TOWN-HALL",
        "PRJ-SUNDAY-DINNER-196"
      ],
      canonicalClaimIds: [
        "CLM-NYCAC-PARTICIPATION-SYSTEM",
        "CLM-NYCAC-DCLA-COUNCIL-INSTITUTIONAL-BRIDGE-2017",
        "CLM-WOWLIST-HISTORICAL-SCALE",
        "CLM-KC-TOWN-HALL-PUBLIC-RECORD-2019",
        "CLM-SUNDAY-DINNER-WEEKLY-OPEN-HOSTING-2017"
      ],
      candidateClaimIds: [],
      exclusions: [
        "Sole movement or policy causality",
        "Private participant records",
        "Social engagement represented as impact"
      ],
      citationPosture:
        "Use official and independent sources for institutional claims while keeping collective credit and causal limits visible.",
      chadLensQuestion:
        "Can a public-interest reader see how Jamie turns emerging community knowledge into durable civic forms?",
      mediaLeadIds: [],
      pageClaimExclusions: []
    }
  ] satisfies KnowledgeLifecycle["editorialBriefs"]
};
