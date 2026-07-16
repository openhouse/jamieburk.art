#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";

import { knowledgeBank } from
  "../apps/www/src/data/knowledge-bank/records.ts";
import { proofClaims } from "../apps/www/src/data/proofs.ts";
import {
  checkRepository,
  evaluateCorpus,
  expectedCorpusSha256,
  read
} from "./check-kcspaces-facebook-posts-corpus.mjs";

const { corpus, result } = checkRepository();
const batchText = read(
  "apps/www/src/data/knowledge-bank/batches/kcspacesfund-facebook-posts-full-population-2026-07-15.ts"
);
const socialBatchText = read(
  "apps/www/src/data/knowledge-bank/batches/social-account-production-2026-07-14.ts"
);
const docsText = [
  read("docs/knowledge-bank/projects/kc-spaces-fund-facebook-posts.md"),
  read(
    "docs/knowledge-bank/runs/2026-07-15-kcspacesfund-facebook-posts-full-population.md"
  ),
  read("docs/knowledge-bank/projects/social-account-inventory.md")
]
  .join("\n")
  .replace(/\s+/g, " ");
const collectiveCreditPolicy = JSON.parse(
  read("docs/knowledge-bank/policies/collective-credit-policy.json")
);
const governedTextSurfacePaths =
  collectiveCreditPolicy.collectiveRuntimeFiles.filter(
    (relativePath) => !relativePath.endsWith(".pdf")
  );
const publicSurfaces = governedTextSurfacePaths.map(read).join("\n");

const sourceById = new Map(
  knowledgeBank.sources.map((source) => [source.id, source])
);
const taskById = new Map(
  knowledgeBank.researchTasks.map((task) => [task.id, task])
);
const assertionById = new Map(
  knowledgeBank.sourceAssertions.map((assertion) => [assertion.id, assertion])
);
const claim = knowledgeBank.claims.find(
  (item) => item.id === "CLM-KCSPACES-SOCIAL-GRANTEE-DOCUMENTATION"
);
const proof = proofClaims.find(
  (item) => item.id === "kc-spaces-fund-digital-infrastructure"
);
const inquiry = knowledgeBank.researchInquiries.find(
  (item) => item.id === "INQ-KCSPACES-FACEBOOK-POST-POPULATION-2026"
);
const intake = knowledgeBank.intake.find(
  (item) => item.id === "INT-KCSPACES-FACEBOOK-POST-FULL-POPULATION-2026"
);
const namingIntake = knowledgeBank.intake.find(
  (item) => item.id === "INT-KCSPACES-NAMING-ALIGNMENT-RECOLLECTION-2026"
);

function evaluateProjectionCandidate(
  candidateClaim,
  candidateProof,
  candidateSurfaceText
) {
  const errors = [];
  if (!candidateClaim || candidateClaim.collectiveWork !== true) {
    errors.push("KC Spaces Fund documentation claim must remain collective");
  }
  if (
    !candidateClaim?.projections.every(
      (projection) =>
        projection.key === "archive-note" &&
        projection.surfaces.every((surface) =>
          surface.startsWith("docs/knowledge-bank/")
        )
    )
  ) {
    errors.push("Facebook documentation must remain a knowledge-bank projection");
  }
  const requiredAntiClaims = [
    "Jamie selected the grantees",
    "Jamie owned or published the Facebook Page",
    "Thirty-eight is every Facebook post ever created",
    "One hundred nineteen reactions means 119 people or proves impact",
    "The Page's outgoing references prove stakeholder engagement"
  ];
  if (
    requiredAntiClaims.some(
      (antiClaim) => !candidateClaim?.antiClaims.includes(antiClaim)
    )
  ) {
    errors.push("a required Facebook boundary anti-claim is missing");
  }
  if (
    !candidateProof?.publicWording.includes(
      "behind-the-scenes digital infrastructure"
    ) ||
    !candidateProof?.detailedPublicWording?.includes(
      "public organizer credit remains with the campaign's named organizers"
    ) ||
    !candidateProof?.doNotSay.includes("Jamie organized KC Spaces Fund") ||
    !candidateProof?.doNotSay.includes("Jamie made grant decisions")
  ) {
    errors.push("public proof lost its bounded digital-infrastructure framing");
  }
  if (
    /Jamie (owned|managed|published|ran) (the )?KC Spaces Fund Facebook Page/i.test(
      candidateSurfaceText
    ) ||
    /Jamie selected (the )?KC Spaces Fund grantees/i.test(
      candidateSurfaceText
    ) ||
    /119 (unique )?people.*KC Spaces Fund/i.test(candidateSurfaceText) ||
    /108 (followers|people).*2020 reach/i.test(candidateSurfaceText)
  ) {
    errors.push("an unsupported Facebook role or traction claim entered the website");
  }
  return errors;
}

