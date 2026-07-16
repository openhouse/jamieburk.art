import type { IntakeRecord, SourceRecord } from "./schema.ts";

const intakeRecords = [
  {
    id: "INTAKE-2026-07-16-KC-STAR-RAFT-EXPEDITION",
    receivedAt: "2026-07-16",
    kind: "artifact",
    project: "waterways-participatory-practice",
    publicSummary:
      "A privately held scan of contemporaneous Kansas City Star coverage supplies public-safe source metadata and detailed corroboration for the 2007 collaborative raft expedition.",
    privacy: "public-safe-summary",
    status: "claim-linked",
    sourceIds: ["SRC-KC-STAR-RAFT-EXPEDITION-2007-11-15"],
    claimIds: [
      "CLM-WATERWAYS-RAFT-EXPEDITION",
      "CLM-WATERWAYS-RAFT-PARTICIPATORY-METHOD"
    ],
    researchInquiryIds: ["INQ-WATERWAYS-FULL-ROUTE-AND-ROLES"],
    projectionIntent: "bank-only",
    nextActions: [
      "Seek a stable licensed or publisher-controlled public URL before rendering the article as a website citation.",
      "Preserve Libby Hendon and Laura Mattingly as named crew members whenever the voyage is described in detail.",
      "Do not publish the supplied newspaper scan or its photographs without separate copyright, rights, and participant review."
    ],
    protectedLocatorId: "LOC-KC-STAR-RAFT-EXPEDITION-2007-11-15",
    reviewedAt: "2026-07-16",
    reviewedBy: ["Jamie Burkart", "Codex archival review"]
  }
] satisfies IntakeRecord[];

const sources = [
  {
    id: "SRC-KC-STAR-RAFT-EXPEDITION-2007-11-15",
    title: "In the name of art, go with the flow",
    organization: "The Kansas City Star",
    author: "Darryl Levings",
    kind: "published-article",
    visibility: "public-metadata-only",
    preservationStatus: "private",
    publishedAt: "2007-11-15",
    accessedAt: "2026-07-16",
    publicCitation:
      "Darryl Levings, 'In the name of art, go with the flow,' The Kansas City Star, November 15, 2007, pp. A1, A4. Archival scan reviewed privately; no public link stored.",
    publicNote:
      "Contemporaneous front-page reporting documents the expedition while it was underway. The supplied scan and photographs remain offline pending copyright, rights, and participant review.",
    protectedLocatorId: "LOC-KC-STAR-RAFT-EXPEDITION-2007-11-15",
    supportsGenerally: [
      "Jamie originated the idea for Release Yourself onto the Water Until it Tastes of Salt",
      "the traveling crew comprised Jamie Burkart, Libby Hendon, and Laura Mattingly",
      "the crew departed Kansas City's West Bottoms on July 21, 2007",
      "the approximately 12-by-13-foot raft was built in three weeks from discarded housing materials, civic refuse, and soda-syrup drums",
      "two bicycles linked to a paddlewheel provided propulsion when wind or current required it",
      "the crew had passed the 1,000-mile marker and traveled south of Baton Rouge by November 15, 2007",
      "Jamie described inviting people encountered along the route to join the raft",
      "Jamie framed the project as an effort to awaken cultural connection between Kansas City's West Bottoms and towns along the Mississippi Delta",
      "the crew adapted to a Coast Guard interruption, legal review, and additional safety equipment before continuing"
    ],
    doesNotEstablish: [
      "sole construction, navigation, or authorship by Jamie",
      "a complete builder, host, passenger, or support roster",
      "the exact route before or after the article's publication date",
      "arrival at the Gulf of Mexico or the exact final landing place",
      "measured community impact or institutional endorsement",
      "permission to republish the scanned article or its photographs"
    ],
    media: {
      mediaKind: "document",
      rightsStatus: "do-not-publish",
      consentStatus: "review-needed",
      publicDisplayStatus: "do-not-publish"
    }
  }
] satisfies SourceRecord[];

export const kcStarRaftBatch = {
  intakeRecords,
  sources
};
