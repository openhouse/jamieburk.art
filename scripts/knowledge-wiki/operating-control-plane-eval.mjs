import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const contractPath = "evals/knowledge-wiki/operating-control-plane.json";

function read(path) {
  return readFileSync(new URL(path, `file://${root}/`), "utf8");
}

export function loadCandidate() {
  const contract = JSON.parse(read(contractPath));
  return {
    contract,
    rfc: read(contract.rfcPath),
    labCopy: read(contract.pagePath),
    method: read(contract.methodPath),
    colophon: read(contract.colophonPath)
  };
}

function includesEvery(values, required) {
  return required.every((value) => values.includes(value));
}

export function evaluateOperatingControlPlane(candidate) {
  const { contract, rfc, labCopy, method, colophon } = candidate;
  const failures = [];
  let checks = 0;
  const requireGate = (condition, message) => {
    checks += 1;
    if (!condition) failures.push(message);
  };

  requireGate(
    contract.status === "instrumented-exploration" &&
      contract.authority?.decisionOwner === "Jamie Burkart" &&
      contract.authority?.actualAdoptionObserved === false &&
      contract.authority?.humanStageChangeRequired === true &&
      /stage:\s*exploring/.test(rfc) &&
      /does not authorize implementation or adoption/i.test(rfc),
    "the control plane must remain an exploring instrument with Jamie as the human decision owner"
  );

  requireGate(
    contract.sourceCoverage?.registryRequired === true &&
      contract.sourceCoverage?.accessIsConsent === false &&
      contract.sourceCoverage?.evidenceIsPublicationPermission === false &&
      contract.sourceCoverage?.unresolvedRights === "fail-closed" &&
      /source-of-sources|source coverage registry/i.test(rfc + method),
    "source coverage must keep access, consent, and publication authority separate and fail closed"
  );

  requireGate(
    includesEvery(contract.operatingStates ?? [], [
      "proposal",
      "invitation",
      "attendance",
      "contribution",
      "commitment",
      "authority",
      "adoption",
      "outcome",
      "correction"
    ]),
    "operating states must distinguish participation, commitment, authority, adoption, outcome, and correction"
  );

  requireGate(
    includesEvery(contract.healthBands ?? [], ["candidate", "situational", "strategic"]) &&
      contract.health?.perishable === true &&
      (contract.health?.invalidationTriggers?.length ?? 0) >= 4,
    "candidate, situational, and strategic health must be perishable and invalidatable"
  );

  requireGate(
    contract.modelReview?.allowedVerdicts?.includes("ABSTAIN_INSUFFICIENT_EVIDENCE") &&
      contract.modelReview?.insufficientEvidence === "abstain" &&
      contract.modelReview?.actualPeopleParticipated === false &&
      contract.modelReview?.grantsAuthority === false,
    "model review must support ABSTAIN_INSUFFICIENT_EVIDENCE and confer no participation or authority"
  );

  const expectedOrder = [
    "deterministic-eligibility",
    "mutation-resistance",
    "fictionalized-model-review",
    "human-decision"
  ];
  requireGate(
    Array.isArray(contract.evaluationOrder) &&
      contract.evaluationOrder.length === expectedOrder.length &&
      expectedOrder.every((stage, index) => contract.evaluationOrder[index] === stage),
    "evaluation must run deterministic eligibility, mutation resistance, model review, and the human decision in that order"
  );

  requireGate(
    contract.situatedVoice?.corpusSufficiencyRequired === true &&
      includesEvery(contract.situatedVoice?.authorityStates ?? [], [
        "unconfirmed",
        "self-authored",
        "team-confirmed"
      ]) &&
      contract.situatedVoice?.impersonationProhibited === true,
    "situated voice requires corpus sufficiency, explicit authority state, and an impersonation prohibition"
  );

  requireGate(
    includesEvery(contract.outcomeMeasures ?? [], [
      "capacity",
      "handoff",
      "correction-latency",
      "open-loop-density",
      "ownership-concentration"
    ]) && /capacity/i.test(method) && /handoff/i.test(method),
    "the maintained method must preserve capacity and handoff measures alongside correction and ownership measures"
  );

  requireGate(
    contract.exactCandidate?.bindingRequired === true &&
      contract.exactCandidate?.staleReceiptsRejected === true &&
      contract.exactCandidate?.candidateAffectingChangesRequireRerun === true &&
      /exact candidate/i.test(rfc + method),
    "exact-candidate binding must reject stale receipts and require reruns after candidate-affecting changes"
  );

  requireGate(
    labCopy.includes("## Operating Control Plane") &&
      /deterministic/i.test(labCopy) &&
      /team capacity/i.test(labCopy) &&
      !/work\/2026-08-26-[A-Z]/.test(labCopy),
    "the public method does not explain the operating control plane concisely and safely"
  );

  requireGate(
    /Jamie decides what is published/i.test(colophon) &&
      colophon.includes('href="/lab/source-backed-team-memory"'),
    "the colophon must state Jamie's decision authority and link to the detailed method"
  );

  return {
    id: contract.id,
    passed: failures.length === 0,
    failures,
    checks,
    modelCallsMade: 0,
    verdict: failures.length === 0 ? "PASS" : "FAIL"
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateOperatingControlPlane(loadCandidate());
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.passed ? 0 : 1);
}
