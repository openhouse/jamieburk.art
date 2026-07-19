import type {
  IntakeRecordInput,
  ResearchInquiry
} from "./schema.ts";

export const kcTownHallStewardshipTransitionInquiries = [
  {
    id: "INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION",
    project: "kc-town-hall",
    question:
      "What public-safe handoff record or recipient confirmation can corroborate Jamie's account that he transitioned KC Town Hall project stewardship to a mission-aligned organization?",
    methods: [
      "Recorded Jamie's firsthand account as a research lead without treating it as documentary proof.",
      "Kept the stewardship transition separate from the later municipal withdrawal and reappropriation record.",
      "Queued public-safe handoff material or recipient confirmation for review before any claim promotion."
    ],
    runAt: "2026-07-14",
    resultStatus: "open",
    findings: [
      "Jamie reports that when his direct involvement concluded, he transitioned project stewardship to a mission-aligned organization."
    ],
    limitations: [
      "The current public-safe bank contains Jamie's firsthand account, not independent corroboration of the handoff.",
      "The receiving organization, date, scope, handoff mechanics, and subsequent project disposition are not established.",
      "Later municipal withdrawal records do not establish or explain the earlier stewardship transition."
    ],
    sourceIds: []
  }
] satisfies ResearchInquiry[];

export const kcTownHallStewardshipTransitionIntake = [
  {
    id: "INT-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-2026-07-14",
    receivedAt: "2026-07-14",
    kind: "public-safe-memory",
    visibility: "public-safe",
    title: "KC Town Hall stewardship transition",
    description:
      "Jamie reports that when his direct involvement concluded, he transitioned KC Town Hall project stewardship to a mission-aligned organization.",
    whyItMatters:
      "Corrects the professional lifecycle record and preserves a responsible handoff lead without conflating it with the documented later municipal withdrawal.",
    projectIds: ["kc-town-hall"],
    status: "researching",
    disposition: "inquiry-opened",
    dispositionNote:
      "Retained as a source-free firsthand research lead with no claim or public-site projection until public-safe corroboration is reviewed.",
    sourceIds: [],
    claimIds: [],
    inquiryIds: ["INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION"],
    correctionIds: [],
    boundaries: [
      "Do not infer a causal relationship between this transition and the later municipal withdrawal or reappropriation.",
      "Do not name the receiving organization or assert a date, legal assignment, ownership transfer, scope, or subsequent disposition without public-safe corroboration and approval.",
      "This research lead has no public-site projection."
    ]
  }
] satisfies IntakeRecordInput[];