const checks = [];
function score(id, title, points, passes) {
  checks.push({ id, title, points, passes: Boolean(passes) });
}

score(
  "FB-KCSPACES-001",
  "Complete surviving-surface accounting",
  20,
  result.errors.length === 0 &&
    corpus.population.length === 38 &&
    corpus.populationReconciliation.exposedDistinctPosts === 38 &&
    corpus.populationReconciliation.recoveredPublicationDates === 38 &&
    corpus.populationReconciliation.contentStateCounts[
      "public-body-recovered"
    ] === 33 &&
    corpus.populationReconciliation.contentStateCounts[
      "embedded-source-unavailable"
    ] === 2 &&
    corpus.populationReconciliation.contentStateCounts[
      "body-not-recovered"
    ] === 3 &&
    docsText.includes("all 38 distinct records exposed") &&
    docsText.includes("not a Meta owner export") &&
    docsText.includes("Deleted, hidden, private, unpublished")
);

score(
  "FB-KCSPACES-002",
  "Mission patterns and source decomposition",
  15,
  result.missionCounts["grant-and-grantee-documentation"] === 12 &&
    result.missionCounts["application-and-eligibility-routing"] === 10 &&
    result.missionCounts["fundraising-and-mutual-aid-prints"] === 23 &&
    result.missionCounts["coalition-and-volunteer-participation"] === 6 &&
    result.missionCounts["press-and-media-circulation"] === 1 &&
    result.inventory.length === 9 &&
    result.governed.length === 7 &&
    [
      "SRC-KCSPACES-CAMPAIGN-SITE-2020",
      "SRC-KCSPACES-GOFUNDME-2020",
      "SRC-KCSPACES-ODDITIES-PRINTS-2020",
      "SRC-KCSPACES-DO816-DAILY-DOGOOD-2020",
      "SRC-KCSPACES-KCSTAR-HELP-KC-2020"
    ].every((id) => sourceById.has(id)) &&
    docsText.includes("eleven named grantee or funded-space highlights") &&
    docsText.includes("posted route establishes public circulation")
);

score(
  "FB-KCSPACES-003",
  "Stakeholder references remain distinct from engagement",
  15,
  corpus.stakeholderSummary.namedGranteeOrFundedSpaceHighlights === 11 &&
    corpus.stakeholderSummary.boundary.includes(
      "incoming engagement by key stakeholder groups remains unmeasured"
    ) &&
    taskById.get("TASK-KCSPACES-FACEBOOK-STAKEHOLDER-ENGAGEMENT")
      ?.status === "queued" &&
    claim?.boundaries.some((value) =>
      /outgoing public routing, not incoming stakeholder engagement/i.test(value)
    ) &&
    docsText.includes("outgoing references and invitations") &&
    docsText.includes("Incoming engagement by key stakeholder groups")
);

score(
  "FB-KCSPACES-004",
  "Interaction and follower values remain bounded snapshots",
  15,
  corpus.displayedInteractionSummary.rowsWithVisibleReactions === 28 &&
    corpus.displayedInteractionSummary.displayedReactions === 119 &&
    corpus.displayedInteractionSummary.maxReactionsOnOneRow === 15 &&
    corpus.currentPageSnapshot.followers === 108 &&
    claim?.antiClaims.includes(
      "One hundred nineteen reactions means 119 people or proves impact"
    ) &&
    docsText.includes("not 119 unique people") &&
    docsText.includes("not evidence of its 2020 audience size") &&
    !publicSurfaces.includes("119 people engaged with KC Spaces Fund") &&
    !publicSurfaces.includes("108 people reached in 2020")
);

