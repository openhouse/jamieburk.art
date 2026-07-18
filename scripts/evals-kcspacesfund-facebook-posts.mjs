#!/usr/bin/env node

import {
  checkKcSpacesFundCorpus,
  evaluateKcSpacesFundCorpus,
  evaluateKcSpacesFundManifest
} from "./check-kcspacesfund-facebook-posts-corpus.mjs";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import {
  proofClaims,
  technicalOperationsClaimProjectionRefs
} from "../apps/www/src/data/proofs.ts";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) =>
  readFileSync(path.join(repoRoot, relativePath), "utf8");
const { corpus, manifest } = checkKcSpacesFundCorpus();
const docsText = [
  read("docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md"),
  read(
    "docs/knowledge-bank/intake/2026-07-16-kcspacesfund-facebook-posts-full-population.md"
  ),
  read("docs/knowledge-bank/README.md")
].join("\n");
const normalizedDocs = docsText.replace(/\s+/g, " ");
const technicalOperationsPageText = read(
  "apps/www/src/app/work/technical-operations/page.tsx"
);
const websiteText = [
  technicalOperationsPageText,
  read("apps/www/src/data/proofs.ts")
].join("\n");
const sourceById = new Map(
  knowledgeBank.sources.map((source) => [source.id, source])
);
const claimById = new Map(
  knowledgeBank.claims.map((claim) => [claim.id, claim])
);
const inquiryById = new Map(
  knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
);
const intake = knowledgeBank.intake.find(
  (item) => item.id === "INT-KCSPACES-FACEBOOK-POSTS-2026"
);

const checks = [];
const score = (id, label, points, passes) =>
  checks.push({ id, label, points, passes: Boolean(passes) });
const includesAll = (text, values) => values.every((value) => text.includes(value));

score(
  "KC-FB-001",
  "Complete observable population and independent verification",
  20,
  corpus.records.length === 40 &&
    corpus.completeness.survivingPublicRecords === 40 &&
    corpus.independentVerification.survivingPublicRecords === 40 &&
    corpus.independentVerification.capturedScrollStates === 61 &&
    corpus.independentVerification.terminalStableChecks === 8 &&
    includesAll(normalizedDocs, [
      "100% accounting for the capture-date authenticated Page-feed population",
      "not a native Meta export",
      "61 overlapping scroll states",
      "Deleted, hidden"
    ])
);

score(
  "KC-FB-002",
  "Mission, routes, and source-article semantics",
  15,
  corpus.aggregate.fundedSpaceSpotlights === 11 &&
    corpus.aggregate.applicationRoutingRecords === 8 &&
    corpus.aggregate.fundraisingRecords === 14 &&
    Object.keys(corpus.routeDictionary).length === 8 &&
    corpus.routeDictionary["do816-daily-dogood"].retrievalState ===
      "posted-article-route" &&
    includesAll(normalizedDocs, [
      "11 funded-space spotlights",
      "one Page-posted source-article route",
      "not be described as Page-posted",
      "not a complete grant file"
    ])
);

score(
  "KC-FB-003",
  "Governed source stack",
  10,
  sourceById.get("SRC-KCSPACES-FACEBOOK-POST-CENSUS-2026")?.visibility ===
    "public" &&
    sourceById.get("SRC-KCSPACES-FACEBOOK-PROTECTED-RUN-2026")
      ?.visibility === "protected" &&
    sourceById.get("SRC-KCSPACES-JAMIE-ROLE-CLARIFICATION-2026")
      ?.visibility === "protected" &&
    sourceById.get("SRC-KCSPACES-DIGITAL-INFRASTRUCTURE-ARCHIVE-2026")
      ?.visibility === "protected" &&
    sourceById.get("SRC-KCSPACES-KANSAS-CITY-STAR-2020-04-10")?.kind ===
      "published-article" &&
    sourceById
      .get("SRC-KCSPACES-KANSAS-CITY-STAR-2020-04-10")
      ?.doesNotEstablish.includes("Facebook distribution") &&
    sourceById.get("SRC-KCSPACES-DO816-DAILY-DOGOOD-2020")
      ?.doesNotEstablish.includes("the complete article body")
);

