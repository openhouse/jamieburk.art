import { createHash } from "node:crypto";

export const EXPECTED_DONOR_LETTERS = [..."ABCDEFGHIJKLMN"];
export const FINAL_DISPOSITIONS = new Set([
  "integrated",
  "already-present",
  "superseded",
  "held",
  "research-needed",
  "rejected-with-reason"
]);
export const EXPECTED_HUMAN_GATES = [
  "collaborator-corroboration",
  "unfamiliar-reader-validation",
  "visual-rights-and-consent",
  "market-response",
  "production-cutover",
  "jamie-exact-candidate-approval"
];

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function validateDonorInventory(inventory) {
  const failures = [];
  const donors = inventory?.donors ?? [];
  const letters = donors.map((donor) => donor.letter);

  if (inventory?.targetBranch !== "feature/knowledge-k") {
    failures.push("Donor inventory targetBranch must be feature/knowledge-k.");
  }
  if (!/^[0-9a-f]{40}$/.test(inventory?.targetStartRevision ?? "")) {
    failures.push("Donor inventory needs a full targetStartRevision SHA.");
  }
  if (donors.length !== EXPECTED_DONOR_LETTERS.length) {
    failures.push(`Donor inventory contains ${donors.length} entries; expected 14.`);
  }
  if (new Set(letters).size !== letters.length) {
    failures.push("Donor inventory contains duplicate letters.");
  }
  for (const letter of EXPECTED_DONOR_LETTERS) {
    if (!letters.includes(letter)) failures.push(`Donor ${letter} is missing.`);
  }

  for (const donor of donors) {
    if (donor.branch !== `feature/evals-${donor.letter}`) {
      failures.push(`Donor ${donor.letter} branch does not match its letter.`);
    }
    if (!Number.isInteger(donor.pr) || donor.pr < 1) {
      failures.push(`Donor ${donor.letter} needs a PR number.`);
    }
    if (!/^[0-9a-f]{40}$/.test(donor.revision ?? "")) {
      failures.push(`Donor ${donor.letter} needs a full reviewed revision SHA.`);
    }
    if (!donor.strength?.trim()) {
      failures.push(`Donor ${donor.letter} needs a distinct strength.`);
    }
    if (!FINAL_DISPOSITIONS.has(donor.disposition)) {
      failures.push(`Donor ${donor.letter} has nonfinal disposition ${donor.disposition}.`);
    }
    if (!Array.isArray(donor.integrationEvidence) || donor.integrationEvidence.length < 2) {
      failures.push(`Donor ${donor.letter} needs at least two integration evidence paths.`);
    }
    if (!Array.isArray(donor.verification) || donor.verification.length < 2) {
      failures.push(`Donor ${donor.letter} needs at least two verification references.`);
    }
  }

  return failures;
}