score(
  "FB-KCSPACES-005",
  "Organizer credit, Page authorship, and Jamie role boundaries",
  15,
  claim?.collectiveWork === true &&
    corpus.ownershipAndCreditBoundary.historicalPagePublisherRecovered ===
      false &&
    corpus.ownershipAndCreditBoundary.jamiePagePublisherAttribution ===
      "not-supported" &&
    JSON.stringify(
      corpus.ownershipAndCreditBoundary.namedPublicOrganizers
    ) ===
      JSON.stringify([
        "Caitlin Horsmon",
        "Jordan Carr",
        "Kendell Harbin",
        "Megan Pobywajlo"
      ]) &&
    corpus.population.every(
      (record) =>
        record.authorshipDisposition ===
        "project-page-human-publisher-unresolved"
    ) &&
    assertionById.get("AST-KCSPACES-FACEBOOK-AUTHORSHIP-BOUNDARY-2026")
      ?.relationship === "bounds" &&
    assertionById.get("AST-KCSPACES-NAMING-ALIGNMENT-RESEARCH-LEAD-2026")
      ?.relationship === "raises-question" &&
    taskById.get("TASK-KCSPACES-NAMING-ALIGNMENT")?.status === "queued" &&
    docsText.includes("not the stakeholder or owner posting") &&
    docsText.includes("remains a research lead")
);

score(
  "FB-KCSPACES-006",
  "Knowledge lifecycle and selective website projection",
  15,
  intake?.status === "integrated" &&
    intake.sourceIds.length === 8 &&
    intake.claimIds.length === 1 &&
    intake.researchTaskIds.length === 4 &&
    namingIntake?.status === "decomposed" &&
    inquiry?.resultStatus === "partially-recovered" &&
    claim?.evidence.some(
      (item) =>
        item.sourceId ===
        "SRC-KCSPACES-FACEBOOK-POST-CORPUS-2026-07-15"
    ) &&
    claim.projections.every(
      (projection) =>
        projection.key === "archive-note" &&
        projection.surfaces.every((surface) =>
          surface.startsWith("docs/knowledge-bank/")
        )
    ) &&
    evaluateProjectionCandidate(claim, proof, publicSurfaces).length === 0 &&
    docsText.includes("It does not change website copy")
);

score(
  "FB-KCSPACES-007",
  "Public safety and immutable provenance",
  5,
  sourceById
    .get("SRC-KCSPACES-FACEBOOK-POST-CORPUS-2026-07-15")
    ?.canonicalUrl?.includes(
      "blob/15046d080c3ee374923cf6de25d5903f443d70a4/"
    ) &&
    sourceById.get("SRC-KCSPACES-FACEBOOK-POST-RESEARCH-2026-07-15")
      ?.visibility === "protected" &&
    corpus.publicationBoundary.rawBodiesStored === false &&
    corpus.publicationBoundary.nativePostIdsStored === false &&
    corpus.publicationBoundary.interactionIdentitiesStored === false &&
    !batchText.includes("/Users/") &&
    !batchText.includes("/Volumes/") &&
    !docsText.includes("/Users/") &&
    !docsText.includes("/Volumes/")
);

const mutationCases = [
  {
    id: "drop-record",
    mutate(candidate) {
      candidate.population.pop();
    }
  },
  {
    id: "duplicate-reconciliation-hash",
    mutate(candidate) {
      candidate.population[1].reconciliationKeySha256 =
        candidate.population[0].reconciliationKeySha256;
    }
  },
  {
    id: "erase-completeness-boundary",
    mutate(candidate) {
      candidate.populationReconciliation.boundary =
        "This is every post the Page ever created.";
    }
  },
  {
    id: "erase-unavailable-content",
    mutate(candidate) {
      candidate.population
        .filter((record) => record.contentState !== "public-body-recovered")
        .forEach((record) => {
          record.contentState = "public-body-recovered";
        });
    }
  },
  {
    id: "assign-jamie-publisher",
    mutate(candidate) {
      candidate.population[0].authorshipDisposition = "Jamie Burkart";
      candidate.ownershipAndCreditBoundary.jamiePagePublisherAttribution =
        "confirmed";
    }
  },
  {
    id: "erase-organizer-credit",
    mutate(candidate) {
      candidate.ownershipAndCreditBoundary.namedPublicOrganizers = [];
    }
  },
  {
    id: "convert-reference-to-engagement",
    mutate(candidate) {
      candidate.stakeholderSummary.boundary =
        "All named stakeholders engaged with and endorsed the campaign.";
    }
  },
  {
    id: "convert-reactions-to-people",
    mutate(candidate) {
      candidate.displayedInteractionSummary.boundary =
        "119 unique people engaged and proved the campaign's impact.";
    }
  },
  {
    id: "convert-followers-to-historical-reach",
    mutate(candidate) {
      candidate.currentPageSnapshot.boundary =
        "The campaign reached 108 people in 2020.";
    }
  },
  {
    id: "confirm-naming-memory",
    mutate(candidate) {
      candidate.ownershipAndCreditBoundary.participantBoundary =
        "Jamie definitively selected the cross-platform campaign name.";
    }
  },
  {
    id: "orphan-governed-source",
    mutate(candidate) {
      const governed = candidate.postedUrlInventory.find(
        (route) => route.preservationDisposition === "governed-source-record"
      );
      governed.sourceId = null;
    }
  },
  {
    id: "leak-raw-body",
    mutate(candidate) {
      candidate.population[0].rawPostText = "protected payload";
    }
  },
  {
    id: "leak-native-id",
    mutate(candidate) {
      candidate.population[0].postId = "123456789";
    }
  },
  {
    id: "leak-private-path",
    mutate(candidate) {
      candidate.privateLocator = "/Users/example/facebook-capture.json";
    }
  },
  {
    id: "leak-contact",
    mutate(candidate) {
      candidate.contactEmail = "private@example.com";
    }
  }
];