const claimIds = [
  "CLM-KCSPACES-FACEBOOK-SURVIVING-POPULATION",
  "CLM-KCSPACES-FACEBOOK-MUTUAL-AID-ROUTING",
  "CLM-KCSPACES-CROSS-CHANNEL-DIGITAL-SUPPORT",
  "CLM-KCSPACES-FACEBOOK-INTERACTION-SIGNALS",
  "CLM-KCSPACES-INDEPENDENT-COVID-RESOURCE-RECOGNITION"
];

score(
  "KC-FB-004",
  "Knowledge lifecycle integration",
  15,
  intake?.status === "matured" &&
    intake?.claimIds.length === 5 &&
    intake?.inquiryIds.length === 3 &&
    claimIds.every((id) => claimById.has(id)) &&
    intake?.sourceIds.every((id) => sourceById.has(id)) &&
    inquiryById.get("INQ-KCSPACES-FACEBOOK-NATIVE-EXPORT")
      ?.resultStatus === "inconclusive" &&
    inquiryById.get("INQ-KCSPACES-FACEBOOK-STEWARDSHIP")
      ?.resultStatus === "partially-recovered" &&
    inquiryById.get("INQ-KCSPACES-FACEBOOK-SOURCE-PRESERVATION")
      ?.resultStatus === "partially-recovered"
);

const digitalClaim = claimById.get(
  "CLM-KCSPACES-CROSS-CHANNEL-DIGITAL-SUPPORT"
);
const interactionClaim = claimById.get(
  "CLM-KCSPACES-FACEBOOK-INTERACTION-SIGNALS"
);
const kcSpacesFundProof = proofClaims.find(
  (proof) => proof.id === "kc-spaces-fund-digital-infrastructure"
);
const kcSpacesFundProjectionReference =
  technicalOperationsClaimProjectionRefs.find(
    (reference) => reference.id === "kc-spaces-fund-operations"
  );
const approvedProjectionText =
  "For KC Spaces Fund, Jamie built campaign web infrastructure and supported an available cross-channel identity; collaborator-led channels used it to route applications, donations, and funded-space updates.";
const approvedPublicWording =
  "Supported KC Spaces Fund, a 2020 Kansas City mutual-aid campaign for grassroots arts and culture spaces, through campaign web infrastructure and an available cross-channel project identity.";
const approvedDetailedWording =
  "Jamie built and maintained the campaign's Ghost-based web stack, customized a reusable campaign theme, implemented donation, application, sign-up, and fundraising-display affordances, and supported the choice of a project name available across domain and social channels. The collaborator-led Facebook Page used that identity to route applications, donations, resources, and funded-space updates, while public organizer credit remains with the campaign's named organizers.";
const requiredAntiClaims = [
  "Jamie organized KC Spaces Fund.",
  "Jamie alone named KC Spaces Fund.",
  "Jamie managed or posted from the KC Spaces Fund Facebook Page.",
  "Jamie ran the fundraiser or made grant decisions."
];

function roleContractErrors(claim, proof) {
  const activeProjection = claim?.projections.find(
    (projection) => projection.key === "technical-operations"
  );
  const errors = [];
  if (activeProjection?.text !== approvedProjectionText) {
    errors.push("approved claim projection drift");
  }
  if (!requiredAntiClaims.every((item) => claim?.antiClaims.includes(item))) {
    errors.push("claim anti-claim drift");
  }
  if (proof?.publicWording !== approvedPublicWording) {
    errors.push("proof public wording drift");
  }
  if (proof?.detailedPublicWording !== approvedDetailedWording) {
    errors.push("proof detailed wording drift");
  }
  if (
    !proof?.canonicalClaimIds?.includes(
      "CLM-KCSPACES-CROSS-CHANNEL-DIGITAL-SUPPORT"
    ) ||
    proof?.lastReviewed !== "2026-07-16"
  ) {
    errors.push("proof lifecycle link or review-date drift");
  }
  if (
    !proof?.guardrail.includes("Page publisher") ||
    !proof?.doNotSay.includes(
      "Jamie managed or posted from the KC Spaces Fund Facebook Page"
    ) ||
    !proof?.doNotSay.includes("Jamie alone named KC Spaces Fund")
  ) {
    errors.push("proof guardrail drift");
  }
  return errors;
}