export function validateDonorBehaviors(behaviorRegistry, inventory, adapters = {}) {
  const failures = [];
  const behaviors = behaviorRegistry?.behaviors ?? [];
  const donors = new Map((inventory?.donors ?? []).map((donor) => [donor.letter, donor]));
  const letters = behaviors.map((behavior) => behavior.letter);

  if (behaviorRegistry?.targetStartRevision !== inventory?.targetStartRevision) {
    failures.push("Donor behavior registry must retain the inventory start revision.");
  }
  if (behaviors.length !== EXPECTED_DONOR_LETTERS.length) {
    failures.push(`Donor behavior registry contains ${behaviors.length} entries; expected 14.`);
  }
  if (new Set(letters).size !== letters.length) {
    failures.push("Donor behavior registry contains duplicate letters.");
  }

  for (const letter of EXPECTED_DONOR_LETTERS) {
    const behavior = behaviors.find((item) => item.letter === letter);
    const donor = donors.get(letter);
    if (!behavior) {
      failures.push(`Donor behavior ${letter} is missing.`);
      continue;
    }
    if (!donor || behavior.revision !== donor.revision) {
      failures.push(`Donor behavior ${letter} does not match the frozen inventory revision.`);
    }
    if (!behavior.currentBehavior?.trim()) {
      failures.push(`Donor behavior ${letter} needs a behavior-level description.`);
    }
    if (!behavior.donorArtifact?.path?.trim() || !/^[0-9a-f]{40}$/.test(behavior.donorArtifact?.blobSha1 ?? "")) {
      failures.push(`Donor behavior ${letter} needs a frozen path and blob SHA-1.`);
    } else if (adapters.resolveDonorBlob) {
      try {
        const actual = adapters.resolveDonorBlob(behavior.revision, behavior.donorArtifact.path);
        if (actual !== behavior.donorArtifact.blobSha1) {
          failures.push(`Donor behavior ${letter} frozen artifact hash does not match.`);
        }
      } catch {
        failures.push(`Donor behavior ${letter} frozen artifact cannot be resolved.`);
      }
    }

    if (!Array.isArray(behavior.currentEvidence) || behavior.currentEvidence.length < 2) {
      failures.push(`Donor behavior ${letter} needs at least two current evidence assertions.`);
      continue;
    }
    for (const evidence of behavior.currentEvidence) {
      if (!evidence.path?.trim() || !Array.isArray(evidence.includes) || evidence.includes.length < 2) {
        failures.push(`Donor behavior ${letter} has an incomplete current evidence assertion.`);
        continue;
      }
      if (adapters.readCurrentEvidence) {
        try {
          const current = adapters.readCurrentEvidence(evidence.path);
          for (const phrase of evidence.includes) {
            if (!current.includes(phrase)) {
              failures.push(`Donor behavior ${letter} current evidence ${evidence.path} is missing ${phrase}.`);
            }
          }
        } catch {
          failures.push(`Donor behavior ${letter} current evidence cannot be read: ${evidence.path}.`);
        }
      }
    }
  }
  return failures;
}

export function validateHumanStatus(status) {
  const failures = [];
  const gates = status?.gates ?? [];
  const ids = gates.map((gate) => gate.id);

  if (status?.governanceTarget !== 100 || status?.falseClosureTarget !== 0) {
    failures.push("Human status must require 100 governance and zero false closures.");
  }
  if (gates.length !== EXPECTED_HUMAN_GATES.length) {
    failures.push(`Human status contains ${gates.length} gates; expected 6.`);
  }
  if (new Set(ids).size !== ids.length) failures.push("Human status contains duplicate gates.");
  for (const id of EXPECTED_HUMAN_GATES) {
    if (!ids.includes(id)) failures.push(`Human gate ${id} is missing.`);
  }

  for (const gate of gates) {
    if (!new Set(["open", "closed"]).has(gate.status)) {
      failures.push(`${gate.id} has invalid status ${gate.status}.`);
    }
    if (!Number.isInteger(gate.evidenceCount) || gate.evidenceCount < 0) {
      failures.push(`${gate.id} needs a nonnegative evidenceCount.`);
    }
    if (!Number.isInteger(gate.minimumEvidence) || gate.minimumEvidence < 1) {
      failures.push(`${gate.id} needs a positive minimumEvidence.`);
    }
    if (!Array.isArray(gate.closureEvidence)) {
      failures.push(`${gate.id} needs a closureEvidence array.`);
    }
    if (!gate.closureDefinition?.trim()) {
      failures.push(`${gate.id} needs a closure definition.`);
    }
    if (
      gate.status === "closed" &&
      (gate.evidenceCount < gate.minimumEvidence || gate.closureEvidence.length === 0)
    ) {
      failures.push(`${gate.id} is falsely closed without qualifying evidence.`);
    }
  }

  if (!status?.boundary?.includes("may not convert")) {
    failures.push("Human status boundary must prohibit agent-created closure.");
  }
  return failures;
}
export function validateIntegrationLedger(ledger, inventory) {
  const failures = [];
  for (const donor of inventory?.donors ?? []) {
    const section = `## ${donor.letter} -`;
    if (!ledger.includes(section)) failures.push(`Ledger section ${section} is missing.`);
    if (!ledger.includes(donor.branch)) failures.push(`Ledger omits ${donor.branch}.`);
    if (!ledger.includes(donor.revision)) failures.push(`Ledger omits ${donor.letter} revision.`);
    if (!ledger.includes(`**Disposition:** \`${donor.disposition}\``)) {
      failures.push(`Ledger omits donor ${donor.letter} final disposition.`);
    }
  }
  for (const phrase of [
    "implementation provenance, not professional evidence",
    "No wholesale donor merge",
    "Rejected and held decisions"
  ]) {
    if (!ledger.includes(phrase)) failures.push(`Ledger is missing required rule: ${phrase}.`);
  }
  return failures;
}