for (const testCase of mutationCases) {
  const candidate = structuredClone(corpus);
  testCase.mutate(candidate);
  const mutationResult = evaluateCorpus(candidate, JSON.stringify(candidate));
  assert.ok(
    mutationResult.errors.length > 0,
    `${testCase.id} must fail the corpus gate`
  );
}

const projectionMutationCases = [
  {
    id: "erase-collective-credit",
    mutate(candidateClaim) {
      candidateClaim.collectiveWork = false;
    }
  },
  {
    id: "activate-facebook-case-study",
    mutate(candidateClaim) {
      candidateClaim.projections[0].key = "case-study";
      candidateClaim.projections[0].surfaces = ["/work/technical-operations"];
    }
  },
  {
    id: "remove-page-ownership-anti-claim",
    mutate(candidateClaim) {
      candidateClaim.antiClaims = candidateClaim.antiClaims.filter(
        (value) => value !== "Jamie owned or published the Facebook Page"
      );
    }
  },
  {
    id: "convert-digital-role-to-social-management",
    mutate(_candidateClaim, candidateProof) {
      candidateProof.publicWording =
        "Jamie managed the KC Spaces Fund Facebook Page.";
    }
  },
  {
    id: "inject-social-management-into-website",
    mutate(_candidateClaim, _candidateProof, state) {
      state.surfaceText += "\nJamie managed the KC Spaces Fund Facebook Page.";
    }
  },
  {
    id: "inject-reaction-impact-into-website",
    mutate(_candidateClaim, _candidateProof, state) {
      state.surfaceText +=
        "\n119 people engaged with KC Spaces Fund, proving impact.";
    }
  }
];

for (const testCase of projectionMutationCases) {
  const candidateClaim = structuredClone(claim);
  const candidateProof = structuredClone(proof);
  const state = { surfaceText: publicSurfaces };
  testCase.mutate(candidateClaim, candidateProof, state);
  assert.ok(
    evaluateProjectionCandidate(
      candidateClaim,
      candidateProof,
      state.surfaceText
    ).length > 0,
    `${testCase.id} must fail the projection gate`
  );
}

const earned = checks
  .filter((check) => check.passes)
  .reduce((sum, check) => sum + check.points, 0);
const possible = checks.reduce((sum, check) => sum + check.points, 0);
assert.equal(possible, 100);
assert.equal(earned, 100, JSON.stringify(checks, null, 2));

const candidateFingerprint = createHash("sha256")
  .update(
    [
      expectedCorpusSha256,
      claim?.internalClaim ?? "",
      proof?.publicWording ?? "",
      batchText,
      socialBatchText,
      docsText
    ].join("\n")
  )
  .digest("hex");

console.log(
  JSON.stringify(
    {
      suite: "kcspacesfund-facebook-posts-full-population",
      status: "criteria_met",
      score: earned,
      possible,
      candidateFingerprint,
      checks,
      mutationTests: [...mutationCases, ...projectionMutationCases].map(
        (item) => ({ id: item.id, rejected: true })
      )
    },
    null,
    2
  )
);