function websiteProjectionContractErrors(pageText) {
  const errors = [];
  if (
    !pageText.includes(
      'technicalProjection("kc-spaces-fund-operations")'
    )
  ) {
    errors.push("KC Spaces Fund claim resolver missing");
  }
  if (
    !pageText.includes(
      "return getClaimProjection(reference.claimId, reference.key, reference.route);"
    )
  ) {
    errors.push("canonical claim projection resolver missing");
  }
  if (
    !pageText.includes(
      '"kc-spaces-fund-digital-infrastructure",\n    kcSpacesFundOperationsProof.text'
    )
  ) {
    errors.push("KC Spaces Fund proof-row projection override missing");
  }
  if (
    !pageText.includes(
      'project: "KC Spaces Fund",\n    proof: kcSpacesFundOperationsProof.text'
    )
  ) {
    errors.push("KC Spaces Fund project proof bypasses canonical projection");
  }
  if (
    !pageText.includes(
      "technicalOperationsProjectionOverrides.get(proof.id) ??"
    )
  ) {
    errors.push("proof-row projection override is not rendered");
  }
  if (
    pageText.includes(
      "<span>{proof.shortWording ?? proof.publicWording}</span>"
    )
  ) {
    errors.push("proof row bypasses canonical projection override");
  }
  return errors;
}

score(
  "KC-FB-005",
  "Bounded role, collective credit, and selective projection",
  15,
  roleContractErrors(digitalClaim, kcSpacesFundProof).length === 0 &&
    websiteProjectionContractErrors(technicalOperationsPageText).length === 0 &&
    kcSpacesFundProjectionReference?.claimId ===
      "CLM-KCSPACES-CROSS-CHANNEL-DIGITAL-SUPPORT" &&
    kcSpacesFundProjectionReference.key === "technical-operations" &&
    kcSpacesFundProjectionReference.route === "/work/technical-operations" &&
    digitalClaim?.status === "confirmed-with-boundary" &&
    digitalClaim.projections.some(
      (projection) =>
        projection.key === "technical-operations" &&
        projection.status === "active" &&
        projection.surfaces.includes("/work/technical-operations")
    ) &&
    digitalClaim.antiClaims.includes(
      "Jamie managed or posted from the KC Spaces Fund Facebook Page."
    ) &&
    interactionClaim?.projections.every(
      (projection) =>
        projection.status === "hold" && projection.surfaces.length === 0
    ) &&
    includesAll(websiteText, [
      "Cross-channel identity and web infrastructure for KC Spaces Fund",
      "collaborator-led Facebook Page",
      "Do not frame Jamie as the Page publisher"
    ]) &&
    includesAll(normalizedDocs, [
      "not the stakeholder or owner posting on the Facebook Page",
      "Public organizer credit remains with Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo",
      "current Meta Business Suite Page assets"
    ])
);

score(
  "KC-FB-006",
  "Interaction and stakeholder boundaries",
  10,
  corpus.aggregate.recordsWithVisibleReactionSignals === 28 &&
    corpus.aggregate.visibleReactionSignalFloor === 119 &&
    corpus.aggregate.recordsWithVisibleCommentRelations === 4 &&
    corpus.aggregate.culturalSpaceAccountCommentRelations === 3 &&
    includesAll(normalizedDocs, [
      "not unique people, reach, impressions, attendance",
      "No incoming engagement by elected officials",
      "not incoming stakeholder engagement",
      "not historical audience measures"
    ])
);

score(
  "KC-FB-007",
  "Public safety and protected-capture boundary",
  5,
  corpus.privacy.omitted.includes("full post transcripts") &&
    corpus.privacy.omitted.includes("personal commenter identity") &&
    !docsText.includes("/Users/") &&
    !docsText.includes("/Volumes/") &&
    includesAll(normalizedDocs, [
      "raw authenticated capture",
      "protected outside the public repository",
      "applicant or grantee files",
      "donor data"
    ])
);