export function validatePackageContract(packageJson) {
  const failures = [];
  const scripts = packageJson?.scripts ?? {};
  const required = [
    "eval:composite-readiness",
    "check:composite-readiness",
    "test:composite-readiness",
    "check:docker-runtime",
    "report:candidate-verification"
  ];
  for (const name of required) {
    if (!scripts[name]) failures.push(`package.json is missing ${name}.`);
  }
  for (const name of ["check:composite-readiness", "test:composite-readiness"]) {
    if (!scripts.check?.includes(`npm run ${name}`)) {
      failures.push(`Root check does not include ${name}.`);
    }
  }
  return failures;
}

export function validateWorkflow(workflow) {
  const failures = [];
  for (const phrase of [
    "pull_request:",
    "develop",
    "node-version: 26",
    "npm ci",
    "npm run check",
    "npm run preflight:staging",
    "npm run preflight:production",
    "npm run check:docker-runtime",
    "npm run report:candidate-verification",
    "fetch-depth: 0",
    "poppler-utils"
  ]) {
    if (!workflow.includes(phrase)) failures.push(`CI workflow is missing ${phrase}.`);
  }
  if (workflow.includes("upload-artifact")) {
    failures.push("CI workflow must not upload generated or protected artifacts.");
  }
  return failures;
}

export function validateRubricLock(lock, rubricText) {
  const failures = [];
  const digest = sha256(rubricText);
  if (lock?.rubricId !== "composite-readiness-v1") {
    failures.push("Rubric lock has the wrong rubricId.");
  }
  if (lock?.sha256 !== digest) failures.push("Composite rubric digest does not match its lock.");
  if (lock?.frozenAtStartRevision !== "5b0cbcd1a7f913d2281c671e46903ad997a743f5") {
    failures.push("Rubric lock must retain the pinned K starting revision.");
  }
  return failures;
}

export function validatePlanningMaps(maps, projectIds = new Set()) {
  const failures = [];
  const requirements = {
    recentCapability: ["Current signal", "Evidence posture", "Boundary", "Next proof"],
    outcomeTransfer: ["Output", "Observed use", "Outcome", "Causal boundary"],
    artisticContinuity: ["People and place", "Interface or form", "Learning and continuity"],
    releaseStatus: ["Agent-verifiable", "Human or external", "Production authority"]
  };
  for (const [name, phrases] of Object.entries(requirements)) {
    const text = maps?.[name] ?? "";
    for (const phrase of phrases) {
      if (!text.includes(phrase)) failures.push(`${name} map is missing ${phrase}.`);
    }
  }
  for (const name of ["recentCapability", "outcomeTransfer", "artisticContinuity"]) {
    const rows = (maps?.[name] ?? "")
      .split("\n")
      .filter((line) => /^\| `PRJ-[A-Z0-9-]+` \|/.test(line));
    if (rows.length === 0) failures.push(`${name} map has no lifecycle-linked rows.`);
    for (const row of rows) {
      const projectId = row.match(/^\| `(PRJ-[A-Z0-9-]+)` \|/)?.[1];
      if (projectIds.size > 0 && projectId && !projectIds.has(projectId)) {
        failures.push(`${name} map references unknown lifecycle project ${projectId}.`);
      }
    }
  }
  return failures;
}
