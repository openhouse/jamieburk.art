import { researchRunSchema, type ResearchRun } from "./schema.ts";

const researchInput: ResearchRun[] = [
  {
    id: "callnyc-civic-hall-reconstruction-2026-07-11",
    projectId: "callnyc",
    conductedAt: "2026-07-11",
    purpose:
      "Recover a public-safe record of the January 30, 2016 Civic Hall gathering without turning absence or partial preservation into certainty.",
    method:
      "Reviewed 4,630 Wayback captures across 1,240 URLs, grouped 296 event keys, and classified recovered event-page responses and redirects before corroborating with institutional posts, independent reporting, the public repository, and protected participant evidence.",
    counts: {
      "wayback-captures": 4630,
      "urls-reviewed": 1240,
      "event-keys": 296,
      "successful-event-pages": 215,
      redirects: 74,
      "captured-404s": 7
    },
    recovered: [
      "Civic Hall and Council social posts preserved in an embedded social feed.",
      "A Council-branded promotional graphic.",
      "Independent reporting connecting Jamie, the event, the data release, and CallNYC.",
      "The surviving public CallNYC repository.",
      "A protected participant photograph documenting the Digital District breakout."
    ],
    notRecovered: [
      "A dedicated Civic Hall calendar listing or event-detail page.",
      "The complete registration form, agenda, breakout roster, participant list, facilitator list, other breakout tracks, winners, or published project roster."
    ],
    conclusion:
      "The available sources support a January 30, 2016 constituent-services and CouncilStat hackathon at Civic Hall, Jamie's participation, and an independent CallNYC follow-on after the full dataset release.",
    limitation:
      "The search result is not proof that no dedicated event page ever existed; it records what this bounded reconstruction did and did not recover."
  }
];

export const researchRuns = researchInput.map((run) => researchRunSchema.parse(run));