const mutations = [
  ["drop record", (candidate) => candidate.records.pop()],
  [
    "duplicate identity",
    (candidate) => {
      candidate.records[1].publicIdentity = candidate.records[0].publicIdentity;
    }
  ],
  [
    "inflate reactions",
    (candidate) => {
      candidate.records[0].visibleReactionSignals += 1;
    }
  ],
  [
    "publish raw body",
    (candidate) => {
      candidate.records[0].rawBody = "unsafe";
    }
  ],
  [
    "weaken terminal control",
    (candidate) => {
      candidate.independentVerification.survivingPublicRecords = 39;
    }
  ],
  [
    "remove route",
    (candidate) => {
      delete candidate.routeDictionary["do816-daily-dogood"];
    }
  ],
  [
    "falsify date range",
    (candidate) => {
      candidate.dateRange.earliest = "1999-01-01";
    }
  ],
  [
    "redirect exact route",
    (candidate) => {
      candidate.routeDictionary["kc-spaces-fund-site"].url =
        "https://example.com/private";
    }
  ],
  [
    "orphan record route",
    (candidate) => {
      candidate.records[0].publicDestinations = ["missing-route"];
    }
  ],
  [
    "replace spotlight identity",
    (candidate) => {
      candidate.records[0].spotlightSubject = "Jamie Burkart";
    }
  ],
  [
    "falsify aggregate",
    (candidate) => {
      candidate.aggregate.visibleReactionSignalFloor = 999;
    }
  ],
  [
    "falsify profile snapshot",
    (candidate) => {
      candidate.profileSnapshot.followers = 999999;
    }
  ],
  [
    "publish raw-text alias",
    (candidate) => {
      candidate.records[0].rawPostText = "unsafe";
    }
  ],
  [
    "publish comments array",
    (candidate) => {
      candidate.records[0].comments = [{ displayName: "Private Person" }];
    }
  ],
  [
    "publish token alias",
    (candidate) => {
      candidate.captureAccessToken = "unsafe";
    }
  ],
  [
    "publish private path",
    (candidate) => {
      candidate.protectedCapturePath = "/private/tmp/raw-social.json";
    }
  ],
  [
    "assign Jamie publisher",
    (candidate) => {
      candidate.records[0].publisher = "Jamie Burkart";
    }
  ],
  [
    "falsify independent verification date",
    (candidate) => {
      candidate.independentVerification.observedAt = "1999-01-01";
    }
  ],
  [
    "nest raw text in route",
    (candidate) => {
      candidate.routeDictionary["kc-spaces-fund-site"].rawPostText = "unsafe";
    }
  ],
  [
    "nest comments in profile",
    (candidate) => {
      candidate.profileSnapshot.comments = [{ displayName: "Private Person" }];
    }
  ],
  [
    "nest token in privacy",
    (candidate) => {
      candidate.privacy.accessToken = "unsafe";
    }
  ],
  [
    "nest Jamie publisher in profile",
    (candidate) => {
      candidate.profileSnapshot.publisher = "Jamie Burkart";
    }
  ]
];

