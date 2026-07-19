import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

export const checkerVersion = "composite-evals-M-v1";

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function gitFiles(repoRoot) {
  return execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
    { cwd: repoRoot }
  )
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
    .sort();
}

function hashFiles(repoRoot, files) {
  const hash = createHash("sha256");
  for (const relativePath of files) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(readFileSync(path.join(repoRoot, relativePath)));
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function candidateContentHash(repoRoot, excludes = []) {
  const files = gitFiles(repoRoot).filter(
    (relativePath) =>
      !excludes.some((excluded) => relativePath.startsWith(excluded))
  );
  return hashFiles(repoRoot, files);
}

export function evidenceSnapshotHash(repoRoot) {
  const files = gitFiles(repoRoot).filter(
    (relativePath) =>
      relativePath.startsWith("apps/www/src/data/knowledge-bank/") ||
      relativePath === "docs/knowledge-bank/operator-intake-M.json"
  );
  return hashFiles(repoRoot, files);
}

export function rubricHashes(repoRoot, rubricPaths) {
  return Object.fromEntries(
    rubricPaths.map((relativePath) => [
      relativePath,
      sha256(readFileSync(path.join(repoRoot, relativePath)))
    ])
  );
}

export function currentCommit(repoRoot) {
  return execFileSync("git", ["rev-parse", "HEAD"], { cwd: repoRoot })
    .toString("utf8")
    .trim();
}

export function isAncestor(repoRoot, commit) {
  try {
    execFileSync("git", ["merge-base", "--is-ancestor", commit, "HEAD"], {
      cwd: repoRoot,
      stdio: "ignore"
    });
    return true;
  } catch {
    return false;
  }
}

export function semanticGuardFixture(rubricHash = "rubric-current") {
  return {
    roleEvidenceScope: "individual",
    roleClaimScope: "individual",
    humanReviewState: "pending-human-review",
    humanReviewObserved: false,
    protectedVisibility: "protected",
    protectedPublicUrl: null,
    populationEvidenceScope: "recoverable-public-timeline",
    populationClaimScope: "recoverable-public-timeline",
    engagementEvidence: "mention",
    engagementClaim: "mention",
    candidateMaturity: "promoted",
    projectionStatus: "hold",
    rightsState: "needs-review",
    visualClaimState: "candidate-rights-review",
    deliveryEvidence: "proposal",
    deliveryClaim: "proposal",
    causalEvidence: "contribution",
    causalClaim: "contribution",
    currentRubricHash: rubricHash,
    receiptRubricHash: rubricHash,
    authoringAgent: "codex-author",
    judgeIdentity: "external-human-01",
    judgeClass: "human-reviewer",
    sourceVolumeUsedAsImportance: false
  };
}

export function evaluateSemanticGuards(candidate) {
  return [
    {
      id: "MUT-001-project-evidence-as-individual-role",
      pass:
        candidate.roleEvidenceScope === candidate.roleClaimScope ||
        candidate.roleClaimScope !== "individual"
    },
    {
      id: "MUT-002-pending-human-review-as-complete",
      pass:
        candidate.humanReviewState !== "complete" ||
        candidate.humanReviewObserved === true
    },
    {
      id: "MUT-003-protected-url-exposure",
      pass:
        candidate.protectedVisibility !== "protected" ||
        candidate.protectedPublicUrl == null
    },
    {
      id: "MUT-004-recoverable-population-as-platform-complete",
      pass:
        candidate.populationEvidenceScope === candidate.populationClaimScope ||
        candidate.populationClaimScope !== "platform-complete"
    },
    {
      id: "MUT-005-mention-as-endorsement",
      pass:
        candidate.engagementEvidence === candidate.engagementClaim ||
        !["endorsement", "impact", "adoption"].includes(
          candidate.engagementClaim
        )
    },
    {
      id: "MUT-006-mature-claim-auto-projection",
      pass:
        candidate.candidateMaturity !== "promoted" ||
        candidate.projectionStatus !== "active"
    },
    {
      id: "MUT-007-rights-needed-as-cleared",
      pass:
        candidate.rightsState !== "needs-review" ||
        candidate.visualClaimState !== "rights-cleared"
    },
    {
      id: "MUT-008-proposal-as-delivery",
      pass:
        candidate.deliveryEvidence === candidate.deliveryClaim ||
        candidate.deliveryClaim !== "delivered"
    },
    {
      id: "MUT-009-sequence-as-sole-causation",
      pass:
        candidate.causalEvidence === candidate.causalClaim ||
        candidate.causalClaim !== "sole-causation"
    },
    {
      id: "MUT-010-stale-rubric-hash",
      pass: candidate.currentRubricHash === candidate.receiptRubricHash
    },
    {
      id: "MUT-011-authoring-agent-as-independent",
      pass:
        candidate.judgeClass !== "independent" &&
        candidate.judgeIdentity !== candidate.authoringAgent
    },
    {
      id: "MUT-012-source-volume-as-importance",
      pass: candidate.sourceVolumeUsedAsImportance === false
    }
  ];
}