const mutationFailures = mutations.filter(([, mutate]) => {
  const candidate = structuredClone(corpus);
  mutate(candidate);
  return evaluateKcSpacesFundCorpus(candidate, JSON.stringify(candidate))
    .length === 0;
});
const manifestMutations = [
  ["falsify account", (candidate) => (candidate.account = "@other")],
  ["falsify capture date", (candidate) => (candidate.capturedAt = "1999-01-01")],
  ["falsify corpus digest", (candidate) => (candidate.sha256 = "0".repeat(64))],
  [
    "falsify protected digest",
    (candidate) => (candidate.protectedCapture.sha256 = "0".repeat(64))
  ],
  ["remove boundary", (candidate) => delete candidate.boundary],
  ["publish protected capture", (candidate) => (candidate.protectedCapture.published = true)],
  ["add manifest token", (candidate) => (candidate.accessToken = "unsafe")],
  [
    "add protected raw path",
    (candidate) => (candidate.protectedCapture.rawPath = "/private/tmp/raw.json")
  ]
];
const manifestMutationFailures = manifestMutations.filter(([, mutate]) => {
  const candidate = structuredClone(manifest);
  mutate(candidate);
  return evaluateKcSpacesFundManifest(candidate).length === 0;
});
const roleMutations = [
  [
    "assign Page authorship in claim",
    (claim) => {
      claim.projections.find(
        (projection) => projection.key === "technical-operations"
      ).text = "Jamie published every KC Spaces Fund Facebook post.";
    },
    "claim"
  ],
  [
    "assign Page authorship in proof",
    (proof) => {
      proof.detailedPublicWording =
        "Jamie published every KC Spaces Fund Facebook post.";
    },
    "proof"
  ],
  [
    "remove canonical link",
    (proof) => {
      proof.canonicalClaimIds = proof.canonicalClaimIds.filter(
        (id) => id !== "CLM-KCSPACES-CROSS-CHANNEL-DIGITAL-SUPPORT"
      );
    },
    "proof"
  ],
  [
    "remove naming anti-claim",
    (claim) => {
      claim.antiClaims = claim.antiClaims.filter(
        (item) => item !== "Jamie alone named KC Spaces Fund."
      );
    },
    "claim"
  ],
  [
    "falsify review date",
    (proof) => {
      proof.lastReviewed = "2026-07-15";
    },
    "proof"
  ]
];
const roleMutationFailures = roleMutations.filter(([, mutate, target]) => {
  const claim = structuredClone(digitalClaim);
  const proof = structuredClone(kcSpacesFundProof);
  mutate(target === "claim" ? claim : proof);
  return roleContractErrors(claim, proof).length === 0;
});
const websiteRoleMutations = [
  [
    "remove KC Spaces Fund canonical resolver",
    (text) =>
      text.replace(
        'technicalProjection("kc-spaces-fund-operations")',
        'technicalProjection("commercial-vacancy")'
      )
  ],
  [
    "hardcode project proof",
    (text) =>
      text.replace(
        "proof: kcSpacesFundOperationsProof.text",
        'proof: "Hardcoded KC Spaces Fund wording"'
      )
  ],
  [
    "remove proof-row canonical override",
    (text) =>
      text.replace(
        "kcSpacesFundOperationsProof.text",
        '"Hardcoded KC Spaces Fund wording"'
      )
  ],
  [
    "bypass proof-row canonical override",
    (text) =>
      text.replace(
        "technicalOperationsProjectionOverrides.get(proof.id) ??",
        ""
      )
  ]
];
const websiteRoleMutationFailures = websiteRoleMutations.filter(
  ([, mutate]) =>
    websiteProjectionContractErrors(mutate(technicalOperationsPageText))
      .length === 0
);

score(
  "KC-FB-008",
  "Adversarial mutation sensitivity",
  10,
  mutationFailures.length === 0 &&
    manifestMutationFailures.length === 0 &&
    roleMutationFailures.length === 0 &&
    websiteRoleMutationFailures.length === 0
);

const possible = checks.reduce((total, check) => total + check.points, 0);
const earned = checks.reduce(
  (total, check) => total + (check.passes ? check.points : 0),
  0
);
const failures = checks.filter((check) => !check.passes);

console.log(
  `KC Spaces Fund Facebook posts eval: ${earned}/${possible} (criterion: 100/100)`
);
checks.forEach((check) =>
  console.log(
    `- ${check.id} ${check.passes ? "PASS" : "FAIL"}: ${check.label} (${check.passes ? check.points : 0}/${check.points})`
  )
);
if (mutationFailures.length) {
  console.error(
    `- Mutation escapes: ${mutationFailures.map(([name]) => name).join(", ")}`
  );
}
if (manifestMutationFailures.length) {
  console.error(
    `- Manifest mutation escapes: ${manifestMutationFailures.map(([name]) => name).join(", ")}`
  );
}
if (roleMutationFailures.length) {
  console.error(
    `- Role mutation escapes: ${roleMutationFailures.map(([name]) => name).join(", ")}`
  );
}
if (websiteRoleMutationFailures.length) {
  console.error(
    `- Website role mutation escapes: ${websiteRoleMutationFailures
      .map(([name]) => name)
      .join(", ")}`
  );
}
if (
  earned !== possible ||
  failures.length ||
  mutationFailures.length ||
  manifestMutationFailures.length ||
  roleMutationFailures.length ||
  websiteRoleMutationFailures.length
) {
  process.exit(1);
}
console.log("KC Spaces Fund Facebook posts criterion met.");
